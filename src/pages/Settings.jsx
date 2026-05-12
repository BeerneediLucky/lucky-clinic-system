import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  Settings as SettingsIcon, 
  User, 
  Hospital, 
  Shield, 
  Bell, 
  Moon, 
  Globe, 
  Save,
  Palette,
  Bot
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">System Settings</h1>
          <p className="text-slate-500 font-medium mt-1">Configure your clinic preferences and account security.</p>
        </div>
        
        <Button className="bg-medical rounded-2xl h-12 px-8 gap-2 shadow-lg shadow-medical/20 font-bold">
          <Save className="h-5 w-5" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { icon: Hospital, label: 'Clinic Profile', active: true },
            { icon: User, label: 'Admin Account' },
            { icon: Bot, label: 'AI Configuration' },
            { icon: Palette, label: 'Theme & Style' },
            { icon: Bell, label: 'Notifications' },
            { icon: Shield, label: 'Security & Privacy' },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                item.active 
                  ? 'bg-white shadow-lg shadow-slate-200/50 text-primary' 
                  : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="glass-card p-10 rounded-[3rem]">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Clinic Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Clinic Name</label>
                <input 
                  type="text" 
                  defaultValue="Lucky Hospitals"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                <input 
                  type="text" 
                  defaultValue="+91 7207231018"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Address</label>
                <textarea 
                  defaultValue="Lucky Hospital Centre, Ravipadu Road, Narasaraopet, AP - 522601"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Consultation Fee (OP)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input 
                    type="number" 
                    defaultValue="300"
                    className="w-full pl-10 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Working Hours</label>
                <input 
                  type="text" 
                  defaultValue="10:00 AM - 3:00 PM"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[3rem]">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Theme Preferences</h3>
            <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-900 text-white">
                  <Moon className="h-6 w-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-700">Dark Mode</h5>
                  <p className="text-xs text-slate-400 font-medium">Toggle between light and dark clinical interface.</p>
                </div>
              </div>
              <div className="h-6 w-12 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition-all"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
