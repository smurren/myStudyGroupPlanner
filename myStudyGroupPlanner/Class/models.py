from django.db import models

class Subject(models.Model):
	subject = models.CharField(max_length=32)

	def __unicode__(self):
		return self.subject

class SubjectsClass(models.Model):
	subject = models.ForeignKey(Subject, related_name="subjectsClass", null=True)
	subjectsClass = models.CharField(max_length=32)

	def __unicode__(self):
		return self.subjectsClass

class Section(models.Model):
	subjectsClass = models.ForeignKey(SubjectsClass, related_name="section", null=True)
	section = models.IntegerField()

	def __unicode__(self):
		return self.section
