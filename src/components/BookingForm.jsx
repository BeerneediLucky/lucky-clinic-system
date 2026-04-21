import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    problem: "",
    date: ""
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // Connects to Django Backend
      const response = await fetch("http://localhost:8000/api/appointments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", phone: "", problem: "", date: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="book-appointment" className="py-20 bg-background">
      <div className="container max-w-lg mx-auto">
        <div className="text-center mb-10">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Book Now</span>
          <h2 className="font-display text-3xl font-bold mt-2">Patient Registration & Booking</h2>
          <p className="text-muted-foreground mt-2">Secure your appointment instantly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl shadow-card border border-border">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Appointment Date & Time</Label>
            <Input id="date" name="date" type="datetime-local" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem">Describe Your Problem</Label>
            <Textarea id="problem" name="problem" value={formData.problem} onChange={handleChange} required placeholder="Briefly describe your skin concern..." rows={4} />
          </div>

          {status === "success" && <div className="text-trust-green font-medium">Appointment booked successfully!</div>}
          {status === "error" && <div className="text-destructive font-medium">Failed to book appointment. Try again.</div>}

          <Button type="submit" disabled={status === "submitting"} className="w-full h-12 text-base">
            {status === "submitting" ? "Booking..." : "Confirm Booking"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
