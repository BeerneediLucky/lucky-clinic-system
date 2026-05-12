from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .models import Patient, Appointment
from .serializers import PatientSerializer, AppointmentSerializer, UserSerializer
from datetime import datetime
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

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

class ChatbotView(APIView):
    """
    AI Chatbot endpoint using the modern Google Gemini SDK.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        message = request.data.get("message")
        history = request.data.get("history", [])
        
        if not message:
            return Response({"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST)

        system_instruction = """You are the official AI Medical Assistant for Lucky Clinic System. 
            Lucky Clinic is a premium multi-specialty clinic known for Dermatology, Physiotherapy, and Chronic Pain Management.

            CLINIC DETAILS:
            - Location: Lucky Hospital Centre, Ravipadu Road, Narasaraopet, AP - 522601.
            - Contact: +91 7207231018.
            - Timings: 10:00 AM to 3:00 PM (Monday to Saturday).
            - OP Consultation Fee: ₹300 (Standard for all specialties).
            - Principal Doctor: Dr. Lucky (Senior Dermatologist).

            SERVICES OFFERED:
            1. Dermatology: Acne, Pimples, Skin Allergies, Pigmentation, Dark Spots, Melasma, and Hair Fall treatments.
            2. Physiotherapy: Sports injury rehabilitation, post-surgery recovery, back/neck pain, and paralysis recovery.
            3. Arthritis Management: Specialized care for Rheumatoid and Osteoarthritis, especially for geriatric patients.
            4. General Healthcare: Preventive checkups and patient support.

            OPERATIONAL INFO:
            - Appointments: Patients can book directly on this website using the "Book Appointment" form or via WhatsApp at +91 7207231018.
            - Payments: Cash, UPI, and Card payments are accepted at the clinic.

            BEHAVIORAL GUIDELINES:
            1. Be professional, empathetic, and human-like.
            2. Use the provided clinic data to answer questions naturally. 
            3. Do NOT provide diagnostic conclusions. 
            4. If a user asks for a diagnosis or describes severe symptoms, use the mandatory safety response.

            MANDATORY SAFETY RESPONSE:
            "Please consult a qualified doctor for accurate diagnosis and treatment. You can book an appointment here or visit us at the clinic for a proper evaluation."
            """

        try:
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key or "AIza" not in api_key:
                return Response({"error": "Gemini API Key missing or invalid. Please check your .env file."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

            # Format history for Gemini
            contents = []
            for msg in history:
                role = "user" if msg.get("role") == "user" else "model"
                contents.append(types.Content(role=role, parts=[types.Part(text=msg.get("content", ""))]))
            
            # Add current message
            contents.append(types.Content(role="user", parts=[types.Part(text=message)]))

            # Generate response
            response = client.models.generate_content(
                model='gemini-flash-latest',
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.7,
                    max_output_tokens=500
                )
            )
            
            return Response({"reply": response.text})

        except Exception as e:
            error_str = str(e)
            print(f"Gemini Error: {error_str}")
            
            if "quota" in error_str.lower() or "429" in error_str:
                return Response({
                    "error": "Gemini API Quota Exceeded. Please try again later."
                }, status=status.HTTP_429_TOO_MANY_REQUESTS)
            
            if "api_key" in error_str.lower() or "401" in error_str or "403" in error_str:
                return Response({
                    "error": "Invalid API configuration. Please check your Gemini API key."
                }, status=status.HTTP_401_UNAUTHORIZED)
                
            return Response({
                "error": "AI assistant is temporarily unavailable. Please try again in a moment."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
