import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Badge from '@mui/material/Badge';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { useCompare } from './CompareContext';

function Navbar() {
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { items: compareItems } = useCompare();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const compareCount = compareItems.length;

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 12px 0 rgba(31, 38, 135, 0.08)',
        color: 'primary.main',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 72 }}>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 900,
            color: 'primary.main',
            textDecoration: 'none',
            letterSpacing: 1,
            fontSize: { xs: 24, sm: 32 },
            mr: 4,
            transition: 'color 0.2s',
            '&:hover': { color: 'secondary.main' },
          }}
        >
          Village12Farm
        </Typography>
        <Button color="inherit" component={Link} to="/home" sx={{ fontWeight: 600 }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/shop" sx={{ fontWeight: 600 }}>
          Shop
        </Button>
        <Button color="inherit" component={Link} to="/showcase" sx={{ fontWeight: 600 }}>
          Showcase
        </Button>
        <Button color="inherit" component={Link} to="/blog" sx={{ fontWeight: 600 }}>
          Blog
        </Button>
        <Button color="inherit" component={Link} to="/contact" sx={{ fontWeight: 600 }}>
          Contact
        </Button>
        <Button color="inherit" component={Link} to="/farm-info" sx={{ fontWeight: 600 }}>
          Farm Info
        </Button>
        <Button color="inherit" component={Link} to="/farm-profile" sx={{ fontWeight: 600 }}>
          Farm Profile
        </Button>
        <Button color="inherit" component={Link} to="/policy" sx={{ fontWeight: 600 }}>
          Policies
        </Button>
        <Button color="inherit" component={Link} to="/wishlist" sx={{ ml: 2 }}>
          <Badge badgeContent={wishlistCount} color="secondary">
            <FavoriteIcon />
          </Badge>
        </Button>
        <Button color="inherit" component={Link} to="/compare" sx={{ ml: 2 }}>
          <Badge badgeContent={compareCount} color="secondary">
            <CompareArrowsIcon />
          </Badge>
        </Button>
        <Button color="inherit" component={Link} to="/cart" sx={{ ml: 2 }}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 