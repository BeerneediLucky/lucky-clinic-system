from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Appointment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.name')
    patient_phone = serializers.ReadOnlyField(source='patient.phone')

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'patient_name', 'patient_phone', 'date', 'status', 'created_at']
