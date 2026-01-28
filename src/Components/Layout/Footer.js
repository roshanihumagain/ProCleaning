import { Box, Typography, Input, Button } from '@mui/material';
import React from 'react';
import logo from "../../images/lo.jpeg";
import { Link } from 'react-router-dom';
import "../../styles/footer.css"; // We'll use CSS for hover effects

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#111D15", py: 5, px: 10 }}>
      <Box sx={{ display: "flex", marginLeft:"120px", flexWrap: "wrap" }}>
        
        {/* Logo & Info */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 250 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: '30px' }}
            />
            <Box>
              <Box sx={{ display: 'flex', alignItems: "center" }}>
                <Typography sx={{ color: "#36B864", fontSize:"14.58px", fontWeight: "bold" }}>
                  Pro
                </Typography>
                <Typography sx={{ color: "white", fontSize:"14.58px", fontWeight: "bold", ml: 0.5 }}>
                  Cleaning
                </Typography>
              </Box>
              <Typography sx={{ fontSize:"7px", color: "#ffffff" }}>
                Cleaning Services Company
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ color: "white", fontSize:"9.33px", lineHeight: 1.8, maxWidth: 400 }}>
            Stay updated with our latest cleaning tips.<br />
            Service updates, and helpful articles on<br />
            maintaining a spotless home.
          </Typography>
        </Box>

        {/* Company Links */}
        <Box sx={{ display: "flex", flexDirection: "column", mt:-1, marginLeft:"8px" }}>
          <Typography sx={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            Company
          </Typography> 
          <Link to={"/about"} className="footer-link">About Us</Link>
          <Link to={"/services"} className="footer-link">Services</Link>
          <Link to="/feedback" className="footer-link">Feedback</Link>
        </Box>

        {/* KnowMore Links */}
        <Box sx={{ display: "flex", flexDirection: "column", mt:-1, ml:9 }}>
          <Typography sx={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            KnowMore
          </Typography> 
          <Link to={"/contact"} className="footer-link">Support</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Teams & Conditions</Link>
        </Box>

        {/* Newsletter */}
        <Box sx={{ display: "flex", flexDirection: "column", mt: -1, ml: 8, minWidth: 200 }}>
          <Typography sx={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            Newsletter
          </Typography> 

          <Input
            placeholder='Email Goes here'
            sx={{
              backgroundColor: "#111D15",
              color: "white",
              px: 1,
              borderRadius: 1,
              flex: 1,
              mt: 1,
              border: '1px #808080 solid',
            }}
          />

          <Button 
            sx={{
              backgroundColor: "#36B864", 
              mt: 2, 
              color: "white",
              width:"80px",
              height:"35px",
              textTransform: "none",
              '&:hover': { backgroundColor: "#2FA14B" } // darker green hover
            }}
          >
            Send
          </Button>
        </Box>
      </Box>

      {/* Footer bottom text */}
      <Typography sx={{ textAlign: 'center', fontSize: '0.75rem', color: "#979797", mt: 5 }}>
        2024 "ProCleaning" All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
