import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const products = [
  { id: 1, name: "Free-Range Chicken", price: 5, image: "/chickens.jpg", description: "Fresh, organic broiler chickens." },
  { id: 2, name: "Farm-Fresh Eggs", price: 3, image: "/feggs.jpg", description: "Dozen free-range eggs." },
  { id: 3, name: "Organic Tomatoes", price: 0.8, image: "/tomato.jpg", description: "Juicy, greenhouse-grown tomatoes." },
];

function Shop() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Our Products</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Button variant="contained" color="primary">Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Shop; 