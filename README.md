# 🏥 Lucky Clinic Management System (LCMS)

![Landing Mockup](file:///C:/Users/Beerneedi%20lucky/.gemini/antigravity/brain/512195f5-ed4c-4a6a-bc64-e81c32f4e7d6/lucky_clinic_landing_mockup_1778581763684.png)

> **"Advanced Care, Intelligent Assistance."**
> A state-of-the-art, full-stack medical clinic management solution featuring a custom-trained AI Assistant, automated patient onboarding, and a high-performance administration dashboard.

---

## 🌟 Key Features

### 🤖 Smart AI Assistant (Lucky AI)
- **Advanced LLM Integration**: Powered by **Google Gemini 1.5 Flash** for fast and accurate patient support.
- **Clinic Intelligence**: Trained on specific clinic data (OP fees, timings, specialty services).
- **Medical Safety**: Built-in safety disclaimers and non-diagnostic guidance.
- **Voice Recognition**: Support for voice input via Web Speech API.
- **UI Design**: Modern Glassmorphism UI with Framer Motion animations.

### 📅 Patient Management
- **Instant Booking**: Streamlined appointment request form that handles patient registration automatically.
- **Service Catalog**: Detailed visibility into Dermatology, Physiotherapy, and Arthritis treatments.
- **WhatsApp Integration**: Floating CTA for direct communication with the clinic at **+91 7207231018**.

### 🛡️ Admin Dashboard
- **Live Statistics**: Real-time tracking of total patients and appointments.
- **Patient Records**: Secure management of patient history and appointment status.
- **Token-Based Security**: Protected API endpoints using Django REST Framework Token Authentication.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (Premium Dark/Light palettes)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Framework**: Django 5.x
- **API**: Django REST Framework (DRF)
- **Database**: MySQL (using PyMySQL and Cryptography for secure auth)
- **AI SDK**: Google Generative AI (`google-genai`)

---

## 👨‍⚕️ Meet Your Doctor
### **Dr. Lucky (Senior Dermatologist)**
Dr. Lucky is a highly experienced dermatologist specializing in clinical and aesthetic skin care. He is known for his compassionate approach and his dedication to providing simple, clear explanations for every treatment plan.

- **Expertise**: Acne & Pimple treatments, Hair Fall analysis, Chronic Skin Allergies, and Pigmentation solutions.
- **Philosophy**: "Skin health is a journey, and every patient deserves a confident, clear skin path."

---

## ⚙️ Project Configuration

### 1. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY=your_google_ai_studio_key_here
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install django djangorestframework django-cors-headers pymysql cryptography google-genai python-dotenv
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup
```bash
npm install
npm run dev
```

---

## 🔑 Admin Access
Access the management dashboard at `http://localhost:8080/admin-login`.

| Credential | Value |
| :--- | :--- |
| **Username** | `admin` |
| **Password** | `adminpassword` |

*(Note: Actual credentials must be created via `python manage.py createsuperuser`)*

---

## 🏗 Development Topics Covered
During the optimization phase, the following advanced topics were implemented:
- **Provider Migration**: Seamlessly transitioned AI services from OpenAI to Google Gemini to optimize costs and availability.
- **Rebranding Integration**: Full-scale update of clinic identity from "Kondapalli" to **"Lucky Hospitals"** across all components.
- **Dependency Optimization**: Resolved critical MySQL authentication errors by integrating `cryptography` into the Python environment.
- **Floating UI Layouts**: Implemented non-overlapping positioning for multiple interactive widgets (WhatsApp + AI Assistant).
- **Robust Error Handling**: Added custom middleware-style handling for API Quota limits and Connection failures.

---

## 📍 Clinic Information
- **Clinic Name**: Lucky Hospitals / Lucky Clinic System
- **Location**: Lucky Hospital Centre, Ravipadu Road, Narasaraopet, AP - 522601.
- **Phone**: +91 7207231018
- **OP Fee**: ₹300
- **Timings**: 10:00 AM - 3:00 PM (Monday to Saturday)

---

> Built with ❤️ by the Lucky Clinic Dev Team.
