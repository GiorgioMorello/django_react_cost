from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .util import setting_new_project_cost, get_all_project_services, get_all_projects, get_project

from .models import Category, Project, slugify, Service
from .serializers import CategorySerializer, ProjectsSerializer, ServiceSerializer, ServicesSerializer



class AllCategory(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CreateProject(APIView):
    serializer_class = ProjectsSerializer

    def post(self, r):
        print(r.data)
        valid_serializer = {'name': r.data['name'],
                            'budget': float(r.data['budget']),
                            'category': r.data['category']['id']
                            }

        serializer = self.serializer_class(data=valid_serializer)
        if serializer.is_valid():
            project_name = serializer.data.get('name')
            budget = serializer.data.get('budget')
            category = Category.objects.get(id=serializer.data.get('category'))

            project = Project.objects.create(name=project_name, budget=budget, category=category)

            return Response(ProjectsSerializer(project).data, status=status.HTTP_201_CREATED)

    def put(self, r, id):
        name = Project.objects.filter(name=r.data['name'])
        if name.exists():
            return Response({'Error': 'The project already exists'}, status=status.HTTP_502_BAD_GATEWAY)

        valid_serializer = {'name': r.data['name'],
                            'budget': float(r.data['budget']),
                            'category': r.data['category']['id']
                            }
        serializer = self.serializer_class(data=valid_serializer)
        if serializer.is_valid():
            project = Project.objects.get(id=id)
            category = Category.objects.get(id=serializer.data.get('category'))

            project.slug = slugify(serializer.data.get('name'))
            project.name = serializer.data.get('name')
            project.category = category
            project.budget = serializer.data.get('budget')

            project.save(update_fields=['name', 'category', 'budget', 'slug'])
            project_dict = get_project(project)

        return Response(project_dict, status=status.HTTP_200_OK)


class AllProjects(APIView):

    def get(r):
        queryset = get_all_projects(Project.objects.all())
        return Response(queryset)

class RemoveProject(APIView):

    @method_decorator(ensure_csrf_cookie)
    def delete(self, r):
        id = r.data['id']
        project = Project.objects.get(id=id)

        if not project:
            return Response({'Failed': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

        project.delete()

        projects = get_all_projects(Project.objects.all())

        return Response({'projects': projects},
                        status=status.HTTP_200_OK)


class OneProject(APIView):

    def get(self, r, slug):
        data = Project.objects.filter(slug=slug)

        if not data.exists():
            return Response({'Project': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        project = data[0]
        project_services = list(map(lambda x: ServicesSerializer(x).data, get_all_project_services(project)))
        project_dict = get_project(project)

        return Response([project_dict, project_services], status=status.HTTP_200_OK)


class CreateService(APIView):
    serializer_class = ServiceSerializer

    def post(self, r, id):
        data = r.data
        projeto_id = id

        service_serializer = self.serializer_class(data=data['service'])

        if not service_serializer.is_valid():
            return Response({'Data is not valid': 'ERROR', 'check_valid_form': True},
                            status=status.HTTP_502_BAD_GATEWAY)

        # CHECK BUDGET AND COST
        project = Project.objects.get(id=projeto_id)
        if not setting_new_project_cost(project, service_serializer.data.get('cost')):
            return Response({'Budget overrun': 'ERROR', 'check_new_cost': True}, status=status.HTTP_502_BAD_GATEWAY)

        # CREATE SERVICE
        service_name = service_serializer.data.get('name')
        service_cost = service_serializer.data.get('cost')
        service_desc = service_serializer.data.get('description')
        service = Service.objects.create(name=service_name, cost=service_cost, description=service_desc)

        # ADD SERVICE IN PROJECT
        project.service.add(service)
        project.save()
        project_dict = get_project(project)

        project_services = ServicesSerializer(project.service.all(), many=True).data

        return Response({'project': project_dict,
                         'project_services': project_services,
                         'check_valid_form': False,
                         'check_new_cost': False},
                        status=status.HTTP_200_OK)


class DeleteService(APIView):

    @method_decorator(ensure_csrf_cookie)
    def delete(self, r, id):
        project = Project.objects.get(id=r.data['project_id'])
        service = Service.objects.get(id=id)

        if not service:
            return Response({'ERROR': 'Service not found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        service_cost = service.cost
        project.cost -= service_cost
        project.service.get(id=id).delete()

        project.save()
        services = project.service.all()

        return Response({"project": ProjectsSerializer(project).data,
                         "services": ServicesSerializer(services, many=True).data},
                        status=status.HTTP_200_OK)
