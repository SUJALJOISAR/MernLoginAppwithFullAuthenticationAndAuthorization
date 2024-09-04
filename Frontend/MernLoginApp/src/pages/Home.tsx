import React from 'react';
import { Button, Typography, Box, Avatar } from '@mui/material';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import Gatimg from '../assets/gateway.jpg'; // Import the Gateway image

const Home = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-white p-6 shadow-lg rounded-lg' style={{ maxWidth: '350px' }}>

          <div className="title flex flex-col items-center">
            <img 
              src={Gatimg} 
              alt="Gateway"
              className="mb-4 rounded-md"
              style={{
                maxWidth: '250px', // Adjust width as needed
                maxHeight: '150px', // Adjust height as needed
                objectFit: 'cover',
                marginBottom: '0.01rem'
              }}
            />

            <Typography variant="h5" className="text-center text-gray-700">
              Welcome to Gateway Group!
            </Typography>

            <Typography variant="subtitle1" className="text-center text-gray-500">
              {user?.displayName || 'User'}
            </Typography>
          </div>

          <div className="flex justify-center py-3">
            <Avatar
              alt="Profile Image"
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
          </div>

          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.0, // Added gap between input fields
              padding: 2,
              maxWidth: 300,
              margin: 'auto',
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" className="text-center">
              {user?.email}
            </Typography>

            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, mb: 2, height: 45 }} // Matching button height
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Home;
