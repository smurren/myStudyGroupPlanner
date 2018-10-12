from django.db import models


class MSGPUser(models.Model):

	msgpUserId = models.IntegerField()
	msgpUsername = models.CharField(max_length=40)
	msgpGroupId = models.IntegerField()
	msgpGroupName = models.CharField(max_length=40)
	msgpMeetingId = models.IntegerField(null=True)
	
	#class Meta:	
		# this is supposed to make both those fields primary keys
		#unique_together = (("msgpUserId", "msgpGroupId"))              # removed this after adding meetingId
