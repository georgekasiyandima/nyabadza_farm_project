import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box, Stack, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useCompare } from '../components/CompareContext';

function Compare() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Product Comparison</Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<ClearAllIcon />}
          onClick={clearCompare}
          disabled={items.length === 0}
        >
          Clear All
        </Button>
      </Stack>
      {items.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">No products selected for comparison.</Typography>
      ) : (
        <Grid container spacing={3}>
          {items.map(({ product }) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 200, objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{product.name}</Typography>
                    <IconButton color="error" onClick={() => removeFromCompare(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary">Price: ${product.price.toFixed(2)}</Typography>
                  <Typography variant="body2">Category: {product.category}</Typography>
                  <Typography variant="body2">Stock: {product.stock}</Typography>
                  <Typography variant="body2">Location: {product.location}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{product.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Compare; 