from rest_framework import serializers
from .models import tutor, employee, child, tutor_child, class_group, stablishments, schedule, complaint, announcements

class tutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = tutor
        fields = '__all__'

class employeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = employee
        fields = '__all__'

class childSerializer(serializers.ModelSerializer):
    class Meta:
        model = child
        fields = '__all__'

class tutor_childSerializer(serializers.ModelSerializer):
    class Meta:
        model = tutor_child
        fields = '__all__'

class class_groupSerializer(serializers.ModelSerializer):
    class Meta:
        model = class_group
        fields = '__all__'

class stablishmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = stablishments
        fields = '__all__'

class scheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = schedule
        fields = '__all__'

class announcementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = announcements
        fields = '__all__'

class complaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = complaint
        fields = '__all__'