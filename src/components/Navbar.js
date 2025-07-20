import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useCart } from './CartContext';

function Navbar() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

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