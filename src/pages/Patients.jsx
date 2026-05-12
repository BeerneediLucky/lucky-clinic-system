import { useEffect, useState } from "react";
import { api } from "@/services/api";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  Calendar,
  MoreVertical,
  Download,
  Trash2,
  Edit
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'framer-motion';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await api.getPatients();
        setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.phone.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">Patient Registry</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and monitor all clinic patient records.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-12 px-6 gap-2 border-slate-200">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-medical rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-medical/20">
            <Plus className="h-5 w-5" /> Add New Patient
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6 rounded-[2rem] bg-gradient-to-br from-white to-blue-50/30">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Records</p>
          <h3 className="text-3xl font-black text-slate-800">{patients.length}</h3>
        </div>
        <div className="glass-card p-6 rounded-[2rem] bg-gradient-to-br from-white to-green-50/30">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">New this month</p>
          <h3 className="text-3xl font-black text-slate-800">+12</h3>
        </div>
        <div className="glass-card p-6 rounded-[2rem] bg-gradient-to-br from-white to-purple-50/30">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Active Cases</p>
          <h3 className="text-3xl font-black text-slate-800">45</h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-card rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl outline-none text-sm transition-all"
            />
          </div>
          <Button variant="ghost" className="rounded-xl gap-2 text-slate-500">
            <Filter className="h-4 w-4" /> More Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-8 gap-6">
          {filteredPatients.map((patient) => (
            <motion.div 
              layout
              key={patient.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group"
            >
              <div className="flex items-start justify-between mb-6">
                <Avatar className="h-16 w-16 border-4 border-white shadow-md">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} />
                  <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <h4 className="text-xl font-bold text-slate-800 mb-4">{patient.name}</h4>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-500">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Joined {new Date(patient.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <Button size="sm" variant="outline" className="flex-1 rounded-xl gap-2 border-slate-200 hover:border-primary/30">
                  <Edit className="h-3 w-3" /> Edit
                </Button>
                <Button size="sm" variant="ghost" className="flex-1 rounded-xl gap-2 text-red-500 hover:bg-red-50">
                  <Trash2 className="h-3 w-3" /> Delete
                </Button>
              </div>
            </motion.div>
          ))}

          {filteredPatients.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No patients found</h3>
              <p className="text-slate-400">Try adjusting your search or add a new patient.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
