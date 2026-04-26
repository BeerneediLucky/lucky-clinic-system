from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .models import Patient, Appointment
from .serializers import PatientSerializer, AppointmentSerializer, UserSerializer
from datetime import datetime

class LoginView(APIView):
    """
    Handles admin authentication and returns a token.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user": UserSerializer(user).data,
                "message": "Login successful"
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class PatientListView(APIView):
    """
    List all patients or create a new one.
    """
    # Allow posting without auth for the public booking form, 
    # but require auth for GET list
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        patients = Patient.objects.all().order_by('-created_at')
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentListView(APIView):
    """
    Handle booking appointments.
    """
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        appointments = Appointment.objects.all().order_by('-date')
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        try:
            # Atomic creation: Register patient and then book appointment
            patient_data = {
                "name": data.get("name"),
                "phone": data.get("phone"),
                "problem": data.get("problem", "Appointment booking")
            }
            patient_serializer = PatientSerializer(data=patient_data)
            if patient_serializer.is_valid():
                patient = patient_serializer.save()
                
                appointment_data = {
                    "patient": patient.id,
                    "date": data.get("date"),
                    "status": "Pending"
                }
                appointment_serializer = AppointmentSerializer(data=appointment_data)
                if appointment_serializer.is_valid():
                    appointment_serializer.save()
                    return Response({
                        "message": "Appointment booked successfully",
                        "data": appointment_serializer.data
                    }, status=status.HTTP_201_CREATED)
                return Response(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DashboardStatsView(APIView):
    """
    Aggregate metrics for the admin dashboard.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        stats = {
            "total_patients": Patient.objects.count(),
            "total_appointments": Appointment.objects.count(),
            "recent_bookings": AppointmentSerializer(
                Appointment.objects.all().order_by('-created_at')[:5], 
                many=True
            ).data
        }
        return Response(stats)
