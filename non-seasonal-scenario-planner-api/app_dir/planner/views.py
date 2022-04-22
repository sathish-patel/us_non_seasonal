import django.conf
from django.http import HttpResponse
from django.utils.encoding import smart_str
from django.conf import settings
import os
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.http import HttpResponseNotFound
from app_dir.planner.models import ExcelTemplates
def index(request):
    return HttpResponse("Demo")

