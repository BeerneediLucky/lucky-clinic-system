import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  Stethoscope, 
  Star, 
  Clock, 
  Users, 
  MapPin,
  MoreVertical,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'framer-motion';

const doctors = [
  {
    id: 1,
    name: "Dr. Lucky",
    specialty: "Senior Dermatologist",
    patients: "1,200+",
    experience: "15 Years",
    rating: "4.9",
    availability: "10 AM - 3 PM",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    specialty: "Physiotherapist",
    patients: "850+",
    experience: "8 Years",
    rating: "4.8",
    availability: "9 AM - 1 PM",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  }
];

const Doctors = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">Medical Staff</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your team of world-class specialists.</p>
        </div>
        
        <Button className="bg-medical rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-medical/20">
          <Plus className="h-5 w-5" /> Add New Doctor
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {doctors.map((doc, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={doc.id}
            className="glass-card p-8 rounded-[3rem] group hover:shadow-2xl hover:shadow-primary/5 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700"></div>
            
            <div className="flex flex-col sm:flex-row gap-8 relative z-10">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Avatar className="h-32 w-32 rounded-[2rem] border-4 border-white shadow-xl">
                    <AvatarImage src={doc.image} />
                    <AvatarFallback>{doc.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 h-8 w-8 rounded-2xl border-4 border-white flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">{doc.name}</h3>
                    <p className="text-primary font-bold text-sm uppercase tracking-wider">{doc.specialty}</p>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="h-3.5 w-3.5 fill-current" /> {doc.rating}
                  </div>
                  <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{doc.experience} EXP</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-[10px] font-black text-slate-400 uppercase">Patients</span>
                    </div>
                    <p className="text-sm font-black text-slate-700">{doc.patients}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-[10px] font-black text-slate-400 uppercase">Availability</span>
                    </div>
                    <p className="text-sm font-black text-slate-700">{doc.availability}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl h-11 border-slate-200 font-bold">Manage Profile</Button>
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-slate-50 text-slate-500">
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Doctors;
