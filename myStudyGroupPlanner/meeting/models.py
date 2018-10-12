from django.db import models

# Create your models here.
class Meeting(models.Model):
	title = models.CharField(max_length=80)
	building = models.CharField(max_length=40)
	room_num = models.CharField(max_length=3)
	start_time = models.DateTimeField()
	end_time = models.DateTimeField()
	users_attending = models.IntegerField()
	groupId = models.IntegerField()
	comment = models.CharField(max_length=500)
