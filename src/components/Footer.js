import React from 'react';
import { Box, Container, Typography, Stack, IconButton, Link as MuiLink, TextField, Button, InputAdornment } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box sx={{
      background: 'linear-gradient(90deg, #c3e0e5 0%, #f5f7fa 100%)',
      pt: 6,
      pb: 4,
      mt: 8,
      borderTop: '1px solid #e0e0e0',
    }}>
      <Container maxWidth="lg">
        {/* Newsletter CTA */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Stay up to date with Village12Farm
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
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
                    <IconButton color="primary">
                      <EmailIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 700, px: 4, borderRadius: 2 }}>
              Subscribe
            </Button>
          </Stack>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Village12Farm
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <MuiLink component={Link} to="/shop" underline="hover" color="inherit" sx={{ fontWeight: 500 }}>
              Shop
            </MuiLink>
            <MuiLink component={Link} to="/farm-info" underline="hover" color="inherit" sx={{ fontWeight: 500 }}>
              About
            </MuiLink>
            <MuiLink component={Link} to="/contact" underline="hover" color="inherit" sx={{ fontWeight: 500 }}>
              Contact
            </MuiLink>
            <MuiLink component={Link} to="/blog" underline="hover" color="inherit" sx={{ fontWeight: 500 }}>
              Blog
            </MuiLink>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton href="https://facebook.com" target="_blank" rel="noopener" color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" rel="noopener" color="primary">
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" rel="noopener" color="primary">
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} Village12Farm. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
