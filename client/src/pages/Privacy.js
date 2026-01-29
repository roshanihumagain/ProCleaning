import React from "react";
import { Box, Typography} from "@mui/material";
import Layout from "../components/layout/Layout";

const Privacy = () => {
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
          mt:8
        }}
      >
       
        <Box className="a"
          sx={{
            backgroundColor: "#e0e0e0",
            width: "100%",
            maxWidth: 900,
            p: { xs: 2, md: 5 },
            borderRadius: 1,
            mt:4,
            mb:4
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
           Privacy Policy
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

          
          <Typography sx={{ fontSize: "15px", lineHeight: 1.8, mb: 4 }}>
          At ProCleaning, we take your privacy seriously and are committed to protecting any personal information you provide when using our website or services. We may collect information such as your name, email address, phone number, service preferences, and any other details necessary to respond to your inquiries, schedule appointments, and provide high-quality cleaning services. This information is used solely for business purposes and to enhance your experience with us.We do not sell, rent, or trade your personal information to third parties, except as required by law or to trusted service providers who assist us in operating our website or delivering services, and who are obligated to keep your information confidential. We implement reasonable security measures to protect your data against unauthorized access, alteration, disclosure, or destruction.Our website may also use cookies and similar technologies to improve user experience, analyze website traffic, and understand how visitors interact with our services. You can manage your cookie preferences through your browser settings.By using our website and services, you consent to the collection, use, and storage of your personal information as outlined in this Privacy Policy. We may update this policy periodically to reflect changes in our practices or legal requirements, and we encourage you to review this page regularly to stay informed about how we safeguard your information.
          </Typography>

         
        </Box>
      </Box>
    </Layout>
  );
};

export default Privacy;
