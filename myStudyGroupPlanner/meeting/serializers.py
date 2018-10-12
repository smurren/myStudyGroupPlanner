from rest_framework import serializers
from meeting.models import Meeting



class MeetingSerializer(serializers.ModelSerializer):

    class Meta:
	model = Meeting
	field = ('title',
			 'building', 
			 'room_num',
			 'start_time',
			 'end_time',
			 'users_attending',
			 'groupId',
			 'comment')
