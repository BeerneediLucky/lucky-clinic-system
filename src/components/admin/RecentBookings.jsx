import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Search, Filter, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

const RecentBookings = ({ bookings }) => {
  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden mt-8">
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Appointments</h3>
          <p className="text-sm text-slate-500 font-medium">Real-time booking monitor</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name..."
              className="pl-9 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/10 rounded-xl outline-none text-sm w-48 transition-all"
            />
          </div>
          <Button variant="outline" size="sm" className="rounded-xl gap-2 border-slate-200">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-2 border-slate-200">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-none">
              <TableHead className="py-5 px-8 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Patient</TableHead>
              <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Appointment Info</TableHead>
              <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Contact</TableHead>
              <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Status</TableHead>
              <TableHead className="py-5 px-8 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((item, idx) => (
              <TableRow key={item.id} className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <TableCell className="py-4 px-8">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.patient_name}`} />
                      <AvatarFallback>{item.patient_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{item.patient_name}</p>
                      <p className="text-[11px] text-slate-400 font-medium">#{1000 + idx}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-600">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <p className="text-sm font-semibold text-slate-600">{item.patient_phone}</p>
                </TableCell>
                <TableCell className="py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    item.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-700 shadow-sm shadow-green-100' 
                      : 'bg-amber-100 text-amber-700 shadow-sm shadow-amber-100'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-8 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!bookings || bookings.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-bold text-lg">No appointments found</p>
                    <p className="text-slate-300 text-sm">New bookings will appear here in real-time.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Showing {bookings?.length || 0} results</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-bold uppercase px-4 border-slate-200">Previous</Button>
          <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-bold uppercase px-4 border-slate-200 bg-white shadow-sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;
