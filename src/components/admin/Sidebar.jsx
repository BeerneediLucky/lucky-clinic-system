import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  CreditCard, 
  BarChart3, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  PlusCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Patients", path: "/admin/patients" },
  { icon: Calendar, label: "Appointments", path: "/admin/appointments" },
  { icon: Stethoscope, label: "Doctors", path: "/admin/doctors" },
  { icon: CreditCard, label: "Billing", path: "/admin/billing" },
  { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  { icon: MessageSquare, label: "AI Assistant", path: "/admin/ai" },
];

const secondaryItems = [
  { icon: Bell, label: "Notifications", path: "/admin/notifications" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 glass-sidebar h-screen sticky top-0 flex flex-col p-4 z-50">
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="h-10 w-10 rounded-xl bg-medical flex items-center justify-center text-white shadow-lg">
          <PlusCircle className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-xl leading-tight">Lucky</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Clinic System</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-4 mb-4">Main Menu</div>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}
            `}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-4 mt-8 mb-4">General</div>
        {secondaryItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-primary/10 text-primary font-semibold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}
            `}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2 pt-4 border-t border-slate-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
