import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Card, CardMedia, CardContent, Button, Box, Stack, Snackbar, Alert, Grid, TextField, Rating, Avatar
} from '@mui/material';
import { useCart } from '../components/CartContext';

// Enhanced product data with gallery, category, stock, location, and reviews
const products = [
  {
    id: 1,
    name: "Free-Range Chicken",
    price: 5,
    image: "/chickens.jpg",
    gallery: ["/chickens.jpg", "/feggs.jpg", "/potatoes.jpg"],
    description: "Fresh, organic broiler chickens.",
    category: "Livestock",
    stock: 8,
    location: "Plot 12, Nyabadza Farm",
    reviews: [
      { user: "Alice", rating: 5, comment: "Best chicken I've ever had!" },
      { user: "Bob", rating: 4, comment: "Very fresh and tasty." },
    ],
  },
  {
    id: 2,
    name: "Farm-Fresh Eggs",
    price: 3,
    image: "/feggs.jpg",
    gallery: ["/feggs.jpg", "/chickens.jpg"],
    description: "Dozen free-range eggs.",
    category: "Poultry",
    stock: 12,
    location: "Plot 12, Nyabadza Farm",
    reviews: [
      { user: "Carol", rating: 5, comment: "Eggs are always fresh!" },
    ],
  },
  {
    id: 3,
    name: "Organic Tomatoes",
    price: 0.8,
    image: "/tomato.jpg",
    gallery: ["/tomato.jpg", "/lettuce.jpg", "/cucumber.jpg"],
    description: "Juicy, greenhouse-grown tomatoes.",
    category: "Vegetables",
    stock: 20,
    location: "Greenhouse 2, Nyabadza Farm",
    reviews: [
      { user: "Danai", rating: 4, comment: "Great for salads!" },
    ],
  },
  // ...add similar enhancements for other products
  { id: 4, name: "Fresh Green Chillies", price: 1.5, image: "/chillies.jpg", gallery: ["/chillies.jpg"], description: "Spicy, fresh green chillies.", category: "Vegetables", stock: 10, location: "Field 1", reviews: [] },
  { id: 5, name: "Fresh Apples", price: 2.5, image: "/apples.jpg", gallery: ["/apples.jpg"], description: "Crisp, sweet apples picked fresh.", category: "Fruit", stock: 15, location: "Orchard", reviews: [] },
  { id: 6, name: "Green Pepper", price: 1.2, image: "/pepper.jpg", gallery: ["/pepper.jpg"], description: "Crunchy, organic green peppers.", category: "Vegetables", stock: 9, location: "Field 2", reviews: [] },
  { id: 7, name: "Fresh Cucumbers", price: 1.0, image: "/cucumber.jpg", gallery: ["/cucumber.jpg"], description: "Cool, refreshing cucumbers.", category: "Vegetables", stock: 7, location: "Greenhouse 1", reviews: [] },
  { id: 8, name: "Lettuce", price: 1.3, image: "/lettuce.jpg", gallery: ["/lettuce.jpg"], description: "Leafy, fresh lettuce heads.", category: "Vegetables", stock: 11, location: "Greenhouse 1", reviews: [] },
  { id: 9, name: "Potatoes", price: 2.0, image: "/potatoes.jpg", gallery: ["/potatoes.jpg"], description: "Farm-grown, hearty potatoes.", category: "Vegetables", stock: 18, location: "Field 3", reviews: [] },
  { id: 10, name: "Green Mealies", price: 1.8, image: "/mealies.jpg", gallery: ["/mealies.jpg"], description: "Sweet, tender green mealies.", category: "Vegetables", stock: 13, location: "Field 4", reviews: [] },
  { id: 11, name: "Watermelon", price: 3.5, image: "/melons.jpg", gallery: ["/melons.jpg"], description: "Juicy, sweet watermelon.", category: "Fruit", stock: 6, location: "Field 5", reviews: [] },
];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const product = products.find(p => p.id === Number(id));
  const inCart = items.find(i => i.product.id === product?.id)?.quantity || 0;

  // Gallery state
  const [mainImg, setMainImg] = useState(product?.gallery?.[0] || product?.image);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // Review form state
  const [review, setReview] = useState({ user: '', rating: 0, comment: '' });
  const [reviewError, setReviewError] = useState('');
  const [localReviews, setLocalReviews] = useState(product?.reviews || []);

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" color="error">Product not found.</Typography>
        <Button variant="contained" onClick={() => navigate('/shop')}>Back to Shop</Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, value) => {
    setReview({ ...review, rating: value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!review.user || !review.comment || review.rating === 0) {
      setReviewError('Please fill in all fields and provide a rating.');
      return;
    }
    setLocalReviews([{ ...review }, ...localReviews]);
    setReview({ user: '', rating: 0, comment: '' });
    setReviewError('');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Card sx={{ maxWidth: 700, mx: 'auto', boxShadow: 4, p: 2 }}>
        {/* Image Gallery */}
        <Box sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            image={mainImg}
            alt={product.name}
            sx={{ aspectRatio: '4/3', objectFit: 'cover', height: 320, borderRadius: 2, mb: 1, transition: '0.3s' }}
          />
          <Stack direction="row" spacing={1} justifyContent="center">
            {product.gallery.map((img, idx) => (
              <Box
                key={img}
                onClick={() => setMainImg(img)}
                sx={{
                  border: mainImg === img ? '2px solid #1976d2' : '2px solid transparent',
                  borderRadius: 1,
                  cursor: 'pointer',
                  p: 0.5,
                  transition: 'border 0.2s',
                }}
              >
                <Avatar src={img} alt={product.name + ' ' + idx} variant="rounded" sx={{ width: 56, height: 42 }} />
              </Box>
            ))}
          </Stack>
        </Box>
        <CardContent>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h6" color="primary" gutterBottom>${product.price.toFixed(2)}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} sm={4}><Typography variant="body2"><b>Category:</b> {product.category}</Typography></Grid>
            <Grid item xs={6} sm={4}><Typography variant="body2"><b>Location:</b> {product.location}</Typography></Grid>
            <Grid item xs={6} sm={4}><Typography variant="body2"><b>Stock:</b> {product.stock > 0 ? product.stock : 'Out of stock'}</Typography></Grid>
          </Grid>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={inCart >= 10 || product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : inCart > 0 ? `Add More (${inCart} in Cart)` : 'Add to Cart'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/shop')}>Back to Shop</Button>
          </Stack>
          {/* Snackbar for Add to Cart */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {product.name} added to cart!
            </Alert>
          </Snackbar>
          {/* Reviews Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>Customer Reviews</Typography>
            {localReviews.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No reviews yet. Be the first to review!</Typography>
            ) : (
              <Stack spacing={2} sx={{ mb: 2 }}>
                {localReviews.map((r, idx) => (
                  <Box key={idx} sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar>{r.user[0]}</Avatar>
                      <Typography variant="subtitle2">{r.user}</Typography>
                      <Rating value={r.rating} readOnly size="small" sx={{ ml: 1 }} />
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 1 }}>{r.comment}</Typography>
                  </Box>
                ))}
              </Stack>
            )}
            {/* Review Form */}
            <Box component="form" onSubmit={handleReviewSubmit} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Leave a Review</Typography>
              <Stack spacing={2}>
                <TextField
                  label="Your Name"
                  name="user"
                  value={review.user}
                  onChange={handleReviewChange}
                  size="small"
                  required
                />
                <Rating
                  name="rating"
                  value={review.rating}
                  onChange={handleRatingChange}
                  size="large"
                  required
                />
                <TextField
                  label="Your Review"
                  name="comment"
                  value={review.comment}
                  onChange={handleReviewChange}
                  size="small"
                  multiline
                  minRows={2}
                  required
                />
                {reviewError && <Alert severity="error">{reviewError}</Alert>}
                <Button type="submit" variant="contained" color="primary">Submit Review</Button>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetails; 