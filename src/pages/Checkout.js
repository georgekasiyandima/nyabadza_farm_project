import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { items } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock checkout flow
    console.log('Order submitted:', formData, items);
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/confirmation');
    }, 1200);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 700 }}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Details */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <LocalShippingIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Shipping Information
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>

          {/* Payment Details */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <CreditCardIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Payment Information
              </Typography>
            </Stack>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Expiry Date"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="MM/YY"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="123"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, position: { md: 'sticky' }, top: { md: 80 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {items.map(({ product, quantity }) => (
              <Stack
                key={product.id}
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography>{product.name} x {quantity}</Typography>
                <Typography>${(product.price * quantity).toFixed(2)}</Typography>
              </Stack>
            ))}

            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
          ✅ Order placed successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Checkout;
