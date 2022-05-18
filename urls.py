from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='micro800_home'),

    # Fetch Endpoints
    path('update_controller_info/', views.update_controller_info, name='update_controller_info'),
    path('generate_di_ladder/', views.generate_di_ladder, name='generate_di_ladder'),
    path('generate_di_tags/', views.generate_di_tags, name='generate_di_tags'),
    path('generate_do_ladder/', views.generate_do_ladder, name='generate_do_ladder'),
    path('generate_do_tags/', views.generate_do_tags, name='generate_do_tags'),
    

    # Utility URLs
    path('insert_controllers/', views.insert_controllers, name='insert_controllers')
]