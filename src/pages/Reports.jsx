import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  ArrowRight,
  Download,
  Calendar,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Cell,
  Pie
} from 'recharts';

const appointmentData = [
  { name: 'Mon', count: 40 },
  { name: 'Tue', count: 30 },
  { name: 'Wed', count: 45 },
  { name: 'Thu', count: 35 },
  { name: 'Fri', count: 55 },
  { name: 'Sat', count: 20 },
  { name: 'Sun', count: 5 },
];

const revenueData = [
  { name: 'Jan', amount: 45000 },
  { name: 'Feb', amount: 52000 },
  { name: 'Mar', amount: 48000 },
  { name: 'Apr', amount: 61000 },
  { name: 'May', amount: 55000 },
];

const treatmentData = [
  { name: 'Dermatology', value: 45 },
  { name: 'Physiotherapy', value: 30 },
  { name: 'Arthritis', value: 25 },
];

const COLORS = ['#0ea5e9', '#2dd4bf', '#a855f7'];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">Insight Analytics</h1>
          <p className="text-slate-500 font-medium mt-1">Advanced reporting for clinical excellence.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-12 px-6 gap-2 border-slate-200">
            <Calendar className="h-4 w-4" /> This Month
          </Button>
          <Button className="bg-medical rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-medical/20">
            <Download className="h-5 w-5" /> Export Full Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Growth Chart */}
        <div className="glass-card p-8 rounded-[3rem]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Revenue Growth</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly performance</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-medical/10 flex items-center justify-center text-medical">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="amount" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Activity Chart */}
        <div className="glass-card p-8 rounded-[3rem]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Weekly Activity</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Patient flow monitor</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="count" fill="#2dd4bf" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Treatment Distribution */}
        <div className="glass-card p-8 rounded-[3rem] lg:col-span-1">
          <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Service Split</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={treatmentData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {treatmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-4">
            {treatmentData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                  <span className="text-sm font-bold text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-black text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card p-8 rounded-[3rem] bg-gradient-to-br from-white to-blue-50/50 flex flex-col justify-center">
            <Users className="h-8 w-8 text-primary mb-4" />
            <h4 className="text-3xl font-black text-slate-800">4,281</h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Lifetime Patients</p>
          </div>
          <div className="glass-card p-8 rounded-[3rem] bg-gradient-to-br from-white to-green-50/50 flex flex-col justify-center">
            <Activity className="h-8 w-8 text-medical mb-4" />
            <h4 className="text-3xl font-black text-slate-800">92.4%</h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Treatment Success Rate</p>
          </div>
          <div className="glass-card p-8 rounded-[3rem] bg-slate-900 text-white col-span-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-40 w-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl font-black tracking-tight mb-2">Automated Reports</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md">
                  Schedule weekly performance summaries to be sent directly to the clinic management email.
                </p>
              </div>
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold gap-2 px-8">
                Setup Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
