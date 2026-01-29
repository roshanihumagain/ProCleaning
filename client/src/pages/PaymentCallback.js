import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import axios from 'axios';
import Layout from '../components/layout/Layout';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const verify = async () => {
      const pidx = searchParams.get('pidx');
      const statusParam = searchParams.get('status');

      if (!pidx || statusParam === 'User canceled') {
        setStatus('error');
        setErrorMsg('Payment canceled by user');
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      try {
        const token = sessionStorage.getItem('token');
        await axios.post('http://localhost:5000/api/payments/verify', 
          { pidx },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatus('success');
        setTimeout(() => navigate('/profile'), 3000);
      } catch (err) {
        console.error('Payment verification failed', err);
        setStatus('error');
        setErrorMsg(err.response?.data?.error || "Verification Failed");
        setTimeout(() => navigate('/profile'), 3000);
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <Layout>
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 5, textAlign: 'center', maxWidth: 400 }}>
          {status === 'verifying' && (
            <>
              <CircularProgress sx={{ mb: 3, color: '#36B864' }} />
              <Typography variant="h6">Verifying your payment...</Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>Please do not close this window.</Typography>
            </>
          )}
          {status === 'success' && (
            <>
              <Typography variant="h5" sx={{ color: '#36B864', mb: 2, fontWeight: 'bold' }}>Payment Successful!</Typography>
              <Typography variant="body1">Redirecting you to your profile...</Typography>
            </>
          )}
          {status === 'error' && (
            <>
              <Typography variant="h5" sx={{ color: 'red', mb: 2, fontWeight: 'bold' }}>Payment Failed</Typography>
              <Typography variant="body1">{errorMsg || "Something went wrong or the payment was canceled."}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>Redirecting to profile...</Typography>
            </>
          )}
        </Paper>
      </Box>
    </Layout>
  );
};

export default PaymentCallback;
