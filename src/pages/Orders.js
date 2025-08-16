import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

function Orders() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          My Orders
        </Typography>
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Your order history will appear here in the future.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Orders;
