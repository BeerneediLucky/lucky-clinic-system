# Lucky Clinic System

Welcome to the **Lucky Clinic** full-stack application! This project provides a beautiful, modern, and responsive web interface integrated with a robust Python/Django backend. It is designed to act as a complete Clinic Management System.

## 🚀 Key Features

*   **Modern React UI:** Built with React, Vite, and Tailwind CSS for a premium and fast experience.
*   **Django Backend:** Secure REST APIs powered by Python and Django.
*   **Patient Registration & Booking Form:** Users can securely submit their information and book appointments directly from the website.
*   **Admin Dashboard Integration:** Leverages the built-in Django Admin interface for secure management of Patients and Appointments.
*   **MySQL Database:** Powerful, production-ready relational database.

---

## 🛠️ Tech Stack & Architecture

This is a decoupled Full-Stack system:

*   **Backend (API & Database):** Python 3.11+, Django, MySQL.
*   **Frontend (UI):** React 18, Vite, Tailwind CSS, shadcn/ui.
*   **Communication:** Frontend uses the `fetch` API to communicate with Django via JSON (`http://localhost:8000/api/...`).

---

## 🏁 Step-by-Step Running Process

Since this is a decoupled app, you will need **two separate terminals** running simultaneously—one for the backend, and one for the frontend.

### 1. Start the Django Backend

Open a terminal and navigate to the `backend` folder inside the project root:

```powershell
cd backend
```

**Step 1: Activate Virtual Environment**
If you haven't created one, run `python -m venv venv`.
```powershell
.\venv\Scripts\activate
```

**Step 2: Install Dependencies**
```powershell
pip install django django-cors-headers
```

**Step 3: Run Database Migrations**
This creates and updates your MySQL database tables.
```powershell
python manage.py makemigrations clinic_app
python manage.py migrate
```

**Step 4: Start the API Server**
```powershell
python manage.py runserver
```
*The backend is now live at: `http://localhost:8000/`*

### 2. Start the React Frontend

Open a **second terminal** at the root of the project:

**Step 1: Install Dependencies**
```powershell
npm install
```

**Step 2: Start the Development Server**
```powershell
npm run dev
```
*The frontend is now live at: `http://localhost:8080/`* (or the port specified in your terminal).

---

## 🗄️ Accessing Databases & Admin Panel (For Programmers)

### The Django Admin Panel
Django comes with a powerful, secure Admin Panel where you can view raw database tables, edit patient records, and manage appointments.

1. **Create an Admin Account (Superuser):**
   Open a terminal in the `backend` folder, ensure your virtual environment is active, and run:
   ```powershell
   python manage.py createsuperuser
   ```
   *Follow the prompts to set your username, email (optional), and password.*

2. **Log In:**
   With your Django server running (`python manage.py runserver`), go to your browser and visit:
   👉 **`http://localhost:8000/admin`**
   *Enter the credentials you just created.*

Here, you will find the `Clinic_App` section containing **Appointments** and **Patients**. You can manually Add, Delete, and Update records here.

### The Database Structure (MySQL)
The project runs purely on a local MySQL database named `lucky_clinic`.
*   **Models:** Found in `backend/clinic_app/models.py`.
    *   `Patient`: Stores Name, Phone, Problem description, and Timestamp.
    *   `Appointment`: Links to a Patient, stores the Appointment Date and Status (Pending/Confirmed/Cancelled).
*   **Raw Access:** To view the database manually, use a database engine like **phpMyAdmin, MySQL Workbench, or DBeaver** with these credentials:
    *   **Host:** `localhost`
    *   **Port:** `3306`
    *   **User:** `root`
    *   **Password:** `Lucky@321` (or your local environment's password set in `settings.py`)

---

## 📡 API Endpoints

The React frontend communicates with Django via these exposed endpoints (defined in `backend/clinic_app/views.py`):

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/login/` | Validates Admin credentials via JSON payload. |
| `POST` | `/api/patients/` | Registers a new patient. |
| `GET` | `/api/patients/` | Returns a list of all patients. |
| `POST` | `/api/appointments/` | Registers a patient (if new) and books an appointment. |
| `GET` | `/api/appointments/` | Returns a list of all appointments. |
| `GET` | `/api/dashboard/` | Returns metrics (total patients, appointments, recent bookings). |

---

## 📁 Project Structure Overview

```plaintext
lucky-clinic/
├── backend/                  # Python Django Backend
│   ├── clinic_app/           # Main application module
│   │   ├── models.py         # Database schema layout
│   │   ├── views.py          # API handlers and logic
│   │   ├── urls.py           # App routing mapping
│   │   └── admin.py          # Admin panel configuration
│   ├── clinic_project/       # Django project core
│   │   └── settings.py       # Configuration (CORS, Installed Apps, Database)
│   ├── manage.py             # Django execution script
│   └── venv/                 # Python Virtual Environment
├── public/                   # Static public assets
├── src/                      # React Frontend
│   ├── components/           # Reusable UI components (including BookingForm.jsx)
│   ├── pages/                # App pages (Index.jsx)
│   └── App.jsx               # Root frontend application
├── package.json              # NPM dependencies
└── README.md                 # This file
```
