from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

app_name = 'expe'

urlpatterns = [
    path('', views.list_files, name='list_files'),
    path('links', views.user_links, name='user_links'),
]

if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)