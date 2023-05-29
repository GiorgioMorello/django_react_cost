from django.db import models
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name




class Service(models.Model):
    name = models.CharField(max_length=60, null=False)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Project(models.Model):

    name = models.CharField(max_length=60, null=False)
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    service = models.ManyToManyField(Service, blank=True)
    slug = models.SlugField(unique=True, null=True, blank=True, max_length=100)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)


    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)



