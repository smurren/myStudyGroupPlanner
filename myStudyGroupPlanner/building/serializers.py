from rest_framework import serializers
from building.models import Building, Room, Hour, Day

class HoursSerializer(serializers.ModelSerializer):
    class Meta:
	model = Hour
	field =('id', 'start_hour', 'end_hour')

class DaySerializer(serializers.ModelSerializer):
    class Meta:
	model = Day
	field = ('id', 'day')

class RoomSerializer(serializers.ModelSerializer):
    hours = HoursSerializer(many=True, read_only=True)
    #days = DaySerializer(many=True, read_only=True)

    class Meta:
	model = Room
	field = ('id', 'room_num', 'hours', 'days')

class BuildingSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)

    class Meta:
	model =Building
	field = ('id','name', 'abrv', 'rooms')

    #def create(self, validated_data):
#	room = Room.objects.create(**validated_data)
#
#	for item in validated_data['hours']:
#	    hours = Hours.object.create(id=item['page_id'], start_hour=item['start_hour'], end_hour=item['end_hour'], room=room)
#	return Room
