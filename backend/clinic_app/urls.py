from django.urls import path
from .views import LoginView, PatientListView, AppointmentListView, DashboardStatsView, ChatbotView

urlpatterns = [
    path('login/', LoginView.as_view(), name='api_login'),
    path('patients/', PatientListView.as_view(), name='api_patients'),
    path('appointments/', AppointmentListView.as_view(), name='api_appointments'),
    path('dashboard/', DashboardStatsView.as_view(), name='api_dashboard'),
    path('chat/', ChatbotView.as_view(), name='api_chat'),
]
