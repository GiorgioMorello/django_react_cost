from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('projects', views.index),
    path('project/<slug:slug>', views.index),
    path('new-project', views.index),

]