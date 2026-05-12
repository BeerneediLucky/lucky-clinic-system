import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  MessageSquare, 
  Settings, 
  History, 
  Sparkles, 
  ShieldAlert,
  Bot,
  Zap,
  Power
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const AI_Assistant = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">AI Control Center</h1>
          <p className="text-slate-500 font-medium mt-1">Configure and monitor the Lucky AI Medical Assistant.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-12 px-6 gap-2 border-slate-200">
            <History className="h-4 w-4" /> View Logs
          </Button>
          <Button className="bg-medical rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-medical/20">
            <Settings className="h-5 w-5" /> AI Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main Status Card */}
          <div className="glass-card p-10 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-[2rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
                  <Bot className="h-8 w-8 text-white animate-float" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Lucky AI <span className="text-primary">v2.4</span></h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status: Active & Learning</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Inquiries</p>
                  <h4 className="text-2xl font-black">1,842</h4>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Accuracy Rate</p>
                  <h4 className="text-2xl font-black text-primary">99.1%</h4>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Response</p>
                  <h4 className="text-2xl font-black">0.8s</h4>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-8 font-bold gap-2">
                  <Zap className="h-4 w-4" /> Retrain Model
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/5 rounded-xl px-6 font-bold gap-2">
                  <Power className="h-4 w-4 text-red-400" /> Deactivate
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Config */}
          <div className="glass-card p-8 rounded-[3rem]">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Safety Protocols</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-red-50 text-red-500">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700">Non-Diagnostic Restriction</h5>
                    <p className="text-xs text-slate-400 font-medium">Prevents the AI from diagnosing medical conditions.</p>
                  </div>
                </div>
                <div className="h-6 w-12 bg-medical rounded-full relative">
                  <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-medical/10 text-medical">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700">Enquiry Smart-Routing</h5>
                    <p className="text-xs text-slate-400 font-medium">Automatically directs complex queries to human staff.</p>
                  </div>
                </div>
                <div className="h-6 w-12 bg-medical rounded-full relative">
                  <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Data Sidebar */}
        <div className="space-y-8">
          <div className="glass-card p-8 rounded-[3rem]">
            <h4 className="font-black text-slate-800 tracking-tight uppercase text-xs mb-6">Knowledge Base Sync</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <span className="text-xs font-black text-slate-400">PDF</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-700">Clinic_Policy_v2.pdf</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Synced 2h ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <span className="text-xs font-black text-slate-400">TXT</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-700">Services_Faq_2026.txt</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Synced 5h ago</p>
                </div>
              </div>
              <Button className="w-full bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl font-bold py-6 border-none shadow-none mt-4">
                Upload New Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AI_Assistant;
