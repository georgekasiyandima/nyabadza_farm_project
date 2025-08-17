import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Snackbar,
  Alert,
  Stack,
  IconButton,
  Tooltip,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';
import { useCompare } from '../components/CompareContext';
import BackToTop from '../components/BackToTop';

const products = [
  { id: 1, name: "Free-Range Chicken", price: 6, image: "/chickens.jpg", description: "Fresh, organic broiler chickens.", category: "Meat" },
  { id: 2, name: "Farm-Fresh Eggs", price: 3, image: "/feggs.jpg", description: "Dozen free-range eggs.", category: "Dairy" },
  { id: 3, name: "Organic Tomatoes", price: 0.8, image: "/tomato.jpg", description: "Juicy, greenhouse-grown tomatoes.", category: "Vegetables" },
  { id: 4, name: "Fresh Green Chillies", price: 1.5, image: "/chillies.jpg", description: "Spicy, fresh green chillies.", category: "Vegetables" },
  { id: 5, name: "Fresh Apples", price: 2.5, image: "/apples.jpg", description: "Crisp, sweet apples picked fresh.", category: "Fruits" },
  { id: 6, name: "Green Pepper", price: 1.2, image: "/pepper.jpg", description: "Crunchy, organic green peppers.", category: "Vegetables" },
  { id: 7, name: "Fresh Cucumbers", price: 1.0, image: "/cucumber.jpg", description: "Cool, refreshing cucumbers.", category: "Vegetables" },
  { id: 8, name: "Lettuce", price: 1.3, image: "/lettuce.jpg", description: "Leafy, fresh lettuce heads.", category: "Vegetables" },
  { id: 9, name: "Potatoes", price: 2.0, image: "/potatoes.jpg", description: "Farm-grown, hearty potatoes.", category: "Vegetables" },
  { id: 10, name: "Green Mealies", price: 0.50, image: "/mealies.jpg", description: "Sweet, tender green mealies.", category: "Vegetables" },
  { id: 11, name: "Watermelon", price: 3.5, image: "/melons.jpg", description: "Juicy, sweet watermelon.", category: "Fruits" },
];

const categories = ["All", "Fruits", "Vegetables", "Meat", "Dairy"];

function Shop() {
  const { addToCart, items } = useCart();
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlist();
  const { addToCompare, removeFromCompare, items: compareItems } = useCompare();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

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

  const handleCompareToggle = (product) => {
    const inCompare = compareItems.find(i => i.product.id === product.id);
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
  };

  const getQuantity = (productId) => {
    const item = items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const isInWishlist = (productId) => wishlistItems.find(i => i.product.id === productId);
  const isInCompare = (productId) => compareItems.find(i => i.product.id === productId);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenQuickView = (index) => {
    setSelectedIndex(index);
    setQuickViewOpen(true);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % filteredProducts.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  const selectedProduct = selectedIndex !== null ? filteredProducts[selectedIndex] : null;

  return (
    <Container sx={{ py: 5 }}>
      {/* Back to Home Button */}
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mb: 2, fontWeight: 600, textTransform: 'none', fontSize: 16 }}
      >
        ← Back to Home
      </Button>
      <Typography variant="h4" gutterBottom align="center" fontWeight={700}>
        Our Products
      </Typography>

      {/* Search + Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3} alignItems="center" justifyContent="center">
        <TextField
          label="Search products..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: "100%", sm: 300 } }}
        />
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
          {categories.map(cat => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={activeCategory === cat ? "primary" : "default"}
              onClick={() => setActiveCategory(cat)}
              variant={activeCategory === cat ? "filled" : "outlined"}
            />
          ))}
        </Stack>
      </Stack>

      {/* Product Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(260px, 1fr))"
        gap={3}
      >
        {filteredProducts.map((product, index) => {
          const quantity = getQuantity(product.id);
          const inWishlist = isInWishlist(product.id);
          const inCompare = isInCompare(product.id);

          return (
            <Card
              key={product.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'transform 0.25s, box-shadow 0.25s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* Image opens Quick View */}
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                onClick={() => handleOpenQuickView(index)}
                sx={{
                  height: 200,
                  width: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />

              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  {/* Name opens Quick View */}
                  <Typography
                    variant="subtitle1"
                    onClick={() => handleOpenQuickView(index)}
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      lineHeight: 1.3,
                      flexGrow: 1,
                      pr: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Stack direction="row" spacing={1}>
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
                        onClick={() => handleCompareToggle(product)}
                        size="small"
                      >
                        <CompareArrowsIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main', mt: 1 }}>
                  ${product.price.toFixed(2)}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 48, fontSize: 14 }}>
                  {product.description}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Stack spacing={1} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                    disabled={quantity > 0 && quantity >= 10}
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  >
                    {quantity > 0 ? 'Add More' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenQuickView(index)}
                    sx={{ borderRadius: 2 }}
                  >
                    Quick View
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Quick View Modal with navigation */}
      <Dialog open={quickViewOpen} onClose={() => setQuickViewOpen(false)} maxWidth="sm" fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {selectedProduct.name}
              <Stack direction="row" spacing={1}>
                <IconButton onClick={handlePrev}><ArrowBackIosNewIcon /></IconButton>
                <IconButton onClick={handleNext}><ArrowForwardIosIcon /></IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{ maxWidth: '100%', borderRadius: 8 }}
                />
              </Box>
              <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
                ${selectedProduct.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedProduct.description}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
              <Stack direction="row" spacing={1}>
                <IconButton
                  color={isInWishlist(selectedProduct.id) ? "error" : "default"}
                  onClick={() => handleWishlistToggle(selectedProduct)}
                >
                  {isInWishlist(selectedProduct.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton
                  color={isInCompare(selectedProduct.id) ? "primary" : "default"}
                  onClick={() => handleCompareToggle(selectedProduct)}
                >
                  <CompareArrowsIcon />
                </IconButton>
              </Stack>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <BackToTop />
    </Container>
  );
}

export default Shop;
