from django.shortcuts import render
from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from group.serializers import GroupSerializer
from models import Group



class GroupList(generics.ListCreateAPIView):
	queryset = Group.objects.all()
	serializer_class = GroupSerializer
							

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Group.objects.all()
	serializer_class = GroupSerializer
    

