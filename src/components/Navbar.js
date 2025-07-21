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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Nyabadza Farm
        </Typography>
        <Button color="inherit" component={Link} to="/home">Home</Button>
        <Button color="inherit" component={Link} to="/shop">Shop</Button>
        <Button color="inherit" component={Link} to="/showcase">Showcase</Button>
        <Button color="inherit" component={Link} to="/blog">Blog</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        <Button color="inherit" component={Link} to="/farm-info">Farm Info</Button>
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