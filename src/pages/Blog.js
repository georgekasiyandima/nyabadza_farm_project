import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useNavigate } from 'react-router-dom';
import BackToTop from '../components/BackToTop';

function Blog() {
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 8, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mb: 2, fontWeight: 600, textTransform: 'none', fontSize: 16 }}
      >
        ← Back to Home
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <AgricultureIcon color="primary" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Coming Soon
        </Typography>
        <Typography color="text.secondary">
          This page is under construction. Check back soon for updates from Village12Farm!
        </Typography>
      </Box>
      <BackToTop />
    </Container>
  );
}

export default Blog; 