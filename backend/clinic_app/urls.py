from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('patients/', views.patient_list_create, name='patients'),
    path('appointments/', views.appointment_list_create, name='appointments'),
    path('dashboard/', views.dashboard_stats, name='dashboard'),
]
