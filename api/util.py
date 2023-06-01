#from api.serializers import ServicesSerializer



def setting_new_project_cost(project, new_service_cost):
    project_buget = float(project.budget)

    all_project_services = project.service.all()

    if len(all_project_services) == 0:
        new_project_cost = float(project.cost) + float(new_service_cost)
        if checking_cost_and_budget(new_project_cost, project_buget):
            project.cost = new_project_cost
            project.save()
            return True

    new_project_cost = 0
    for service in all_project_services:
        new_project_cost += float(service.cost)

    new_project_cost += float(new_service_cost)

    if checking_cost_and_budget(new_project_cost, project_buget) is not True:
        return False

    project.cost = new_project_cost
    project.save()

    return True


def checking_cost_and_budget(new_project_cost, project_budget):
    if new_project_cost > project_budget:
        return False

    return True


def get_all_project_services(project):
    project_services = []
    for s in project.service.all():
        project_services.append(s)
    return project_services


def get_all_projects(all_projects):
    projects = []
    for p in all_projects:
        project_dict = {'name': p.name,
                        'budget': p.budget,
                        'category': p.category.name,
                        'cost': p.cost,
                        'id': p.id,
                        'slug': p.slug}
        projects.append(project_dict)
    return projects


def get_project(project):
    project_dict = {'name': project.name,
                    'budget': project.budget,
                    'category': project.category.name,
                    'cost': project.cost,
                    'id': project.id,
                    'slug': project.slug,
                    }
    return project_dict


