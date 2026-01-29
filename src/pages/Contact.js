import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Layout from "../Components/Layout/Layout";

const Contact = () => {
  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#d2d1d1",
          px: { xs: 2, md: 10 },
          py: { xs: 4, md: 8 },
        }}
      >
    
        <Box className="a"
          sx={{
            display: "flex",
            gap: 6,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold",mt:6, mb: 4 }}
            >
              Find us
            </Typography>

          
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#fff",
                p: 2,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#36B864",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <CallIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">Call Us</Typography>
                <Typography color="text.secondary">
                  +(08) 255 201 888
                </Typography>
              </Box>
            </Box>

           
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#fff",
                p: 2,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#36B864",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <EmailIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">Email Now</Typography>
                <Typography color="text.secondary">
                  hello@procleaning.com
                </Typography>
              </Box>
            </Box>

            
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#fff",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#36B864",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <LocationOnIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">Address</Typography>
                <Typography color="text.secondary">
                  7510, Brand Tower, New York, USA
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "13px",
                textTransform: "uppercase",
                color: "#777",
                mb: 1,
                mt:6
              }}
            >
              Contact info
            </Typography>

            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Keep In Touch
            </Typography>

            <Typography
              sx={{ color: "#666", mb: 3, fontSize: "15px" }}
            >
              We prioritize responding to your inquiries promptly to ensure
              you receive the assistance you need in a timely manner.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField placeholder="Name" fullWidth />
              <TextField placeholder="Email" fullWidth />
              <TextField
                placeholder="Message"
                multiline
                rows={4}
                fullWidth
              />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#36B864",
                  alignSelf: "flex-start",
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#2e9e4f",
                  },
                }}
              >
                Sent Message
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Contact;
