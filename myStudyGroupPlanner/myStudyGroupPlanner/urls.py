from django.conf.urls import patterns, url, include
from django.contrib import admin

from myStudyGroupPlanner.views import IndexView

from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView
from building.views import RoomList, RoomDetail, BuildingList, BuildingDetail
from group.views import GroupList, GroupDetail
from meeting.views import MeetingList, MeetingDetail
from report.views import ReportList, ReportDetail
from msgpUser.views import MSGPUserList, MSGPUserDetail
from chat.views import ChatList, ChatDetail
from Class.views import SubjectList, SubjectDetail, ClassList, ClassDetail, SectionList, SectionDetail

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

#router.register(r'building', RoomList)

urlpatterns = patterns(
     '',
    # ... URLs
    url(r'^api/building/$', BuildingList.as_view(), name='roomList'),
    url(r'^api/building/(?P<pk>[0-9]+)/$', BuildingDetail.as_view(), name='roomDetail'),
    url(r'^api/building/room/$', RoomList.as_view(), name='roomList'),
    url(r'^api/building/room/(?P<pk>[0-9]+)/$', RoomDetail.as_view(), name='roomDetail'),

    url(r'^api/subject/$', SubjectList.as_view(), name='subjectList'),
    url(r'^api/subject/(?P<pk>[0-9]+)/$', SubjectDetail.as_view(), name='subjectDetail'),
    url(r'^api/subject/class/$', ClassList.as_view(), name='classList'),
    url(r'^api/subject/class/(?P<pk>[0-9]+)/$', ClassDetail.as_view(), name='classDetail'),
    url(r'^api/subject/class/section/$', SectionList.as_view(), name='sectionList'),
    url(r'^api/subject/class/section/(?P<pk>[0-9]+)/$', SectionDetail.as_view(), name='sectionDetail'),

	url(r'^api/group/$', GroupList.as_view(), name='groupList'),
	url(r'^api/group/(?P<pk>[0-9]+)/$', GroupDetail.as_view(), name='groupDetail'),

	url(r'^api/meeting/$', MeetingList.as_view(), name='meetingList'),
	url(r'^api/meeting/(?P<pk>[0-9]+)/$', MeetingDetail.as_view(), name='meetingDetail'),

	url(r'^api/msgpUser/$', MSGPUserList.as_view(), name='msgpUserList'),
	url(r'^api/msgpUser/(?P<pk>[0-9]+)/$', MSGPUserDetail.as_view(), name='msgpUserDetail'),

	#url(r'^api/account/$', AccountList.as_view(), name='accountList'),

    url(r'^api/report/$', ReportList.as_view(), name='reportList'),
	url(r'^api/report/(?P<pk>[0-9]+)/$', ReportDetail.as_view(), name='reportDetail'),

	url(r'^api/chat/$', ChatList.as_view(), name='chatList'),
    url(r'^api/chat/(?P<pk>[0-9]+)/$', ChatDetail.as_view(), name='chatDetail'),

    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^admin/', include(admin.site.urls)),
    #remove this to see your api calls printout on browser
    url('^.*$', IndexView.as_view(), name='index'),
)
