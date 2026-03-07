import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Box, TextField, Typography, Paper, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../images/green-banner.jpeg";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

  
    setSuccess("Registration successful! Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
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
            width: 600,
            p: 4,
            bgcolor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(5px)",
            mb:8
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: "40px", textAlign: "center", mb: 3 }}
          >
            Sign Up
          </Typography>

          {error && (
            <Typography sx={{ color: "red", textAlign: "center", mb: 2 }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography sx={{ color: "green", textAlign: "center", mb: 2 }}>
              {success}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ width: "80%", mx: "auto" }}>
              <TextField
                fullWidth
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                variant="filled"
                required
              />

              <TextField
                fullWidth
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="filled"
                required
              />

              <TextField
                fullWidth
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                variant="filled"
                required
              />

              <TextField
                fullWidth
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                variant="filled"
                required
              />

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
