from django.shortcuts import render
from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from chat.serializers import ChatSerializer
from models import Chat


class ChatList(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
