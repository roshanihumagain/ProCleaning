import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Typography ,Box} from '@mui/material'

const Profile = () => {
  return (
    <Layout>
   <Box>
    <Typography variant='h1' sx={{mt:10,mb:10,textAlign:'center'}}>
      Profile 
    </Typography>
   </Box>

    </Layout>
  )
}

export default Profile
