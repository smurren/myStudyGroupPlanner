from rest_framework import serializers
from msgpUser.models import MSGPUser


class MSGPUserSerializer(serializers.ModelSerializer):
	
	class Meta:	
		
		model = MSGPUser
		field = ('msgpUserId', 'msgpUsername', 'msgpGroupId', 'msgpGroupName', 'msgpMeetingId')
		
		
