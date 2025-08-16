import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import SpaIcon from '@mui/icons-material/Spa';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScroll, setShowScroll] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.7, type: 'spring', stiffness: 60 },
    }),
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3e0e5 100%)', position: 'relative' }}>
      {/* Back to Home Button (not shown on Home) */}
      {location.pathname !== '/' && (
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mb: 2, fontWeight: 600, textTransform: 'none', fontSize: 16 }}
        >
          ← Back to Home
        </Button>
      )}
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 350, md: 480 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src="/Farm1.jpg"
          alt="Nyabadza Farm Hero"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            filter: 'brightness(0.65) blur(0.5px)',
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, md: 4 },
              maxWidth: 600,
              mx: 'auto',
              background: 'rgba(255,255,255,0.55)',
              borderRadius: 3,
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              backdropFilter: 'blur(2.5px)',
            }}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  color: 'primary.main',
                  textAlign: 'center',
                  fontSize: { xs: 32, md: 48 },
                }}
              >
                Welcome to Village12Farm
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: 'text.secondary',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                Fresh. Organic. Local. <br />
                From our fields to your table.
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/shop')}
                  sx={{ fontWeight: 700, px: 4, borderRadius: 2 }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/farm-info')}
                  sx={{ fontWeight: 700, px: 4, borderRadius: 2 }}
                >
                  About the Farm
                </Button>
              </Stack>
            </motion.div>
          </Paper>
        </Container>
      </Box>

      {/* Feature Section */}
      <Container sx={{ py: 8 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {/* Feature 1 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            style={{ width: '100%' }}
          >
            <Paper
              elevation={4}
              sx={{
                flex: 1,
                minWidth: 220,
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.04)',
                  boxShadow: 6,
                  background: 'rgba(195,224,229,0.12)',
                },
              }}
            >
              <SpaIcon color="success" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Sustainable Farming
              </Typography>
              <img
                src="/pepper.jpg"
                alt="Sustainable"
                style={{
                  width: '100%',
                  maxWidth: 120,
                  borderRadius: 8,
                  margin: '0 auto 12px',
                  boxShadow: '0 2px 8px #c3e0e5',
                }}
              />
              <Typography color="text.secondary">
                We use eco-friendly practices to grow healthy crops and raise
                livestock, ensuring a better future for our community and the
                environment.
              </Typography>
            </Paper>
          </motion.div>
          {/* Feature 2 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={2}
            style={{ width: '100%' }}
          >
            <Paper
              elevation={4}
              sx={{
                flex: 1,
                minWidth: 220,
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.04)',
                  boxShadow: 6,
                  background: 'rgba(195,224,229,0.12)',
                },
              }}
            >
              <AgricultureIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Farm-Fresh Produce
              </Typography>
              <img
                src="/tomato1.jpg"
                alt="Produce"
                style={{
                  width: '100%',
                  maxWidth: 120,
                  borderRadius: 8,
                  margin: '0 auto 12px',
                  boxShadow: '0 2px 8px #c3e0e5',
                }}
              />
              <Typography color="text.secondary">
                Enjoy a wide variety of organic vegetables, fruits, and
                free-range products, harvested at their peak for maximum flavor
                and nutrition.
              </Typography>
            </Paper>
          </motion.div>
          {/* Feature 3 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={3}
            style={{ width: '100%' }}
          >
            <Paper
              elevation={4}
              sx={{
                flex: 1,
                minWidth: 220,
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.04)',
                  boxShadow: 6,
                  background: 'rgba(195,224,229,0.12)',
                },
              }}
            >
              <LocalShippingIcon
                color="secondary"
                sx={{ fontSize: 48, mb: 1 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Local Delivery
              </Typography>
              <img
                src="/mealies.jpg"
                alt="Delivery"
                style={{
                  width: '100%',
                  maxWidth: 120,
                  borderRadius: 8,
                  margin: '0 auto 12px',
                  boxShadow: '0 2px 8px #c3e0e5',
                }}
              />
              <Typography color="text.secondary">
                We deliver directly to your doorstep in the Nyabadza and Rusape
                area, making it easy to eat healthy and support local
                agriculture.
              </Typography>
            </Paper>
          </motion.div>
        </Stack>
      </Container>
      {/* Scroll to Top Button */}
      {showScroll && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleScrollTop}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1200,
            borderRadius: '50%',
            minWidth: 0,
            width: 48,
            height: 48,
            boxShadow: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Scroll to top"
        >
          <ArrowUpwardIcon />
        </Button>
      )}
    </Box>
  );
}

export default Home;
