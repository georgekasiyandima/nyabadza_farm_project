import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MenuIcon from '@mui/icons-material/Menu';
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
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0, 0, 0, 0.08)' : 'none',
        color: 'primary.main',
        zIndex: 1300,
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        minHeight: 90,
        px: { xs: 2, md: 4 },
        maxWidth: '1400px',
        mx: 'auto',
        width: '100%',
      }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src="/Village12 Farm (1).png"
            alt="Village12Farm Logo"
            style={{
              height: 85,
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))',
              WebkitFilter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))',
            }}
          />
        </Box>
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center', 
          gap: 1,
          flexGrow: 1,
          justifyContent: 'center',
        }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/home" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/shop" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Shop
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/wine-tasting" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Wine Tasting
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/showcase" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Showcase
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/blog" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Blog
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/contact" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Contact
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/farm-info" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Farm Info
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/wishlist" 
            sx={{ 
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            <Badge badgeContent={wishlistCount} color="secondary">
              <FavoriteIcon />
            </Badge>
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/compare"
            sx={{ 
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            <Badge badgeContent={compareCount} color="secondary">
              <CompareArrowsIcon />
            </Badge>
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/cart"
            sx={{ 
              color: 'text.primary',
              '&:hover': { 
                backgroundColor: 'rgba(45, 80, 22, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
          <IconButton
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              color: 'text.primary',
            }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuItem component={Link} to="/home" onClick={handleMobileMenuClose}>Home</MenuItem>
        <MenuItem component={Link} to="/shop" onClick={handleMobileMenuClose}>Shop</MenuItem>
        <MenuItem component={Link} to="/wine-tasting" onClick={handleMobileMenuClose}>Wine Tasting</MenuItem>
        <MenuItem component={Link} to="/showcase" onClick={handleMobileMenuClose}>Showcase</MenuItem>
        <MenuItem component={Link} to="/blog" onClick={handleMobileMenuClose}>Blog</MenuItem>
        <MenuItem component={Link} to="/contact" onClick={handleMobileMenuClose}>Contact</MenuItem>
        <MenuItem component={Link} to="/farm-info" onClick={handleMobileMenuClose}>Farm Info</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar; 