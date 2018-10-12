from django.shortcuts import render
from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from msgpUser.serializers import MSGPUserSerializer
from models import MSGPUser


class MSGPUserList(generics.ListCreateAPIView):
	queryset = MSGPUser.objects.all()
	serializer_class = MSGPUserSerializer


class MSGPUserDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = MSGPUser.objects.all()
	serializer_class = MSGPUserSerializer
