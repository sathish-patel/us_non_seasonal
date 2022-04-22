from app_dir.planner.api import views
from django.urls import path



urlpatterns = [
    path('get_filters', views.get_base_filters, name='get_base_filters'),
    path('get_main_filters', views.get_main_filters, name='get_main_filters'),
    path('get_attribute_filters', views.get_attribute_filters, name='get_attribute_filters'),
    path('performance_summary', views.performance_summary, name='performance_summary'),
    path('performance_pqa_summary', views.performance_pqa_summary, name='performance_pqa_summary'),
    path('comments', views.commets, name='comments'),
    path('edit_comments', views.edit_commets, name='edit_commets'),
    path('delete_comments', views.delete_comments, name='delete_comments'),
    path('attribute_summary', views.attribute_summary, name='attribute_summary'),
]

