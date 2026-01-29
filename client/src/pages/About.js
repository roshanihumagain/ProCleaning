import React from "react";
import { Box, Typography, Button } from "@mui/material";
import cleaningImg from "../assets/images/hand.jpeg";
import momChildImg from "../assets/images/care.jpeg";
import babyImg from "../assets/images/baby.jpeg";
import windowCleaningImg from "../assets/images/clean.jpeg";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <Box sx={{ backgroundColor: "#d2d1d1", px: { xs: 1, md: 8 }, py: 1 }}>
       
        <Box className="a"
          sx={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
         
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#36B864",
                fontWeight: "bold",
                mb: 1,
                
                textTransform: "uppercase",
              }}
            >
              About Us
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Keeping Your Space Sparkling and Your Kids Happy!
            </Typography>

            <Typography sx={{ fontSize: "16px", color: "#555", mb: 4 }}>
              We provide professional cleaning services to keep your home or
              office spotless, along with a safe and caring daycare for your
              little ones. Our team is dedicated to making your life easier by
              ensuring a clean environment and a happy, nurturing space for
              children. Quality, safety, and reliability are at the heart of
              everything we do.
            </Typography>
            <Link to={"/services"}>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#36B864",
                textTransform: "none",
                px: 4,
                py: 1.2,
                borderRadius: 2,
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#2e9e4f",
                },
              }}
            >
              Get a Quote
            </Button></Link>
          </Box>

          
          <Box
            sx={{
              flex: 1,
              maxWidth: 420,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, 180px)", 
              gap: 2,
              mt: "80px",
              mb: "20px"
            }}
          >
         
            <Box sx={{ gridRow: "span 2" }}>
              <img
                src={momChildImg}
                alt="Mother caring for child"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            </Box>

          
            <Box>
              <img
                src={cleaningImg}
                alt="Professional cleaning service"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            </Box>

            
            <Box sx={{ gridRow: "span 2" }}>
              <img
                src={windowCleaningImg}
                alt="Window cleaning service"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            </Box>

           
            <Box>
              <img
                src={babyImg}
                alt="Happy baby in daycare"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default About;
