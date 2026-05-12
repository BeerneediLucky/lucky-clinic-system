import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import DashboardLayout from "@/components/admin/DashboardLayout";
import StatCard from "@/components/admin/StatCard";
import RecentBookings from "@/components/admin/RecentBookings";
import { 
  Users, 
  Calendar, 
  Clock, 
  Stethoscope, 
  ArrowRight,
  Plus,
  Activity,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 font-display font-bold text-slate-600 animate-pulse">Initializing Medical System...</p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Status: Operational</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Clinic Overview
          </h1>
          <p className="text-slate-500 font-medium text-lg mt-1">
            Welcome back, Admin. Here's what's happening at Lucky Hospitals today.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="bg-medical hover:scale-105 transition-all shadow-lg shadow-medical/20 rounded-2xl h-12 px-6 gap-2">
            <Plus className="h-5 w-5" /> New Appointment
          </Button>
          <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 hover:bg-white hover:border-primary/30 transition-all">
            Daily Report <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Patients" 
          value={stats?.total_patients || 0} 
          icon={Users} 
          trend="up" 
          trendValue="12%" 
        />
        <StatCard 
          title="Active Appointments" 
          value={stats?.total_appointments || 0} 
          icon={Calendar} 
          trend="up" 
          trendValue="5%" 
        />
        <StatCard 
          title="Today's OP" 
          value={stats?.recent_bookings?.length || 0} 
          icon={Clock} 
          trend="down" 
          trendValue="3%" 
        />
        <StatCard 
          title="Medical Staff" 
          value="8" 
          icon={Stethoscope} 
          trend="up" 
          trendValue="Live" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table Area */}
        <div className="lg:col-span-2">
          <RecentBookings bookings={stats?.recent_bookings} />
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8 mt-8">
          {/* Health Status Widget */}
          <div className="glass-card p-8 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-black text-slate-800 tracking-tight uppercase text-xs">Live System Pulse</h4>
              <Activity className="h-4 w-4 text-medical animate-float" />
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>DATABASE CONNECTIVITY</span>
                  <span className="text-medical uppercase tracking-tighter">100%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-medical" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>AI ASSISTANT SYNC</span>
                  <span className="text-medical uppercase tracking-tighter">98.2%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} className="h-full bg-medical" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>SERVER LOAD</span>
                  <span className="text-amber-500 uppercase tracking-tighter">12%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '12%' }} className="h-full bg-amber-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Alert Widget */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
            <div className="relative z-10">
              <AlertCircle className="h-8 w-8 text-primary mb-4" />
              <h4 className="text-xl font-black tracking-tight mb-2">Upgrade System</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                Unlock advanced analytics and medical reporting features with LCMS Pro.
              </p>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
