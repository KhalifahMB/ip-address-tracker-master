from django.urls import path
from .views import homeView, get_api_key

urlpatterns = [
    path('', homeView),
    path('get_api_key/', get_api_key, name='get_api_key'),
]
