from django.shortcuts import render

# Create your views here.



def index(r, *args, **kwargs):
    return render(r, 'frontend/index.html')
