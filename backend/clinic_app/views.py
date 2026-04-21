from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .models import Patient, Appointment
import json
from datetime import datetime

@csrf_exempt
def login_view(request):
    """Admin login endpoint."""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Login successful", "success": True})
            else:
                return JsonResponse({"error": "Invalid credentials", "success": False}, status=401)
        except Exception as e:
            return JsonResponse({"error": str(e), "success": False}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def patient_list_create(request):
    """Handle adding patients and listing patients."""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            patient = Patient.objects.create(
                name=data.get('name'),
                phone=data.get('phone'),
                problem=data.get('problem')
            )
            return JsonResponse({"success": True, "message": "Patient added", "patient_id": patient.id})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)

    elif request.method == "GET":
        # Usually checking if user is logged in natively but kept simple for AJAX
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"}, status=401)
            
        patients = list(Patient.objects.values('id', 'name', 'phone', 'problem', 'created_at'))
        return JsonResponse({"success": True, "patients": patients})

@csrf_exempt
def appointment_list_create(request):
    """Handle booking an appointment from the frontend and listing them for admin."""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # Create a patient automatically if they are booking an appointment
            patient = Patient.objects.create(
                name=data.get("name"),
                phone=data.get("phone"),
                problem=data.get("problem", "Appointment booking")
            )
            
            # Format: '2026-04-10T10:30' (datetime-local from HTML input)
            date_str = data.get("date")
            appointment_date = datetime.fromisoformat(date_str) if date_str else datetime.now()

            appointment = Appointment.objects.create(
                patient=patient,
                date=appointment_date,
                status="Pending"
            )
            return JsonResponse({"success": True, "message": "Appointment booked!", "appointment_id": appointment.id})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)
            
    elif request.method == "GET":
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"}, status=401)
            
        appointments = list(Appointment.objects.select_related('patient').values(
            'id', 'patient__name', 'patient__phone', 'date', 'status', 'created_at'
        ))
        return JsonResponse({"success": True, "appointments": appointments})

def dashboard_stats(request):
    """Returns total patients, appointments, and recent bookings."""
    if request.method == "GET":
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"}, status=401)
            
        total_patients = Patient.objects.count()
        total_appointments = Appointment.objects.count()
        
        recent_bookings = list(Appointment.objects.select_related('patient').values(
            'id', 'patient__name', 'date', 'status'
        ).order_by('-created_at')[:5])

        return JsonResponse({
            "success": True,
            "data": {
                "total_patients": total_patients,
                "total_appointments": total_appointments,
                "recent_bookings": recent_bookings
            }
        })
    return JsonResponse({"error": "Method not allowed"}, status=405)
