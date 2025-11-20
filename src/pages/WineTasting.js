import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import WineBarIcon from '@mui/icons-material/WineBar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BackToTop from '../components/BackToTop';

function WineTasting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your reservation request! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: '',
      message: '',
    });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.7, type: 'spring', stiffness: 60 },
    }),
  };

  const wineExperiences = [
    {
      title: 'Classic Tasting',
      description: 'Sample 5 of our finest wines with expert guidance',
      duration: '1.5 hours',
      price: '$35',
      icon: <WineBarIcon sx={{ fontSize: 48 }} />,
    },
    {
      title: 'Premium Experience',
      description: 'Exclusive tasting of reserve wines paired with artisanal cheeses',
      duration: '2 hours',
      price: '$65',
      icon: <LocalBarIcon sx={{ fontSize: 48 }} />,
    },
    {
      title: 'Private Group Tasting',
      description: 'Customized tasting experience for groups of 6-12 people',
      duration: '2.5 hours',
      price: 'Custom',
      icon: <GroupsIcon sx={{ fontSize: 48 }} />,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%)', pt: '90px' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 400, md: 500 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #2d5016 0%, #4a7c2a 100%)',
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <WineBarIcon sx={{ fontSize: 80, color: 'white', mb: 2 }} />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'white',
                fontSize: { xs: 40, md: 64 },
              }}
            >
              Wine Tasting Room
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 400,
                maxWidth: 700,
                mx: 'auto',
              }}
            >
              Discover the art of winemaking at Village12Farm. Experience our handcrafted wines in an elegant, rustic setting.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                document.getElementById('reservation-form').scrollIntoView({ behavior: 'smooth' });
              }}
              sx={{
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Book a Tasting
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: 'primary.main',
                }}
              >
                Our Wine Tasting Experience
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                Nestled in the heart of our farm, our wine tasting room offers an intimate setting where you can explore our carefully curated selection of wines. Each bottle tells a story of our commitment to sustainable farming and traditional winemaking techniques.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                Our knowledgeable staff will guide you through each tasting, sharing insights about the grape varieties, terroir, and the unique characteristics that make our wines special.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 3 }}>
                <Chip
                  icon={<LocationOnIcon />}
                  label="On-Site Tasting Room"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  icon={<AccessTimeIcon />}
                  label="Open Daily"
                  color="secondary"
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  icon={<GroupsIcon />}
                  label="Group Bookings Available"
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  height: '100%',
                  minHeight: 400,
                  background: 'linear-gradient(135deg, #8b6f47 0%, #a6896b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ textAlign: 'center', p: 4 }}>
                  <WineBarIcon sx={{ fontSize: 120, color: 'white', mb: 2, opacity: 0.9 }} />
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                    Experience the Finest
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Wine Experiences */}
      <Box sx={{ background: 'rgba(45, 80, 22, 0.05)', py: 8 }}>
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: 'primary.main',
                textAlign: 'center',
              }}
            >
              Tasting Experiences
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 6,
                color: 'text.secondary',
                textAlign: 'center',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Choose the perfect tasting experience for you
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {wineExperiences.map((experience, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index + 1}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {experience.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                        {experience.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', minHeight: 60 }}>
                        {experience.description}
                      </Typography>
                      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                        <Chip
                          icon={<AccessTimeIcon />}
                          label={experience.duration}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={experience.price}
                          size="small"
                          color="secondary"
                          sx={{ fontWeight: 700 }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Reservation Form */}
      <Container id="reservation-form" sx={{ py: 8 }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: 'primary.main',
              textAlign: 'center',
            }}
          >
            Book Your Tasting
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 6,
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Reserve your spot for an unforgettable wine tasting experience
          </Typography>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 3, md: 6 },
              maxWidth: 800,
              mx: 'auto',
              borderRadius: 3,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Preferred Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Number of Guests"
                    name="guests"
                    type="number"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 1, max: 20 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupsIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Special Requests or Questions"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    Submit Reservation Request
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Container>

      {/* Contact Info */}
      <Box sx={{ background: 'linear-gradient(135deg, #2d5016 0%, #4a7c2a 100%)', py: 6 }}>
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 4,
                color: 'white',
                textAlign: 'center',
              }}
            >
              Visit Our Tasting Room
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                  <LocationOnIcon sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Location
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Village12Farm<br />
                    Nyabadza, Rusape
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                  <AccessTimeIcon sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Hours
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Daily: 10:00 AM - 6:00 PM<br />
                    By appointment preferred
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                  <PhoneIcon sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Contact
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Call or email to book<br />
                    info@village12farm.com
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      <BackToTop colorOverride="primary" />
    </Box>
  );
}

export default WineTasting;

