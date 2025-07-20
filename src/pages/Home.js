import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>Welcome to Nyabadza Farm</Typography>
      <Typography variant="body1" gutterBottom>
        Your source for fresh, organic produce and livestock from the heart of Zimbabwe.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/shop">Shop Now</Button>
    </Container>
  );
}

export default Home; 