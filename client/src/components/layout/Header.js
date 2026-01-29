import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../assets/images/logo.jpeg";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "../../assets/styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const checkUser = () => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();

    // Sync across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: "#36B864", fontWeight: 'bold' }}>
        ProCleaning
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemText primary="Home" sx={{ textAlign: 'center' }} />
          </NavLink>
        </ListItem>
        <ListItem disablePadding>
          <NavLink to="/services" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemText primary="Services" sx={{ textAlign: 'center' }} />
          </NavLink>
        </ListItem>
        <ListItem disablePadding>
          <NavLink to="/about" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemText primary="About Us" sx={{ textAlign: 'center' }} />
          </NavLink>
        </ListItem>
        <ListItem disablePadding>
          <NavLink to="/contact" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemText primary="Contact" sx={{ textAlign: 'center' }} />
          </NavLink>
        </ListItem>
        {user && user.role === 'ADMIN' && (
          <ListItem disablePadding>
            <NavLink to="/admin" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Dashboard" sx={{ textAlign: 'center' }} />
            </NavLink>
          </ListItem>
        )}
        {user && (
          <ListItem disablePadding>
            <NavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Profile" sx={{ textAlign: 'center' }} />
            </NavLink>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar component="nav" sx={{ bgcolor: "#E4DFD6" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: '#36B864' }}
            >
              <MenuIcon />
            </IconButton>
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
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className='navigation-menu'>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              {user && user.role === 'ADMIN' && (
                <li><NavLink to="/admin">Dashboard</NavLink></li>
              )}
              {user && (
                <li><NavLink to="/profile">Profile</NavLink></li>
              )}
            </ul>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
                   {user.name}
                </Typography>
                <Button
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: "#f44336",
                    color: "white",
                    textTransform: "none",
                    '&:hover': { backgroundColor: "#d32f2f" }
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    backgroundColor: "#36B864",
                    color: "white",
                    textTransform: "none",
                    width: "150px",
                    '&:hover': { backgroundColor: "#2d9f55" }
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
