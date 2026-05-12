import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  Download,
  Filter,
  Search,
  DollarSign
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { motion } from 'framer-motion';

const transactions = [
  { id: "INV-001", patient: "John Doe", type: "Consultation", amount: "₹300", status: "Paid", date: "2026-05-12" },
  { id: "INV-002", patient: "Jane Smith", type: "Physiotherapy", amount: "₹800", status: "Pending", date: "2026-05-12" },
  { id: "INV-003", patient: "Robert Brown", type: "Skin Treatment", amount: "₹2500", status: "Paid", date: "2026-05-11" },
  { id: "INV-004", patient: "Alice Green", type: "Pharmacy", amount: "₹450", status: "Paid", date: "2026-05-11" },
];

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">Financial Ledger</h1>
          <p className="text-slate-500 font-medium mt-1">Monitor revenue, invoices, and payment histories.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-12 px-6 gap-2 border-slate-200">
            <Download className="h-4 w-4" /> Download Statement
          </Button>
          <Button className="bg-medical rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-medical/20">
            <DollarSign className="h-5 w-5" /> Generate Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="p-3 rounded-2xl bg-primary/20 w-fit mb-6">
              <ArrowUpRight className="h-6 w-6 text-primary" />
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Total Revenue</p>
            <h3 className="text-4xl font-black tracking-tight">₹45,280</h3>
            <p className="text-green-400 text-[10px] font-bold mt-2 uppercase tracking-tighter">+18% FROM LAST MONTH</p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden">
          <div className="p-3 rounded-2xl bg-amber-50 w-fit mb-6">
            <Clock className="h-6 w-6 text-amber-500" />
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Pending Payments</p>
          <h3 className="text-4xl font-black tracking-tight text-slate-800">₹3,400</h3>
          <p className="text-amber-500 text-[10px] font-bold mt-2 uppercase tracking-tighter">5 INVOICES UNPAID</p>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden">
          <div className="p-3 rounded-2xl bg-medical/10 w-fit mb-6">
            <CheckCircle2 className="h-6 w-6 text-medical" />
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Completed Transactions</p>
          <h3 className="text-4xl font-black tracking-tight text-slate-800">142</h3>
          <p className="text-medical text-[10px] font-bold mt-2 uppercase tracking-tighter">98.2% SUCCESS RATE</p>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Transactions</h3>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Invoice ID, Patient..."
                className="pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-2xl outline-none text-sm w-64 transition-all"
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200">
              <Filter className="h-4 w-4 text-slate-400" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="py-5 px-8 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Invoice ID</TableHead>
                <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Patient</TableHead>
                <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Treatment</TableHead>
                <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Amount</TableHead>
                <TableHead className="py-5 font-bold text-slate-600 uppercase text-[11px] tracking-wider">Status</TableHead>
                <TableHead className="py-5 px-8 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-5 px-8">
                    <span className="font-bold text-slate-700 text-sm">{tx.id}</span>
                  </TableCell>
                  <TableCell className="py-5 font-semibold text-slate-600">{tx.patient}</TableCell>
                  <TableCell className="py-5 text-sm text-slate-500 font-medium">{tx.type}</TableCell>
                  <TableCell className="py-5 font-black text-slate-800 tracking-tight">{tx.amount}</TableCell>
                  <TableCell className="py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      tx.status === 'Paid' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-8 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
