import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  Trash2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const notifications = [
  { id: 1, type: 'appointment', title: 'New Appointment', message: 'John Doe booked for Dermatology at 10:30 AM', time: '5m ago', icon: Calendar, color: 'text-primary bg-primary/10' },
  { id: 2, type: 'payment', title: 'Payment Received', message: 'Invoice #INV-001 has been paid successfully.', time: '1h ago', icon: DollarSign, color: 'text-green-500 bg-green-50' },
  { id: 3, type: 'ai', title: 'AI Assistant Alert', message: 'High volume of inquiries detected on WhatsApp.', time: '3h ago', icon: MessageSquare, color: 'text-purple-500 bg-purple-50' },
  { id: 4, type: 'system', title: 'System Update', message: 'LCMS v2.4.1 is now live with stability fixes.', time: '1d ago', icon: AlertCircle, color: 'text-amber-500 bg-amber-50' },
];

const Notifications = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">Notification Center</h1>
          <p className="text-slate-500 font-medium mt-1">Stay updated with clinic activities and system alerts.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-12 px-6 gap-2 border-slate-200">
            Clear All
          </Button>
          <Button className="bg-medical rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-medical/20">
            <Bell className="h-5 w-5" /> Mark All Read
          </Button>
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        {notifications.map((notif, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={notif.id}
            className="glass-card p-6 rounded-3xl flex items-start gap-6 group hover:border-primary/20 hover:bg-white transition-all cursor-pointer"
          >
            <div className={`h-12 w-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${notif.color}`}>
              <notif.icon className="h-6 w-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 leading-tight">{notif.title}</h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{notif.time}</span>
              </div>
              <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">{notif.message}</p>
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-50">
                <button className="text-xs font-bold text-primary hover:underline">View Details</button>
                <button className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {notifications.length === 0 && (
          <div className="py-20 text-center glass-card rounded-[3rem]">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-10 w-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">You're all caught up!</h3>
            <p className="text-slate-400">No new notifications at the moment.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
