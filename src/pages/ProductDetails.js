import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Button, Box, Stack } from '@mui/material';
import { useCart } from '../components/CartContext';

const products = [
  { id: 1, name: "Free-Range Chicken", price: 5, image: "/chickens.jpg", description: "Fresh, organic broiler chickens." },
  { id: 2, name: "Farm-Fresh Eggs", price: 3, image: "/feggs.jpg", description: "Dozen free-range eggs." },
  { id: 3, name: "Organic Tomatoes", price: 0.8, image: "/tomato.jpg", description: "Juicy, greenhouse-grown tomatoes." },
  { id: 4, name: "Fresh Green Chillies", price: 1.5, image: "/chillies.jpg", description: "Spicy, fresh green chillies." },
  { id: 5, name: "Fresh Apples", price: 2.5, image: "/apples.jpg", description: "Crisp, sweet apples picked fresh." },
  { id: 6, name: "Green Pepper", price: 1.2, image: "/pepper.jpg", description: "Crunchy, organic green peppers." },
  { id: 7, name: "Fresh Cucumbers", price: 1.0, image: "/cucumber.jpg", description: "Cool, refreshing cucumbers." },
  { id: 8, name: "Lettuce", price: 1.3, image: "/lettuce.jpg", description: "Leafy, fresh lettuce heads." },
  { id: 9, name: "Potatoes", price: 2.0, image: "/potatoes.jpg", description: "Farm-grown, hearty potatoes." },
  { id: 10, name: "Green Mealies", price: 1.8, image: "/mealies.jpg", description: "Sweet, tender green mealies." },
  { id: 11, name: "Watermelon", price: 3.5, image: "/melons.jpg", description: "Juicy, sweet watermelon." },
];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const product = products.find(p => p.id === Number(id));
  const inCart = items.find(i => i.product.id === product?.id)?.quantity || 0;

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" color="error">Product not found.</Typography>
        <Button variant="contained" onClick={() => navigate('/shop')}>Back to Shop</Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card sx={{ maxWidth: 600, mx: 'auto', boxShadow: 4 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ aspectRatio: '4/3', objectFit: 'cover', height: 320 }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h6" color="primary" gutterBottom>${product.price.toFixed(2)}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" onClick={() => addToCart(product)} disabled={inCart >= 10}>
              {inCart > 0 ? `Add More (${inCart} in Cart)` : 'Add to Cart'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/shop')}>Back to Shop</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetails; 