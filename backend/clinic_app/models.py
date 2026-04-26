from django.db import models

class Patient(models.Model):
    """
    Core patient profile. Registration is triggered automatically 
    when a patient makes their first appointment.
    """
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    problem = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.phone})"

class Appointment(models.Model):
    """
    Appointment management tracking dates and clinical status.
    """
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"Appointment: {self.patient.name} - {self.date.strftime('%Y-%m-%d %H:%M')}"
