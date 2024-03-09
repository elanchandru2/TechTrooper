import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async () => {
    try {
      // Implement signup logic here
      console.log('Signup:', formData);
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred during signup');
    }
  };

  return (
    <Container maxWidth="sm" className="vh-100 d-flex justify-content-center align-items-center">
      <Box sx={{  color: 'black', p: 4, borderRadius: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Signup</Typography>
        <TextField
          label="First Name"
          type="text"
          variant="outlined"
          fullWidth
          className="mb-3"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          type="text"
          variant="outlined"
          fullWidth
          className="mb-3"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          className="mb-3"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone"
          type="text"
          variant="outlined"
          fullWidth
          className="mb-3"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          label="Birth Date"
          type="date"
          variant="outlined"
          fullWidth
          className="mb-3"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
        <TextField
          label="Username"
          type="text"
          variant="outlined"
          fullWidth
          className="mb-3"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          className="mb-3"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
  type="submit"
  color="primary"
  variant="outlined"
  style={{ borderColor: "#9C27B0", color: "#9C27B0", backgroundColor: "black" }}
  fullWidth
  sx={{ '&:hover': { bgcolor: '#9C27B0', borderColor: "#9C27B0", color: "black" } }}
>
  Signup
</Button>
        {error && <Typography variant="body2" color="error" mt={3}>{error}</Typography>}
        <Typography variant="body2" mt={3}>Already have an account? <Link to="/login" sx={{ color: "#9C27B0" }}>Login</Link>
</Typography>
      </Box>
    </Container>
  );
};

export default Signup;
