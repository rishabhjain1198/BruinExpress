from django.conf.urls import url, include
from . import views
from django.contrib import admin

urlpatterns = [
    url(r'post/(?P<expressString>.+)', views.postReq, name='postReq'),
    url(r'get/(?P<devInfo>.+)', views.getReq, name='getReq'),
    url(r'like/(?P<expressMsg>.+)', views.like, name='like'),
]
