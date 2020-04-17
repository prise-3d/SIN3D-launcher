from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

app_name = 'expe'

urlpatterns = [
    path('', views.load_index, name='generate_link'),
    path('check', views.check_user_id, name='check_user_id'),
    path('generate', views.generate_user_link, name='generate_user_link'),
]

if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)