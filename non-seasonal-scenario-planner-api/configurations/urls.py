import django.conf
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from django.conf.urls.static import static
from configurations import settings
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
schema_view = get_swagger_view(title='Non Seasonal Scenario Planner')
urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api-auth/', include('rest_framework.urls', namespace='rest')),
     url(r'docs/', schema_view),
    path('auth_login/', obtain_jwt_token),
    path('scenario_planner/', include(('app_dir.planner.api.urls', 'scenario_planner'), namespace='scenario_planner')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

