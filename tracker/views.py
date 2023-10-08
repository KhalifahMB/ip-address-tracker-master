from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings

# Create your views here.


def homeView(request):
    api_key = settings.API_KEY
    context = {'api_key': api_key}
    return render(request, 'home/home.html', context)


def get_api_key(request):
    api_key = settings.API_KEY
    return JsonResponse({'api_key': api_key}, safe=False)
