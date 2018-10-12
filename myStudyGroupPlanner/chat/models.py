from django.db import models


class Chat(models.Model):

    userId = models.IntegerField()
    userName = models.CharField(max_length=40)
    groupId = models.IntegerField()
    message = models.CharField(max_length=300)
    dateTime = models.DateTimeField(auto_now_add=True)
