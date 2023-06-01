# Generated by Django 4.2 on 2023-05-11 01:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_remove_project_service_project_service'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='card',
        ),
        migrations.AddField(
            model_name='project',
            name='card',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.card'),
        ),
    ]