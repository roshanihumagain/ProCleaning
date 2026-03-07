import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import Layout from "../Components/Layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#eee9df",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box className="a"
          sx={{
            backgroundColor: "#e0e0e0",
            width: "100%",
            maxWidth: 900,
            p: { xs: 2, md: 5 },
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "#2ecc71",
              fontWeight: "bold",
              fontSize: "22px",
              mb: 1,
            }}
          >
            Terms of Agreement
          </Typography>

          <Box
            sx={{
              width: "220px",
              height: "1px",
              backgroundColor: "#000",
              mx: "auto",
              mb: 3,
            }}
          />

          
          <Typography sx={{ fontSize: "15px", mb: 1 }}>
            1. These Website Standard Terms and Conditions written on this webpage
            shall manage your use of our website, Website Name accessible at
            Website URL.
          </Typography>

          <Typography sx={{ fontSize: "15px", mb: 1 }}>
            2. By using our Website, you accepted these terms and conditions in
            full. If you disagree with these terms and conditions or any part of
            these terms and conditions, you must not use our Website.
          </Typography>

          <Typography sx={{ fontSize: "15px", mb: 1 }}>
            3. Intellectual Property Rights Unless otherwise stated, we or our
            licensors own the intellectual property rights in the website and
            material on the website. Subject to the license below, all these
            intellectual property rights are reserved.
          </Typography>

          <Typography sx={{ fontSize: "15px", mb: 3 }}>
            4. License to use website You may view, download for caching purposes
            only, and print pages from the website for your own personal use,
            subject to the restrictions set out below and elsewhere in these
            terms and conditions
          </Typography>

        
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Checkbox />
            <Typography>Yes, I agree</Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Terms;
