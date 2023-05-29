from django.urls import path, include
from . import views

urlpatterns = [
    path('categories', views.AllCategory.as_view(), name='categories'),
    path('create-project', views.CreateProject.as_view(), name='create_project'),
    path('update-project/<int:id>', views.CreateProject.as_view(), name='update_project'),
    path('remove-project', views.RemoveProject.as_view(), name='remove_project'),
    path('projects', views.AllProjects.as_view(), name='projects'),
    path('project/<slug:slug>', views.OneProject.as_view(), name='project'),
    path('add-service/<int:id>', views.CreateService.as_view(), name='add_service'),
    path('delete-service/<str:id>', views.DeleteService.as_view(), name='del_service'),

]
