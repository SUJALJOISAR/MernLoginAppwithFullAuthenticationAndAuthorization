import React,{useState} from 'react';
// import { Link } from 'react-router-dom'
import { TextField, Button, Typography, Link, Box, InputAdornment, IconButton } from '@mui/material';
import Avaimg from '../assets/profile.png';
import Gatimg from '../assets/gateway.jpg';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material'; // Importing Google icon
// import {auth} from '../firebase/firebase';
// import { GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext';

// Validation Function
const validateInput = (username: string, email: string, password: string) => {
  if (!username) {
    return "Username cannot be empty";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    return "Invalid email format";
  }
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.match(passwordPattern)) {
    return "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one digit, and one special character";
  }
  return null;
};

const Register = () => {
const navigate=useNavigate();
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
const {manualRegister}=UseAuth();

const handleRegister = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
 // Validate Input
 const error = validateInput(username, email, password);
 if (error) {
   toast.error(error);
   return;
 }

 
 try {
   await manualRegister(username,email,password)
   console.log("User Registered Successfully");
   toast.success("User Registered Successfully");
   navigate("/");
 } catch (error) {
   console.log((error as Error).message);
   toast.error((error as Error).message);
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
                maxWidth: '250px', // Reduced width for smaller container
                maxHeight: '150px', // Reduced height for smaller container
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
            // noValidate
            onSubmit={handleRegister} // Handle form submission
            autoComplete="off"
            className="mt-4"
          >
            <TextField 
              label="Username" 
              variant="outlined" 
              margin="normal" 
              fullWidth 
              InputProps={{ sx: { height: 45 } }} // Medium height input boxes
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
            />
            
            <TextField 
              label="Email" 
              type="email" 
              variant="outlined" 
              margin="normal" 
              fullWidth 
              InputProps={{ sx: { height: 45 } }} // Medium height input boxes
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update username state
            />
            
            <TextField 
              label="Password" 
              type={showPassword ? "text" : "password"} // Toggle input type based on state
              variant="outlined" 
              margin="normal" 
              fullWidth 
              InputProps={{ sx: { height: 45 }, 
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }} // Medium height input boxes
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update username state
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, mb: 2, height: 45 }} // Matching button height
              fullWidth
            >
              Register
            </Button>

            {/* <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mb: 2, height: 45 }} 
              fullWidth
              startIcon={<GoogleIcon />} // Adding Google icon to the button
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button> */}

            <Typography variant="body2" className='text-center'>
              Already a Member?{' '}
              <Link href="/login" color="error" sx={{
                  borderBottom: '2px solid',
                  borderColor: 'error.main',
                  cursor: 'pointer'
                }}>
                Login
              </Link>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Register;
