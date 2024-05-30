from django.shortcuts import render
from rest_framework import viewsets
from .serializers import  tutorSerializer, employeeSerializer, childSerializer, tutor_childSerializer, class_groupSerializer, stablishmentsSerializer, scheduleSerializer, complaintSerializer, announcementsSerializer
from .models import tutor, employee, child, tutor_child, class_group, stablishments, schedule, complaint, announcements

# Create your views here.

class tutorView(viewsets.ModelViewSet):
    serializer_class = tutorSerializer
    queryset = tutor.objects.all()

class employeeView(viewsets.ModelViewSet):
    serializer_class = employeeSerializer
    queryset = employee.objects.all()

class childView(viewsets.ModelViewSet):
    serializer_class = childSerializer
    queryset = child.objects.all()

class tutor_childView(viewsets.ModelViewSet):
    serializer_class = tutor_childSerializer
    queryset = tutor_child.objects.all()

class class_groupView(viewsets.ModelViewSet):
    serializer_class = class_groupSerializer
    queryset = class_group.objects.all()

class stablishmentsView(viewsets.ModelViewSet):
    serializer_class = stablishmentsSerializer
    queryset = stablishments.objects.all()

class scheduleView(viewsets.ModelViewSet):
    serializer_class = scheduleSerializer
    queryset = schedule.objects.all()

class announcementsView(viewsets.ModelViewSet):
    serializer_class = announcementsSerializer
    queryset = announcements.objects.all()

class complaintView(viewsets.ModelViewSet):
    serializer_class = complaintSerializer
    queryset = complaint.objects.all()