from rest_framework import serializers
from Class.models import Subject, SubjectsClass, Section

class SectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Section
		field = ('id', 'section')

class ClassSerializer(serializers.ModelSerializer):
	section = SectionSerializer(many=True, read_only=True)

	class Meta:
		model = SubjectsClass
		field = ('id', 'subjectsClass', 'section')

class SubjectSerializer(serializers.ModelSerializer):
	subjectsClass = ClassSerializer(many=True, read_only=True)

	class Meta:
		model = Subject
		field = ('id', 'subject', 'subjectsClass')
