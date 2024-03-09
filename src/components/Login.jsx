import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, styled } from '@mui/material';

const WhiteTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white',
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Fetch user data from the API
      const response = await fetch('https://dummyjson.com/users/');
      const userData = await response.json();

      // Check if the entered username and password match any user
      const user = userData.find(user => user.username === username && user.password === password);
      if (user) {
        // Successful login, navigate to dashboard or home page
        console.log('Logged in successfully:', user);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <Container maxWidth="sm" className="vh-100 d-flex justify-content-center align-items-center">
      <Box sx={{  color: 'black', p: 4, borderRadius: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin} className="text-center">
          <WhiteTextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 3 }}
          />
          <WhiteTextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
<Button
  type="submit"
  color="primary"
  variant="outlined"
  style={{ borderColor: "#9C27B0", color: "#9C27B0", backgroundColor: "black" }}
  fullWidth
  sx={{ '&:hover': { bgcolor: '#9C27B0', borderColor: "#9C27B0", color: "black" } }}
>
  Login
</Button>
          {error && <Typography variant="body2" color="error" mt={3}>{error}</Typography>}
        </form>
        <Typography variant="body2" mt={3}>Don't have an account? <Link to="/signup" >Signup</Link></Typography>
      </Box>
    </Container>
  );
};

export default Login;
