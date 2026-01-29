import React from "react";
import Layout from "../Components/Layout/Layout";
import { Box, Typography, Button } from "@mui/material";
import bgImage from "../images/home.jpeg"; 
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
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
      <Box
        sx={{
          
          justifyContent: "space-between",
          px: { xs: 2, md: 8 },
          ml:"-600px",
          mt: "-188px",
          
      
        }}
      >
    
        <Box sx={{ maxWidth: 500 }}>
          <Typography  className="a"
          variant="subtitle1" sx={{ mb: 1 }}>
            Quality cleaning at a fair price.
          </Typography>

          <Typography  className="a"
          variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            Clean Home, Clear Minds.
          </Typography>

          <Typography className="a" sx={{ mb: 4, fontSize: "16px", color: "#555" }}>
            We provide performing cleaning tasks using the least amount of time, energy, and money.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Link to="/contact">
            <Button className="a"
              variant="contained"
              sx={{
                backgroundColor: "#36B864",
                fontSize: "16px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#2e9e4f" },
              }}
            >
              Get Start Now
            </Button>
            </Link>
            <Link to="/services">
            <Button className="a"
              variant="outlined"
              sx={{
                fontSize: "16px",
                textTransform: "none",
                borderColor: "black",
                fontWeight:"bold",
                color: "black",

                "&:hover": { backgroundColor: "#e6f4ea", borderColor: "#36B864" },
              }}
            >
              View all Services
            </Button> </Link>
          </Box>
        </Box>

        </Box>
        </Box>
      
    </Layout>
  );
};

export default Home;
