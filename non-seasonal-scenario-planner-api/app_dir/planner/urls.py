from django.conf.urls import include
from django.urls import path
from . import api
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]