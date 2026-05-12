import { useEffect, useState } from "react";
import { api } from "@/services/api";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await api.getAppointments();
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">Appointment Queue</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time scheduling and patient flow management.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
          <Button variant="ghost" className="rounded-xl h-10 px-4 bg-slate-50 text-primary font-bold">List View</Button>
          <Button variant="ghost" className="rounded-xl h-10 px-4 text-slate-500 font-medium hover:text-primary">Calendar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card p-4 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h3 className="text-lg font-bold text-slate-700">May 12, 2026</h3>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 mr-4">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">12 Confirmed</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 mr-6">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">4 Pending</span>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-slate-200 gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {appointments.map((apt, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={apt.id}
                className="glass-card p-6 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded-2xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                    <span className="text-primary font-black text-xl leading-none">
                      {new Date(apt.date).getHours()}:{new Date(apt.date).getMinutes().toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">AM</span>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 leading-tight">{apt.patient_name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider">30 Min Session</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider">General Checkup</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    apt.status === 'Confirmed' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {apt.status}
                  </span>
                  <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-green-500 hover:bg-green-50">
                    <CheckCircle2 className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-red-400 hover:bg-red-50">
                    <XCircle className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-slate-300">
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </div>
              </motion.div>
            ))}

            {appointments.length === 0 && (
              <div className="py-20 text-center glass-card rounded-[2.5rem]">
                <p className="text-slate-400 font-bold">No appointments scheduled for this date.</p>
              </div>
            )}
          </div>
        </div>

        {/* Calendar Sidebar Mini */}
        <div className="space-y-8">
          <div className="glass-card p-8 rounded-[2.5rem]">
            <h4 className="font-black text-slate-800 tracking-tight uppercase text-xs mb-6">Today's Timeline</h4>
            <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              <div className="relative">
                <div className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
                <p className="text-[10px] font-black text-primary uppercase">10:00 AM</p>
                <p className="text-sm font-bold text-slate-700">Morning Rounds</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-slate-200"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase">11:30 AM</p>
                <p className="text-sm font-bold text-slate-700">Patient Consultation</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-slate-200"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase">01:00 PM</p>
                <p className="text-sm font-bold text-slate-700">Lunch Break</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-slate-200"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase">02:15 PM</p>
                <p className="text-sm font-bold text-slate-700">Dermatology Lab</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
