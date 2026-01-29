import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import "../assets/styles/servicesbook.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { toast } from "react-toastify";

const Servicesbook = () => {
  const [planType, setPlanType] = useState("day");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        setPackages(response.data);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    address: "",
    phone: ""
  });

  const handleBookClick = (pkg) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.warn("Please login to book a service");
      navigate("/login");
      return;
    }
    const user = JSON.parse(sessionStorage.getItem('user'));
    setSelectedPkg(pkg);
    setBookingData({
      date: "",
      time: "",
      address: user?.address || "",
      phone: user?.phone || ""
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDataChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const confirmBooking = async () => {
    if (!bookingData.date || !bookingData.time || !bookingData.address || !bookingData.phone) {
      toast.warn("Please fill in all details");
      return;
    }

    const token = sessionStorage.getItem("token");
    try {
      // 1. Create Booking
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          serviceId: selectedPkg.id,
          planType: planType === "day" ? "DAILY" : "HOURLY",
          bookingDate: bookingData.date,
          bookingTime: bookingData.time,
          address: bookingData.address,
          phone: bookingData.phone,
          duration: 1 // Default to 1 hour/day for now
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Booking created successfully! Proceeding to payment...");
      
      // 2. Initiate payment
      const payResponse = await axios.post(
        "http://localhost:5000/api/payments/initiate",
        { bookingId: response.data.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3. Redirect to Khalti
      window.location.href = payResponse.data.payment_url;

    } catch (err) {
      toast.error(err.response?.data?.error || "Booking failed");
    }
  };

  if (loading) return <Layout><div style={{textAlign: 'center', padding: '50px'}}>Loading services...</div></Layout>;

  return (
    <Layout>
      <section className="pricing-section">
        <div className="pricing-header">
          <p>OUR PRICING</p>
          <h1>
            Choose From Our Lowest <br /> Plans and Prices
          </h1>

          <div className="toggle">
            <button
              className={planType === "day" ? "active" : ""}
              onClick={() => setPlanType("day")}
            >
              Daily
            </button>
            <button
              className={planType === "hour" ? "active" : ""}
              onClick={() => setPlanType("hour")}
            >
              Hourly
            </button>
          </div>
        </div>

        <div className="pricing-cards">
          {packages.map((pkg, index) => (
            <div key={index} className="pricing-card">
              <h3>{pkg.title}</h3>

              <div className="price-box">
                Rs. {planType === "day" ? pkg.price_daily : pkg.price_hourly} <span>/{planType}</span>
              </div>

              <ul>
                {pkg.description && pkg.description.split(',').map((feature, i) => (
                  <li key={i}>{feature.trim()}</li>
                ))}
              </ul>

              <button className="book-btn" onClick={() => handleBookClick(pkg)}>Book Now</button>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: '#36B864', fontWeight: 'bold' }}>
          Booking Details
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300, mt: 1 }}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={bookingData.date}
              onChange={handleDataChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Time"
              type="time"
              name="time"
              value={bookingData.time}
              onChange={handleDataChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Address"
              name="address"
              value={bookingData.address}
              onChange={handleDataChange}
              fullWidth
              required
              placeholder="Enter your location"
            />
            <TextField
              label="Phone"
              name="phone"
              value={bookingData.phone}
              onChange={handleDataChange}
              fullWidth
              required
              placeholder="Contact number"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button 
            onClick={confirmBooking} 
            variant="contained" 
            sx={{ bgcolor: '#36B864', '&:hover': { bgcolor: '#2e9e4f' } }}
          >
            Confirm & Pay
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Servicesbook;
