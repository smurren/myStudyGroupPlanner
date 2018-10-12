from django.shortcuts import render
from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from report.serializers import ReportSerializer
from models import Report

class ReportList(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer



class ReportDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
