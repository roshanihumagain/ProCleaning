import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Box, TextField, Typography, Paper, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../images/green-banner.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

 
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }


    localStorage.setItem("currentUser", JSON.stringify(user));

    
    navigate("/profile");
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
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: "40px", textAlign: "center", mb: 3 }}
          >
            Login
          </Typography>

          {error && (
            <Typography sx={{ color: "red", textAlign: "center", mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ width: "80%", mx: "auto" }}>
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

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                  backgroundColor: "#36B864",
                  fontSize: "18px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#2e9e4f" },
                }}
              >
                Login
              </Button>
            </Box>
          </form>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link
              to="#"
              style={{
                color: "#36B864",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Forgot password?
            </Link>
          </Box>

          <Typography
            sx={{ mt: 2, textAlign: "center", color: "#36B864", fontSize: 14 }}
          >
            Don’t have an account?{" "}
            <Link to="/registration" style={{ color: "blue", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Login;
