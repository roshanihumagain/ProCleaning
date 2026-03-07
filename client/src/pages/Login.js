import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Box, TextField, Typography, Paper, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/green-banner.jpeg";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email must include '@' and be valid";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name] || errors.form) {
      setErrors({ ...errors, [e.target.name]: "", form: "" });
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password
      });

      // Store token and user info
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user.role === 'ADMIN') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Login failed. Please check your credentials.";
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
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: "40px", textAlign: "center", mb: 3 }}
          >
            Login
          </Typography>

          {errors.form && (
            <Typography sx={{ color: "red", textAlign: "center", mb: 2 }}>
              {errors.form}
            </Typography>
          )}

          <form onSubmit={handleSubmit} noValidate>
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
                error={!!errors.email}
                helperText={errors.email}
                required
              />

              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
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
