# Lucky Clinic Management System

A professional, full-stack clinic management solution built with a focus on ease of use for patients and powerful data management for administrators. 

This project was built iteratively, starting as a landing page and evolving into a full-featured system with a React frontend and a Django REST API backend.

## 🌟 Highlights

- **Patient-First Booking:** Clean, intuitive appointment request form that handles registration automatically.
- **Admin Dashboard:** Secure area for staff to monitor clinics stats and patient flow.
- **Modern Tech Stack:** React 18 (Vite), Tailwind CSS, Django Rest Framework, and MySQL.
- **Scalable Architecture:** Modular component structure and centralized API service layer.

---

## 🛠 Project Structure

### Frontend (`/src`)
- `components/`: Pure UI components and functional sections (Hero, Services, etc.).
- `pages/`: Top-level route components (Home, Login, Admin).
- `services/api.js`: Centralized communication logic with the backend.
- `hooks/`: Custom React hooks for shared logic.

### Backend (`/backend`)
- `clinic_app/`: Core logic containing DRF serializers, class-based views, and models.
- `clinic_project/`: Django configuration and security settings.
- `migrations/`: Managed database schema history.

---

## ⚙️ Getting Started

### 1. Prerequisites
- Python 3.11+
- Node.js 18+
- MySQL Server running locally

### 2. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt # or install django, djangorestframework, django-cors-headers, mysqlclient
python manage.py migrate
python manage.py createsuperuser # Create your admin account
python manage.py runserver
```

### 3. Frontend Setup
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:8080` and the API at `http://localhost:8000/api`.

---

## 🔒 Security & Best Practices

- **Token Auth:** Admin areas are protected using DRF Token Authentication.
- **Input Validation:** Serlializers handle strict data validation before it hits the database.
- **CORS:** Controlled access between the decoupled frontend and backend.

## 🚀 Future Roadmap
- [ ] Role-based access control (Doctors vs. Receptionists).
- [ ] SMS/Email notifications for confirmed appointments.
- [ ] Integrated billing and invoice generation module.
- [ ] Multi-clinic branch support.
