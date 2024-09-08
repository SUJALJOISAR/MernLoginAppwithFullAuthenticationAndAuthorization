// src/components/Login.tsx

import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Link, Box, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import Gatimg from '../assets/gateway.jpg';
import Avaimg from '../assets/profile.png';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material'; // Importing Google icon
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext'; // Importing AuthContext

const Login = () => {
  const navigate = useNavigate();
  const {currentUser}=UseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(currentUser){
      navigate("/");
    }
  },[currentUser]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      if (result.user) {
        toast.success("User logged in Successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Firebase Sign-In
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In Successfully");
      toast.success("User Logged In Successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                maxWidth: '250px',
                maxHeight: '150px',
                objectFit: 'cover',
                marginBottom: '0.01rem'
              }}
            />
            <Typography variant="subtitle1" className="text-center text-gray-500">
              Explore More by Connecting With Us!
            </Typography>
          </div>

          <div className="flex justify-center py-3">
            <img 
              src={Avaimg}
              alt="Profile" 
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
          </div>

          <Box 
            component="form" 
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
            onSubmit={handleLogin} // Handle form submission
            autoComplete="off"
            className="mt-4"
          >
            <TextField 
              label="Email" 
              type="email" 
              variant="outlined" 
              margin="normal" 
              fullWidth 
              InputProps={{ sx: { height: 45 } }} // Medium height input boxes
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
            
            <TextField 
              label="Password" 
              type={showPassword ? "text" : "password"} // Toggle input type based on state
              variant="outlined" 
              margin="normal" 
              fullWidth 
              InputProps={{ 
                sx: { height: 45 }, 
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }} // Medium height input boxes
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, mb: 2, height: 45 }} // Matching button height
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>

            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mb: 2, height: 45 }} 
              fullWidth
              startIcon={<GoogleIcon />} // Adding Google icon to the button
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Login with Google
            </Button>

            <Typography variant="body2" className='text-center'>
              <Link href="/recovery" color="primary" sx={{ cursor: 'pointer', textDecoration: 'underline', display: 'block', mb: 1 }}>
                Forgot Password?
              </Link>
              Not a Member?{' '}
              <Link href="/register" color="error" sx={{
                  borderBottom: '2px solid',
                  borderColor: 'error.main',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}>
                  Register
              </Link>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Login;
