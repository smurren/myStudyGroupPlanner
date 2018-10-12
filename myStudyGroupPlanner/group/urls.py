from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns
from group import views


urlpatterns = patterns('',
    url(r'^api/$', views.GroupList.as_view()),
    url(r'^api/(?P<pk>[0-9]+)/$', views.Group.as_view()),
    )

urlpatterns = format_suffix_patterns(urlpatterns)
