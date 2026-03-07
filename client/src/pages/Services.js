import React from "react";
import { Box, Typography, Button } from "@mui/material";
import houseImg from "../assets/images/capture.jpeg";
import laundryImg from "../assets/images/clothes.jpeg";
import dishImg from "../assets/images/hands.jpeg";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const Services = () => {

  const bookBtnStyle = {
    border: "1px solid #ccc",
    color: "#333",
    textTransform: "none",
    borderRadius: 2,
    px: 2,
    "&:hover": {
      backgroundColor: "#36B864",
      color: "#fff",
      borderColor: "#36B864",
    },
    "&:active": {
      backgroundColor: "#36B864",
      color: "#fff",
    },
  };

  return (
    <Layout>
      <Box  sx={{ backgroundColor: "#d2d1d1", mt: 8, px: { xs: 1, md: 8 }, py: 6 }}>
        
      
        <Box className="a"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 4,
          }}
        >
          <Typography 
            variant="h4"
            sx={{ fontWeight: "bold", maxWidth: 400 }}
          >
            We Always Provide The Best Service
          </Typography>

          <Box sx={{ maxWidth: 300 }}>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
              Services
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#555" }}>
              While we can customize your cleaning plan to suit your needs,
              most clients schedule regular cleaning services.
            </Typography>
          </Box>
        </Box>

    
        <Box className="a"
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
      
          <Box
            sx={{
              background: "#fff",
              borderRadius: 4,
              width: 300,
              p: 2,
              boxShadow: 2,
            }}
          >
            <img
              src={houseImg}
              alt="House Cleaning"
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />

            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
              House Cleaning
            </Typography>

            <Typography sx={{ fontSize: 14, color: "#555", my: 1 }}>
              While we can customize your cleaning plan to suit your needs,
              most clients schedule regular cleaning services.
            </Typography>

            <Link to="/servicesbook"><Button sx={bookBtnStyle}>Book Now →</Button></Link>
          </Box>

         
          <Box
            sx={{
              background: "#fff",
              borderRadius: 4,
              width: 300,
              p: 2,
              boxShadow: 2,
            }}
          >
            <img
              src={laundryImg}
              alt="Laundry"
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />

            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
              Laundry
            </Typography>

            <Typography sx={{ fontSize: 14, color: "#555", my: 1 }}>
              While we can customize your laundry plan to suit your needs,
              most clients schedule regular cleaning services.
            </Typography>

            <Link to="/servicesbook"><Button sx={bookBtnStyle}>Book Now →</Button></Link>
          </Box>

       
          <Box
            sx={{
              background: "#fff",
              borderRadius: 4,
              width: 300,
              p: 2,
              boxShadow: 2,
            }}
          >
            <img
              src={dishImg}
              alt="Washing Dishes"
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />

            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
              Washing Dishes
            </Typography>

            <Typography sx={{ fontSize: 14, color: "#555", my: 1 }}>
              While we can customize your cleaning plan to suit your needs,
              most clients schedule regular cleaning services.
            </Typography>

            <Link to="/servicesbook"><Button sx={bookBtnStyle}>Book Now →</Button></Link>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Services;
