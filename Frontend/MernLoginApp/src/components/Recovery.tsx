// src/components/Recovery.tsx

import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Box, CircularProgress } from '@mui/material';
import Gatimg from '../assets/gateway.jpg';
import { toast } from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Recovery = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecovery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent successfully!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
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
              Recover Your Account
            </Typography>
          </div>

          <Box 
            component="form" 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.0,
              padding: 2,
              maxWidth: 300,
              margin: 'auto',
              boxShadow: 1,
              borderRadius: 2,
            }}
            onSubmit={handleRecovery}
            autoComplete="off"
            className="mt-4"
          >
            <TextField 
              label="Email" 
              type="email" 
              variant="outlined" 
              margin="normal" 
              fullWidth 
              InputProps={{ sx: { height: 45 } }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, mb: 2, height: 45 }} 
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
            </Button>

            <Typography variant="body2" className='text-center'>
              Can't get a reset link?{' '}
              <Link href="/recovery" color="primary" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Resend
              </Link>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
