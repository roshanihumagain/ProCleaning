import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user] = useState(JSON.parse(sessionStorage.getItem('user')) || {});
  const [bookings, setBookings] = useState([]);
  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch profile data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    try {
      await axios.post("http://localhost:5000/api/interactions/testimonials", 
        { text: testimonial },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Testimonial submitted! It will appear after admin approval.");
      setTestimonial("");
    } catch (err) {
      toast.error("Failed to submit testimonial.");
    }
  };

  const handlePay = async (bookingId) => {
    const token = sessionStorage.getItem('token');
    try {
      const res = await axios.post("http://localhost:5000/api/payments/initiate", 
        { bookingId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.payment_url;
    } catch (err) {
      toast.error("Failed to initiate payment");
    }
  };

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const handleCancelClick = (bookingId) => {
    setBookingToCancel(bookingId);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;
    setCancelDialogOpen(false);
    
    const token = sessionStorage.getItem('token');
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${bookingToCancel}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh list
      setBookings(bookings.map(b => b.id === bookingToCancel ? { ...b, status: 'CANCELLED' } : b));
      toast.info("Booking cancelled successfully.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to cancel booking");
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 10, mb: 10, px: { xs: 2, md: 4 } }}>
        <Typography variant='h4' sx={{ mb: 4, fontWeight: 'bold', color: '#36B864' }}>
          Welcome, {user.name}
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>My Booking History</Typography>
          {loading ? (
            <Typography>Loading bookings...</Typography>
          ) : bookings.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell>Service</TableCell>
                    <TableCell>Plan</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.service_title}</TableCell>
                      <TableCell>{booking.plan_type}</TableCell>
                      <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                      <TableCell>Rs. {booking.total_amount}</TableCell>
                      <TableCell>
                        <Typography sx={{ 
                          color: booking.status === 'PAID' ? 'green' : (booking.status === 'CANCELLED' ? 'red' : 'orange'),
                          fontWeight: 'bold',
                          fontSize: '0.9rem'
                        }}>
                          {booking.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {['CREATED', 'PAYMENT_PENDING'].includes(booking.status) && (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={() => handlePay(booking.id)}
                              sx={{ bgcolor: '#36B864', fontSize: '0.7rem', '&:hover': { bgcolor: '#2e9e4f' } }}
                            >
                              Pay Now
                            </Button>
                            <Button 
                              variant="outlined" 
                              color="error" 
                              size="small"
                              onClick={() => handleCancelClick(booking.id)}
                              sx={{ fontSize: '0.7rem' }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No bookings found.</Typography>
          )}
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>Leave a Testimonial</Typography>
          <form onSubmit={handleTestimonialSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="How was our service?"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <Button variant="contained" type="submit" sx={{ bgcolor: '#36B864', "&:hover": { bgcolor: '#2e9e4f' } }}>
              Submit Review
            </Button>
          </form>
        </Paper>

      </Box>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>No, Keep it</Button>
          <Button onClick={handleConfirmCancel} color="error" autoFocus>
            Yes, Cancel It
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default Profile;
