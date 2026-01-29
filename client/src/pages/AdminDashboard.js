import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = React.useCallback(async () => {
    const token = sessionStorage.getItem('token');
    let endpoint = "";
    if (tab === 0) endpoint = "/api/bookings";
    if (tab === 1) endpoint = "/api/services";
    if (tab === 2) endpoint = "/api/interactions/inquiries";

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [fetchData, navigate]);

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 10, mb: 10, px: 2 }}>
        <Typography variant='h4' sx={{ mb: 4, fontWeight: 'bold', color: '#36B864' }}>
          Admin Dashboard
        </Typography>

        <Paper sx={{ mb: 4 }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="primary" indicatorColor="primary">
            <Tab label="Bookings" />
            <Tab label="Services" />
            <Tab label="Inquiries" />
          </Tabs>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    {tab === 0 && (
                      <>
                        <TableCell>ID</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                      </>
                    )}
                    {tab === 1 && (
                      <>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Hourly</TableCell>
                        <TableCell>Daily</TableCell>
                      </>
                    )}
                    {tab === 2 && (
                      <>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Message</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, idx) => (
                    <TableRow key={idx}>
                      {tab === 0 && (
                        <>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.user_name}</TableCell>
                          <TableCell>{item.service_title}</TableCell>
                          <TableCell>
                            {new Date(item.booking_date).toLocaleDateString()}<br/>
                            {item.booking_time}
                          </TableCell>
                          <TableCell>
                            {item.phone}<br/>
                            <span style={{fontSize: '0.8em', color: 'gray'}}>{item.user_email}</span>
                          </TableCell>
                          <TableCell>{item.address}</TableCell>
                          <TableCell>Rs. {item.total_amount}</TableCell>
                          <TableCell>{item.status}</TableCell>
                        </>
                      )}
                      {tab === 1 && (
                        <>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>Rs. {item.price_hourly}</TableCell>
                          <TableCell>Rs. {item.price_daily}</TableCell>
                        </>
                      )}
                      {tab === 2 && (
                        <>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.message}</TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </Layout>
  );
};

export default AdminDashboard;
