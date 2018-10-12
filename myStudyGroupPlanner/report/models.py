from django.db import models
from authentication.models import Account
from datetime import datetime


# Create your models here.
class Report(models.Model):
    #user = models.ForeignKey(Account, related_name="reports", null=Tr
    reporter = models.CharField(max_length=250)
    reportee = models.CharField(max_length=250)
    comments = models.CharField(max_length=1000)
    #date_submitted = models.CharField(max_length=350)
    date_submitted = models.DateTimeField(default=datetime.now, blank=True)
    #reportingUser = models.Foreign(Account, related_name="reports", null=True)
