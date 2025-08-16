import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();

  // In a real app, this would come from backend response
  const orderId = Math.floor(Math.random() * 1000000);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          🎉 Order Confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Thank you for your purchase. Your order has been placed successfully.
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6">Order ID: #{orderId}</Typography>
          <Typography variant="body2" color="text.secondary">
            A confirmation email will be sent to you shortly.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/shop")}
          sx={{ mr: 2 }}
        >
          Continue Shopping
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/orders")}
        >
          View Orders
        </Button>
      </Paper>
    </Container>
  );
}

export default Confirmation;
