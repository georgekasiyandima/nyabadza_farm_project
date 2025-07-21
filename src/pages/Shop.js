import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Snackbar, Alert, Stack, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';
import { useCompare } from '../components/CompareContext';

const products = [
  { id: 1, name: "Free-Range Chicken", price: 6, image: "/chickens.jpg", description: "Fresh, organic broiler chickens." },
  { id: 2, name: "Farm-Fresh Eggs", price: 3, image: "/feggs.jpg", description: "Dozen free-range eggs." },
  { id: 3, name: "Organic Tomatoes", price: 0.8, image: "/tomato.jpg", description: "Juicy, greenhouse-grown tomatoes." },
  { id: 4, name: "Fresh Green Chillies", price: 1.5, image: "/chillies.jpg", description: "Spicy, fresh green chillies." },
  { id: 5, name: "Fresh Apples", price: 2.5, image: "/apples.jpg", description: "Crisp, sweet apples picked fresh." },
  { id: 6, name: "Green Pepper", price: 1.2, image: "/pepper.jpg", description: "Crunchy, organic green peppers." },
  { id: 7, name: "Fresh Cucumbers", price: 1.0, image: "/cucumber.jpg", description: "Cool, refreshing cucumbers." },
  { id: 8, name: "Lettuce", price: 1.3, image: "/lettuce.jpg", description: "Leafy, fresh lettuce heads." },
  { id: 9, name: "Potatoes", price: 2.0, image: "/potatoes.jpg", description: "Farm-grown, hearty potatoes." },
  { id: 10, name: "Green Mealies", price: 0.50, image: "/mealies.jpg", description: "Sweet, tender green mealies." },
  { id: 11, name: "Watermelon", price: 3.5, image: "/melons.jpg", description: "Juicy, sweet watermelon." },
];

function Shop() {
  const { addToCart, items } = useCart();
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlist();
  const { addToCompare, removeFromCompare, items: compareItems } = useCompare();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarMsg(`${product.name} added to cart!`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleWishlistToggle = (product) => {
    const inWishlist = wishlistItems.find(i => i.product.id === product.id);
    if (inWishlist) {
      removeFromWishlist(product.id);
      setSnackbarMsg(`${product.name} removed from wishlist`);
      setSnackbarSeverity('info');
    } else {
      addToWishlist(product);
      setSnackbarMsg(`${product.name} added to wishlist!`);
      setSnackbarSeverity('success');
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const getQuantity = (productId) => {
    const item = items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const isInWishlist = (productId) => {
    return wishlistItems.find(i => i.product.id === productId);
  };

  const isInCompare = (productId) => {
    return compareItems.find(i => i.product.id === productId);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">Our Products</Typography>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {products.map((product) => {
          const quantity = getQuantity(product.id);
          const inWishlist = isInWishlist(product.id);
          const inCompare = isInCompare(product.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.03)',
                  boxShadow: 6,
                },
              }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, position: 'relative' }}>
                  <Box component={Link} to={`/product/${product.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
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
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" gutterBottom component={Link} to={`/product/${product.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>{product.name}</Typography>
                      <Tooltip title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
                        <IconButton
                          color={inWishlist ? "error" : "default"}
                          onClick={() => handleWishlistToggle(product)}
                          size="small"
                        >
                          {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={inCompare ? "Remove from Comparison" : "Add to Comparison"}>
                        <IconButton
                          color={inCompare ? "primary" : "default"}
                          onClick={() => {
                            if (inCompare) {
                              removeFromCompare(product.id);
                              setSnackbarMsg(`${product.name} removed from comparison`);
                              setSnackbarSeverity('info');
                            } else if (compareItems.length < 3) {
                              addToCompare(product);
                              setSnackbarMsg(`${product.name} added to comparison!`);
                              setSnackbarSeverity('success');
                            } else {
                              setSnackbarMsg('You can only compare up to 3 products.');
                              setSnackbarSeverity('warning');
                            }
                            setSnackbarOpen(true);
                          }}
                          size="small"
                        >
                          <CompareArrowsIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Go to Compare Page">
                        <IconButton component={Link} to="/compare" size="small">
                          <CompareArrowsIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>{product.description}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                      disabled={quantity > 0 && quantity >= 10}
                    >
                      {quantity > 0 ? 'Add More' : 'Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Shop; 