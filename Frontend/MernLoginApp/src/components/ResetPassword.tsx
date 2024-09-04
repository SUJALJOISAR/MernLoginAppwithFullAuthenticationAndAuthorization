// src/components/ResetPassword.tsx

import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Box, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import Gatimg from '../assets/gateway.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { confirmPasswordReset, verifyPasswordResetCode, updatePassword } from 'firebase/auth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get('oobCode'); // The code from the reset link

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Optionally, verify the reset code on component mount
  React.useEffect(() => {
    if (!oobCode) {
      toast.error('Invalid or missing reset code.');
      navigate('/login');
    }
  }, [oobCode, navigate]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!oobCode) throw new Error('Invalid reset code.');

      // Optionally verify the reset code
      await verifyPasswordResetCode(auth, oobCode);

      // Confirm the password reset with the new password
      await confirmPasswordReset(auth, oobCode, newPassword);

      toast.success('Password has been reset successfully!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Failed to reset password. Please try again.');
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
              Reset Your Password
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
            onSubmit={handleResetPassword}
            autoComplete="off"
            className="mt-4"
          >
            <TextField 
              label="Enter New Password" 
              type={showPassword ? "text" : "password"} 
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
              }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
            </Button>

            <Typography variant="body2" className='text-center'>
              <Link href="/login" color="primary" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Back to Login
              </Link>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
