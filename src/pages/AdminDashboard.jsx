import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Clinic Dashboard</h1>
        <Button variant="outline" onClick={() => {
          localStorage.removeItem("auth_token");
          navigate("/login");
        }}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-white rounded-xl shadow border border-slate-100 text-center">
          <p className="text-muted-foreground uppercase text-xs font-semibold mb-1">Total Patients</p>
          <h2 className="text-4xl font-bold">{stats?.total_patients || 0}</h2>
        </div>
        <div className="p-6 bg-white rounded-xl shadow border border-slate-100 text-center">
          <p className="text-muted-foreground uppercase text-xs font-semibold mb-1">Total Appointments</p>
          <h2 className="text-4xl font-bold">{stats?.total_appointments || 0}</h2>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden border border-slate-100">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats?.recent_bookings?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.patient_name}</TableCell>
                <TableCell>{item.patient_phone}</TableCell>
                <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {(!stats?.recent_bookings || stats.recent_bookings.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No recent bookings found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
