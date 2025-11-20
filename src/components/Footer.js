import React from 'react';
import { Box, Container, Typography, Stack, IconButton, Link as MuiLink, TextField, Button, InputAdornment } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c2a 100%)',
      pt: 6,
      pb: 4,
      mt: 8,
      color: 'white',
    }}>
      <Container maxWidth="lg">
        {/* Newsletter CTA */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
            Stay up to date with Village12Farm
          </Typography>
          <Typography sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
            Subscribe to our newsletter for fresh offers, farm news, and more!
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ maxWidth: 500, mx: 'auto' }}>
            <TextField
              label="Your email"
              variant="outlined"
              size="small"
              sx={{ bgcolor: 'white', borderRadius: 2, minWidth: 220 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={{ color: 'primary.main' }}>
                      <EmailIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                fontWeight: 700, 
                px: 4, 
                borderRadius: 2,
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Subscribe
            </Button>
          </Stack>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
            Village12Farm
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" justifyContent="center">
            <MuiLink component={Link} to="/shop" underline="hover" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)', '&:hover': { color: 'white' } }}>
              Shop
            </MuiLink>
            <MuiLink component={Link} to="/wine-tasting" underline="hover" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)', '&:hover': { color: 'white' } }}>
              Wine Tasting
            </MuiLink>
            <MuiLink component={Link} to="/farm-info" underline="hover" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)', '&:hover': { color: 'white' } }}>
              About
            </MuiLink>
            <MuiLink component={Link} to="/contact" underline="hover" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)', '&:hover': { color: 'white' } }}>
              Contact
            </MuiLink>
            <MuiLink component={Link} to="/blog" underline="hover" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)', '&:hover': { color: 'white' } }}>
              Blog
            </MuiLink>
            <MuiLink component={Link} to="/policy" underline="hover" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)', '&:hover': { color: 'white' } }}>
              Policies
            </MuiLink>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton href="https://facebook.com" target="_blank" rel="noopener" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" rel="noopener" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" rel="noopener" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://village12farm.com" target="_blank" rel="noopener" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <PublicIcon />
            </IconButton>
            <IconButton href="mailto:info@village12farm.com" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ChatIcon />
            </IconButton>
            <IconButton component={Link} to="/policy" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <InfoIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="body2" align="center" sx={{ mt: 3, color: 'rgba(255,255,255,0.8)' }}>
          © {new Date().getFullYear()} Village12Farm. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
