import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Patients from "./pages/Patients.jsx";
import Appointments from "./pages/Appointments.jsx";
import Doctors from "./pages/Doctors.jsx";
import Billing from "./pages/Billing.jsx";
import Reports from "./pages/Reports.jsx";
import AI_Assistant from "./pages/AI_Assistant.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";
import NotFound from "./pages/NotFound.jsx";
import Chatbot from "./components/Chatbot.jsx";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Chatbot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
          <Route path="/admin/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
          <Route path="/admin/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
          <Route path="/admin/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/admin/ai" element={<ProtectedRoute><AI_Assistant /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;