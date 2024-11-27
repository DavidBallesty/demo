"""demo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path('', views.index, name='index'),  # Keep only this for '/'
    path('admin/', admin.site.urls),    
    path('django_python/', views.django_python, name='django_python'),
    path('auto_analyze/', views.auto_analyze, name='auto_analyze'),
    path('scan_websites/', views.scan_websites, name='scan_websites'),
    path('scan_images/', views.scan_images, name='scan_images'),
    path('get_globe_data/', views.get_globe_data, name='get_globe_data'),
]
