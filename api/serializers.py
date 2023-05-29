from rest_framework import serializers
from .models import Category, Project, Service


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('slug', 'name', 'budget', 'category', 'cost', 'id')


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('name', 'cost', 'description')


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('name', 'cost', 'description', 'id')
