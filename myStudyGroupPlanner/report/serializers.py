from rest_framework import serializers
from report.models import Report
from authentication.models import Account

class ReportSerializer(serializers.ModelSerializer):
    date_submitted = serializers.DateTimeField(format=None, input_formats=None,required=False)
    class Meta:
        model = Report
        field = ('reporter','reportee','comments','date_submitted')
