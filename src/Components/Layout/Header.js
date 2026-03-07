import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import logo from "../../images/logo.jpeg";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

const Header = () => {
  return (
    <Box>
      <AppBar component="nav" sx={{ bgcolor: "#E4DFD6" }}>
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />

          <Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ color: "#36B864", fontWeight: "bold" }}>Pro</Typography>
              <Typography sx={{ color: "black", fontWeight: "bold" }}>Cleaning</Typography>
            </Box>

            <Typography sx={{ fontSize: '0.5rem', color: "#4D4D4D" }}>
              Cleaning Services Company
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className='navigation-menu'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </Box>

          <Link to="/login" style={{ textDecoration: 'none', marginLeft:"200px" }}>
            <Button
              sx={{
                backgroundColor: "#36B864",
                color: "white",
                textTransform: "none",
                width:"150px",
                '&:hover': { backgroundColor: "#2d9f55" }
              }}
            >
              Get a quote
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
