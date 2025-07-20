import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, IconButton, Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../components/CartContext';

function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">Your Cart</Typography>
      {items.length === 0 ? (
        <Typography variant="body1" align="center">Your cart is empty.</Typography>
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
                    sx={{ width: 100, height: 100, objectFit: 'cover', mr: 2 }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">${product.price.toFixed(2)}</Typography>
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
                      <IconButton color="error" onClick={() => removeFromCart(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Checkout</Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart; 