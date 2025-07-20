import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, IconButton, Box, TextField, Divider, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../components/CartContext';

function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">Your Cart</Typography>
      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>Your cart is empty.</Typography>
          <Button variant="contained" color="primary" href="/shop">Go to Shop</Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {items.map(({ product, quantity }) => (
              <Grid item xs={12} md={6} key={product.id}>
                <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{ width: 100, height: 100, objectFit: 'cover', mr: 2, borderRadius: 2 }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">{product.name}</Typography>
                      <IconButton color="error" onClick={() => removeFromCart(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">Unit Price: ${product.price.toFixed(2)}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TextField
                        type="number"
                        size="small"
                        label="Qty"
                        value={quantity}
                        inputProps={{ min: 1, style: { width: 50 } }}
                        onChange={e => updateQuantity(product.id, Math.max(1, Number(e.target.value)))}
                        sx={{ mr: 2 }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Subtotal: ${(product.price * quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ mt: 2, textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" size="large">Checkout</Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart; 