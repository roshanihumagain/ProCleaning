import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Box, TextField, Typography, Paper, Button, Checkbox, FormControlLabel, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/green-banner.jpeg";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email must include '@' and be valid";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      tempErrors.password = "Password must contain at least one uppercase letter";
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    const phoneRegex = /^9\d{9}$/;
    if (!formData.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Phone number must be exactly 10 digits starting with 9";
    }

    if (!formData.address) tempErrors.address = "Address is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!termsAccepted) {
      setErrors({ ...errors, terms: "Please accept the Terms and Conditions" });
      return;
    }

    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: "+977" + formData.phone,
        address: formData.address
      });

      // Auto-login: Store token and user info
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccess("Registration successful! Redirecting home...");
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed. Please try again.";
      setErrors({ ...errors, form: errorMsg });
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 8 },
          mt: "65px",
          pt: "64px",
        }}
      >
        <Paper className="a"
          elevation={3}
          sx={{
            maxWidth: 600,
            width: '90%',
            p: { xs: 2, md: 4 },
            bgcolor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(5px)",
            mb: 8,
            borderRadius: 3
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: "40px", textAlign: "center", mb: 3 }}
          >
            Sign Up
          </Typography>

            {errors.form && (
              <Typography sx={{ color: "red", textAlign: "center", mb: 2 }}>
                {errors.form}
              </Typography>
            )}

            {success && (
              <Typography sx={{ color: "green", textAlign: "center", mb: 2 }}>
                {success}
              </Typography>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <Box sx={{ width: "90%", mx: "auto" }}>
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="dense"
                  variant="filled"
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />

                <TextField
                  fullWidth
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="dense"
                  variant="filled"
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />

              <TextField
                fullWidth
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) {
                    setFormData({ ...formData, phone: val });
                    if (errors.phone) setErrors({...errors, phone: ""});
                  }
                }}
                margin="dense"
                variant="filled"
                error={!!errors.phone}
                helperText={errors.phone}
                required
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">+977</InputAdornment>,
                  },
                }}
              />

              <TextField
                fullWidth
                placeholder="Location / Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="dense"
                variant="filled"
                error={!!errors.address}
                helperText={errors.address}
                required
              />

              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="dense"
                variant="filled"
                error={!!errors.password}
                helperText={errors.password}
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="dense"
                variant="filled"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox 
                    checked={termsAccepted} 
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if(errors.terms) setErrors({...errors, terms: ""});
                    }} 
                    sx={{ color: '#36B864', '&.Mui-checked': { color: '#36B864' } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: '14px' }}>
                    I agree to the <Link to="/terms" style={{ color: '#36B864', textDecoration: 'underline' }}>Terms and Conditions</Link>
                  </Typography>
                }
                sx={{ mt: 1 }}
              />
              {errors.terms && (
                <Typography variant="caption" color="error" sx={{display: 'block', ml: 2}}>
                  {errors.terms}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                  backgroundColor: "#36B864",
                  fontSize: "18px",
                  "&:hover": { backgroundColor: "#2e9e4f" },
                }}
              >
                Register
              </Button>
            </Box>

            <Typography
              sx={{ mt: 2, textAlign: "center", color: "#36B864", fontSize: 14 }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ color: "blue", fontWeight: "bold" }}>
                Sign In
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Registration;
