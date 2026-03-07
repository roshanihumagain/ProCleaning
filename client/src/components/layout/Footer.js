import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';
import logo from "../../assets/images/logo.jpeg";
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#2C2C2C', color: 'white', pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                <span style={{ color: '#36B864' }}>Pro</span>Cleaning
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#AAAAAA', mb: 2 }}>
              Your trusted partner for professional cleaning services. We provide high-quality, reliable, and affordable cleaning solutions for homes and businesses.
            </Typography>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '16px' }}>Services</Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/services" sx={{ color: '#AAAAAA', textDecoration: 'none', '&:hover': { color: '#36B864' } }}>Home Cleaning</Link>
              <Link component={RouterLink} to="/services" sx={{ color: '#AAAAAA', textDecoration: 'none', '&:hover': { color: '#36B864' } }}>Office Cleaning</Link>
              <Link component={RouterLink} to="/services" sx={{ color: '#AAAAAA', textDecoration: 'none', '&:hover': { color: '#36B864' } }}>Commercial Cleaning</Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '16px' }}>Company</Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/about" sx={{ color: '#AAAAAA', textDecoration: 'none', '&:hover': { color: '#36B864' } }}>About Us</Link>
              <Link component={RouterLink} to="/contact" sx={{ color: '#AAAAAA', textDecoration: 'none', '&:hover': { color: '#36B864' } }}>Contact</Link>
              <Link component={RouterLink} to="/privacy" sx={{ color: '#AAAAAA', textDecoration: 'none', '&:hover': { color: '#36B864' } }}>Privacy Policy</Link>
              <Link component={RouterLink} to="/terms" sx={{ color: '#AAAAAA', textDecoration: 'none', '&:hover': { color: '#36B864' } }}>Terms & Conditions</Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '16px' }}>Get in Touch</Typography>
            <Typography variant="body2" sx={{ color: '#AAAAAA', mb: 1 }}>
              Email: info@procleaning.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#AAAAAA', mb: 1 }}>
              Phone: +977 1234567890
            </Typography>
            <Typography variant="body2" sx={{ color: '#AAAAAA' }}>
              Address: Kathmandu, Nepal
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid #444', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#888' }}>
            © {new Date().getFullYear()} ProCleaning. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
