import React, { useState } from "react";
import { Box, Typography, Avatar, Button, TextField, Paper } from "@mui/material";
import Layout from "../Components/Layout/Layout"; 
import profilePic from "../images/profile.jpeg";
import "../styles/profile.css"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+977 9812345678",
    address: "Kathmandu, Nepal"
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };


  const handleCancel = () => {
    setIsEditing(false);
  };

  
  const handleUpdate = () => {
    console.log("Updated Profile:", profile);
    setIsEditing(false);
  };

  return (
    <Layout>
      <Box className= "a" sx={{ minHeight: "80vh", display: "flex", mt:10,justifyContent: "center", alignItems: "center", p: 4 }}>
        <Paper sx={{ p: 4, maxWidth: 600, width: "100%", borderRadius: 3, boxShadow: 3 }}>
          
     
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt:1, mb: 4 }}>
            <Avatar 
              src={profilePic} 
              alt="Profile" 
              sx={{ width: 100, height: 100, mb: 2 }} 
            />
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>{profile.name}</Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#4D4D4D" }}>{profile.email}</Typography>
          </Box>

         
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isEditing ? (
              <>
                <TextField 
                  label="Full Name" 
                  name="name"
                  value={profile.name} 
                  onChange={handleChange} 
                  variant="outlined" 
                  fullWidth 
                />
                <TextField 
                  label="Email" 
                  name="email"
                  value={profile.email} 
                  onChange={handleChange} 
                  variant="outlined" 
                  fullWidth 
                />
                <TextField 
                  label="Phone Number" 
                  name="phone"
                  value={profile.phone} 
                  onChange={handleChange} 
                  variant="outlined" 
                  fullWidth 
                />
                <TextField 
                  label="Address" 
                  name="address"
                  value={profile.address} 
                  onChange={handleChange} 
                  variant="outlined" 
                  fullWidth 
                />

            
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button 
                    sx={{
                      backgroundColor: "#979797",
                      color: "white",
                      textTransform: "none",
                      '&:hover': { backgroundColor: "#7a7a7a" }
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>

                  <Button 
                    sx={{
                      backgroundColor: "#36B864",
                      color: "white",
                      textTransform: "none",
                      '&:hover': { backgroundColor: "#2FA14B" }
                    }}
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography><strong>Full Name:</strong> {profile.name}</Typography>
                <Typography><strong>Email:</strong> {profile.email}</Typography>
                <Typography><strong>Phone Number:</strong> {profile.phone}</Typography>
                <Typography><strong>Address:</strong> {profile.address}</Typography>

                {/* Edit Profile Button */}
                <Button 
                  sx={{
                    backgroundColor: "#36B864",
                    color: "white",
                    textTransform: "none",
                    mt: 2,
                    '&:hover': { backgroundColor: "#2FA14B" }
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Profile;
