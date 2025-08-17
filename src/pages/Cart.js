import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Box,
  Divider,
  Stack,
  Snackbar,
  Alert,
  Paper,
  TextField,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../components/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import BackToTop from '../components/BackToTop';

function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('standard');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Shipping rules
  const shippingOptions = {
    standard: subtotal > 50 ? 0 : 5.99, // free if over $50
    express: 14.99,
    overnight: 24.99,
  };

  const shipping = items.length > 0 ? shippingOptions[shippingMethod] : 0;
  const total = subtotal + shipping - appliedDiscount;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
    setSnackbarMsg('Cart updated!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleRemove = (product) => {
    removeFromCart(product.id);
    setSnackbarMsg(`${product.name} removed from cart`);
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedDiscount(10);
      setSnackbarMsg('Promo code applied: $10 off');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else if (promoCode.toLowerCase() === 'freeship') {
      setShippingMethod('standard');
      setSnackbarMsg('Promo code applied: Free Standard Shipping');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      setAppliedDiscount(0);
      setSnackbarMsg('Invalid promo code');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Back to Home Button */}
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mb: 2, fontWeight: 600, textTransform: 'none', fontSize: 16 }}
      >
        ← Back to Home
      </Button>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
        Your Cart
      </Typography>

      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is empty.
          </Typography>
          <Button
            component={Link}
            to="/shop"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, borderRadius: 2, px: 4 }}
          >
            Go to Shop
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {items.map(({ product, quantity }) => (
                <Grid item xs={12} key={product.id}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 3,
                      boxShadow: 2,
                      '&:hover': { boxShadow: 5 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mr: 2,
                      }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {product.name}
                        </Typography>
                        <IconButton color="error" onClick={() => handleRemove(product)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Unit Price: ${product.price.toFixed(2)}
                      </Typography>

                      {/* Quantity Controls */}
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          sx={{ border: '1px solid #ccc', borderRadius: 2 }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(product.id, quantity - 1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            sx={{ px: 2, minWidth: 30, textAlign: 'center', fontWeight: 500 }}
                          >
                            {quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(product.id, quantity + 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Stack>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Subtotal: ${(product.price * quantity).toFixed(2)}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                position: { md: 'sticky' },
                top: { md: 80 },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Stack>

                {/* Shipping Selector */}
                <TextField
                  select
                  label="Shipping Method"
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{ my: 1 }}
                >
                  <MenuItem value="standard">
                    Standard {subtotal > 50 ? '(Free)' : '($5.99)'}
                  </MenuItem>
                  <MenuItem value="express">Express ($14.99)</MenuItem>
                  <MenuItem value="overnight">Overnight ($24.99)</MenuItem>
                </TextField>

                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography>${shipping.toFixed(2)}</Typography>
                </Stack>

                {appliedDiscount > 0 && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="success.main">Discount</Typography>
                    <Typography color="success.main">- ${appliedDiscount.toFixed(2)}</Typography>
                  </Stack>
                )}

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ${total.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>

              {/* Promo Code */}
              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                <TextField
                  size="small"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  fullWidth
                />
                <Button variant="outlined" onClick={handleApplyPromo}>
                  Apply
                </Button>
              </Stack>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: 4,
                  '&:hover': { boxShadow: 6 },
                }}
                startIcon={<ShoppingCartCheckoutIcon />}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <BackToTop />
    </Container>
  );
}

export default Cart;
