# Generated by Django 4.2 on 2023-04-19 01:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('IN', 'Infra'), ('DE', 'Desenvolvimento'), ('DG', 'Design'), ('TO', 'Planejamento'), ('BD', 'Banco de Dados')], max_length=4, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('budget', models.DecimalField(decimal_places=3, max_digits=10)),
                ('cost', models.DecimalField(decimal_places=3, max_digits=10)),
                ('card', models.CharField(max_length=60)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.category')),
            ],
        ),
    ]
