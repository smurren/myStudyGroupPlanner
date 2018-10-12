from django.shortcuts import render
from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from building.serializers import RoomSerializer, BuildingSerializer
from models import Room, Building, Hour, Day

class RoomList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer



class BuildingList(generics.ListCreateAPIView):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer



class BuildingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer



