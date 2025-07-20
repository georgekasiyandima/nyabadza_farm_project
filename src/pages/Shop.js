import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';

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

function Shop() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">Our Products</Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: 6,
              },
            }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    height: 200,
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>{product.description}</Typography>
                  <Button variant="contained" color="primary" fullWidth>Add to Cart</Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Shop; 