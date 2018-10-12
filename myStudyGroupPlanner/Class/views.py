from django.shortcuts import render
from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from Class.serializers import SubjectSerializer, ClassSerializer, SectionSerializer
from models import Subject, SubjectsClass, Section

class SubjectList(generics.ListCreateAPIView):
	queryset = Subject.objects.all()
	serializer_class = SubjectSerializer

class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
	querySet = Subject.objects.all()
	serializer_class = SubjectSerializer

class ClassList(generics.ListCreateAPIView):
	queryset = SubjectsClass.objects.all()
	serializer_class = ClassSerializer

class ClassDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = SubjectsClass.objects.all()
	serializer_class = ClassSerializer

class SectionList(generics.ListCreateAPIView):
	queryset = Section.objects.all()
	serializer_class = SectionSerializer

class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Section.objects.all()
	serializer_class = SectionSerializer
