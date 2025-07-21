import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Card, CardMedia, CardContent, Button, Box, Stack, Snackbar, Alert, Grid, TextField, Rating, Avatar, Chip, Breadcrumbs, Link, Divider, Paper, IconButton, Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';

// Enhanced product data with gallery, category, stock, location, and reviews
const products = [
  {
    id: 1,
    name: "Free-Range Chicken",
    price: 5,
    image: "/chickens.jpg",
    gallery: ["/chickens.jpg", "/chicken1.jpg", "/chickn3.jpg"],
    description: "Fresh, organic broiler chickens.",
    category: "Livestock",
    stock: 8,
    location: "Plot 12, Nyabadza Farm",
    tags: ["Organic", "Free-Range", "Fresh"],
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
    gallery: ["/feggs.jpg", "/eggs1.webp", "/eggs2.webp"],
    description: "Dozen free-range eggs.",
    category: "Poultry",
    stock: 12,
    location: "Plot 12, Nyabadza Farm",
    tags: ["Organic", "Free-Range", "Fresh"],
    reviews: [
      { user: "Carol", rating: 5, comment: "Eggs are always fresh!" },
    ],
  },
  {
    id: 3,
    name: "Organic Tomatoes",
    price: 0.8,
    image: "/tomato.jpg",
    gallery: ["/tomato.jpg", "/tomato1.jpg", "/tomato2.jpg"],
    description: "Juicy, greenhouse-grown tomatoes.",
    category: "Vegetables",
    stock: 20,
    location: "Greenhouse 2, Nyabadza Farm",
    tags: ["Organic", "Greenhouse", "Fresh"],
    reviews: [
      { user: "Danai", rating: 4, comment: "Great for salads!" },
    ],
  },
  // ... to add similar enhancements for other products
  { id: 4, name: "Fresh Green Chillies", price: 1.5, image: "/chillies.jpg", gallery: ["/chillies.jpg"], description: "Spicy, fresh green chillies.", category: "Vegetables", stock: 10, location: "Field 1", tags: ["Organic", "Spicy"], reviews: [] },
  { id: 5, name: "Fresh Apples", price: 2.5, image: "/apples.jpg", gallery: ["/apples.jpg"], description: "Crisp, sweet apples picked fresh.", category: "Fruit", stock: 15, location: "Orchard", tags: ["Organic", "Sweet"], reviews: [] },
  { id: 6, name: "Green Pepper", price: 1.2, image: "/pepper.jpg", gallery: ["/pepper.jpg"], description: "Crunchy, organic green peppers.", category: "Vegetables", stock: 9, location: "Field 2", tags: ["Organic", "Crunchy"], reviews: [] },
  { id: 7, name: "Fresh Cucumbers", price: 1.0, image: "/cucumber.jpg", gallery: ["/cucumber.jpg"], description: "Cool, refreshing cucumbers.", category: "Vegetables", stock: 7, location: "Greenhouse 1", tags: ["Organic", "Refreshing"], reviews: [] },
  { id: 8, name: "Lettuce", price: 1.3, image: "/lettuce.jpg", gallery: ["/lettuce.jpg"], description: "Leafy, fresh lettuce heads.", category: "Vegetables", stock: 11, location: "Greenhouse 1", tags: ["Organic", "Leafy"], reviews: [] },
  { id: 9, name: "Potatoes", price: 2.0, image: "/potatoes.jpg", gallery: ["/potatoes.jpg"], description: "Farm-grown, hearty potatoes.", category: "Vegetables", stock: 18, location: "Field 3", tags: ["Organic", "Hearty"], reviews: [] },
  { id: 10, name: "Green Mealies", price: 1.8, image: "/mealies.jpg", gallery: ["/mealies.jpg"], description: "Sweet, tender green mealies.", category: "Vegetables", stock: 13, location: "Field 4", tags: ["Organic", "Sweet"], reviews: [] },
  { id: 11, name: "Watermelon", price: 3.5, image: "/melons.jpg", gallery: ["/melons.jpg"], description: "Juicy, sweet watermelon.", category: "Fruit", stock: 6, location: "Field 5", tags: ["Organic", "Juicy"], reviews: [] },
];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlist();
  const product = products.find(p => p.id === Number(id));
  const inCart = items.find(i => i.product.id === product?.id)?.quantity || 0;
  const inWishlist = wishlistItems.find(i => i.product.id === product?.id);

  // Gallery state
  const [mainImg, setMainImg] = useState(product?.gallery?.[0] || product?.image);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
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
    setSnackbarMsg(`${product.name} added to cart!`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleWishlistToggle = () => {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from Nyabadza Farm!`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setSnackbarMsg('Link copied to clipboard!');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
    }
  };

  const handleCompare = () => {
    // For now, just show a message. In a real app, you'd add to comparison list
    setSnackbarMsg('Product comparison feature coming soon!');
    setSnackbarSeverity('info');
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

  // Get related products (same category, excluding current product)
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <Container sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link color="inherit" href="/home" underline="hover">Home</Link>
        <Link color="inherit" href="/shop" underline="hover">Shop</Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Main Product Info */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 4, p: 2 }}>
            {/* Image Gallery */}
            <Box sx={{ mb: 3 }}>
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
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {product.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                ))}
              </Stack>
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
              {/* Action Buttons */}
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Tooltip title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
                  <IconButton
                    color={inWishlist ? "error" : "default"}
                    onClick={handleWishlistToggle}
                  >
                    {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share Product">
                  <IconButton onClick={handleShare}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Compare Product">
                  <IconButton onClick={handleCompare}>
                    <CompareArrowsIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              {/* Snackbar for Add to Cart */}
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
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Product Summary */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Product Summary</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>{product.description}</Typography>
              <Typography variant="h5" color="primary" gutterBottom>${product.price.toFixed(2)}</Typography>
              <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Typography>
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Stack spacing={1}>
                <Button variant="outlined" fullWidth onClick={() => navigate('/cart')}>View Cart</Button>
                <Button variant="outlined" fullWidth onClick={() => navigate('/wishlist')}>View Wishlist</Button>
                <Button variant="outlined" fullWidth onClick={() => navigate('/shop')}>Continue Shopping</Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Customer Reviews</Typography>
        {localReviews.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">No reviews yet. Be the first to review!</Typography>
          </Paper>
        ) : (
          <Stack spacing={2} sx={{ mb: 3 }}>
            {localReviews.map((r, idx) => (
              <Paper key={idx} sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar>{r.user[0]}</Avatar>
                  <Typography variant="subtitle2">{r.user}</Typography>
                  <Rating value={r.rating} readOnly size="small" sx={{ ml: 1 }} />
                </Stack>
                <Typography variant="body2" sx={{ mt: 1 }}>{r.comment}</Typography>
              </Paper>
            ))}
          </Stack>
        )}
        {/* Review Form */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Leave a Review</Typography>
          <Box component="form" onSubmit={handleReviewSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Your Name"
                name="user"
                value={review.user}
                onChange={handleReviewChange}
                size="small"
                required
              />
              <Box>
                <Typography variant="body2" gutterBottom>Rating</Typography>
                <Rating
                  name="rating"
                  value={review.rating}
                  onChange={handleRatingChange}
                  size="large"
                  required
                />
              </Box>
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
        </Paper>
      </Box>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Related Products</Typography>
          <Grid container spacing={2}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
                <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${relatedProduct.id}`)}>
                  <CardMedia
                    component="img"
                    image={relatedProduct.image}
                    alt={relatedProduct.name}
                    sx={{ height: 140, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{relatedProduct.name}</Typography>
                    <Typography variant="body2" color="text.secondary">${relatedProduct.price.toFixed(2)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ProductDetails; 