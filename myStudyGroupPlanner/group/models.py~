from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Group(models.Model):
	
	groupName = models.CharField(max_length=20)
	subject = models.CharField(max_length=30)
	className = models.CharField(max_length=30)
	section = models.IntegerField()
	groupOwner = models.CharField(max_length=30)
	memberCount = models.IntegerField()
	totalMembersAllowed = models.IntegerField()

	def __unicode__(self):
	    return self.groupName

class User(models.Model):

    group = models.ForeignKey(Group, related_name="users")

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    tagline = models.CharField(max_length=140, blank=True)

	# ADDED FOREIGN KEY TO ACCOUNT
	#users = models.ManyToManyField(Account)
