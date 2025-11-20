import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Stack,
  Divider,
  Paper,
  ImageList,
  ImageListItem,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TerrainIcon from '@mui/icons-material/Terrain';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import OpacityIcon from '@mui/icons-material/Opacity';
import StraightenIcon from '@mui/icons-material/Straighten';
import SpaIcon from '@mui/icons-material/Spa';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BackToTop from '../components/BackToTop';
import PlaceIcon from '@mui/icons-material/Place';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const farmInfo = {
  name: 'Village12Farm',
  location: 'Plot 12, Nyabadza, Manicaland, Zimbabwe',
  coordinates: { lat: -18.5387375, lng: 32.2790781 },
  geography: 'Village12Farm is located in the fertile valleys of Manicaland, surrounded by gentle hills and close to Rusaoe. The area is known for its rich agricultural tradition and scenic landscapes.',
  climate: 'Subtropical with summer rainfall. Average annual rainfall: 800mm. Temperatures range from 15°C (winter) to 30°C (summer).',
  soil: 'Predominantly sandy loam, well-drained and rich in organic matter, ideal for a variety of crops and livestock.',
  size: '1 hectare',
  crops: [
    {
      name: 'Maize',
      icon: <AgricultureIcon color="primary" sx={{ fontSize: 36 }} />, 
      desc: 'Staple crop, grown during the rainy season.',
      fact: 'Average yield: 5 tons/ha',
      link: '/shop?crop=maize',
    },
    {
      name: 'Tomatoes',
      icon: <SpaIcon color="error" sx={{ fontSize: 36 }} />, 
      desc: 'Greenhouse and open field tomatoes.',
      fact: 'Harvested year-round.',
      link: '/shop?crop=tomatoes',
    },
    {
      name: 'Peppers',
      icon: <SpaIcon color="success" sx={{ fontSize: 36 }} />, 
      desc: 'Green and red peppers, rich in vitamin C.',
      fact: 'Best planted in early spring.',
      link: '/shop?crop=peppers',
    },
  ],
  rainfall: '800mm',
  history: [
    { year: 2025, event: 'Village12Farm established by the Kasiyandima family.' },
    { year: 2026, event: 'First maize and tomato harvest.' },
    { year: 2027, event: 'Expanded to include green mealies and peppers.' },
    { year: 2028, event: 'Launched local delivery and online shop.' },
  ],
  images: [
    '/Farm1.jpg',
    '/Farm3.jpg',
    '/pepper.jpg',
    '/tomato1.jpg',
    '/mealies.jpg',
    '/feggs.jpg',
    '/chickens.jpg',
    '/apples.jpg',
    '/lettuce.jpg',
    '/cucumber.jpg',
    '/potatoes.jpg',
    '/melons.jpg',
  ],
  sustainability: [
    { icon: <SpaIcon color="success" sx={{ fontSize: 32 }} />, title: 'Organic Fertilizer', desc: 'We use compost and manure to enrich our soils.' },
    { icon: <WaterDropIcon color="primary" sx={{ fontSize: 32 }} />, title: 'Drip Irrigation', desc: 'Efficient water use for healthy crops.' },
    { icon: <SpaIcon color="info" sx={{ fontSize: 32 }} />, title: 'Crop Rotation', desc: 'Rotating crops to maintain soil health.' },
  ],
};

const farmCoordinates = [farmInfo.coordinates.lat, farmInfo.coordinates.lng];

// Seasonal calendar data for crops
const calendarData = [
  { month: 'Jan', Maize: 1, Tomatoes: 1, Peppers: 0, Mealies: 0 },
  { month: 'Feb', Maize: 1, Tomatoes: 1, Peppers: 0, Mealies: 0 },
  { month: 'Mar', Maize: 1, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'Apr', Maize: 0, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'May', Maize: 0, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'Jun', Maize: 0, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'Jul', Maize: 0, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'Aug', Maize: 0, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'Sep', Maize: 0, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'Oct', Maize: 1, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'Nov', Maize: 1, Tomatoes: 1, Peppers: 1, Mealies: 1 },
  { month: 'Dec', Maize: 1, Tomatoes: 1, Peppers: 1, Mealies: 1 },
];

function FarmInfo() {
  const navigate = useNavigate();
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  // Scroll to top state
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

  return (
    <Box sx={{ pt: '90px', minHeight: '100vh', background: 'linear-gradient(135deg, #fafafa 0%, #f5f7fa 100%)' }}>
      <Container sx={{ py: 5, position: 'relative' }}>
        {/* Back to Home Button */}
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mb: 2, fontWeight: 600, textTransform: 'none', fontSize: 16 }}
        >
          ← Back to Home
        </Button>
        
        {/* Logo Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <img
            src="/V12F.png"
            alt="Village12Farm Logo"
            style={{
              height: 120,
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Image Banner */}
        <Box sx={{ width: '100%', mb: 4 }}>
          <img
            src={farmInfo.images[0]}
            alt="Farm Banner"
            style={{
              width: '100%',
              maxHeight: 340,
              objectFit: 'cover',
              borderRadius: 16,
              boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>

      {/* Hero + Gallery (remove second hero image) */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={12}>
              <Typography variant="h3" fontWeight={800} color="primary.main" gutterBottom>
                About {farmInfo.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {farmInfo.geography}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                <Chip icon={<StraightenIcon />} label={`Size: ${farmInfo.size}`} color="primary" />
                <Chip icon={<OpacityIcon />} label={`Rainfall: ${farmInfo.rainfall}`} color="info" />
                <Chip icon={<AgricultureIcon />} label={`Crops: ${farmInfo.crops.map(c=>c.name).join(', ')}`} color="success" />
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <LocationOnIcon color="primary" />
                <Typography variant="body1">{farmInfo.location}</Typography>
              </Stack>
            </Grid>
          </Grid>
          {/* Gallery with Lightbox */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Farm Gallery
            </Typography>
            <ImageList
              cols={6}
              gap={12}
              sx={{
                maxWidth: 1200,
                mx: 'auto',
                width: '100%',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(6, 1fr)',
                },
              }}
              role="list"
              aria-label="Farm photo gallery"
            >
              {farmInfo.images.map((img, idx) => (
                <ImageListItem key={idx} role="listitem">
                  <img
                    src={img}
                    alt={`Photo of Village12Farm: ${img.replace('/','').replace('.jpg','').replace(/([A-Z])/g, ' $1').trim()}`}
                    style={{ borderRadius: 8, width: '100%', cursor: 'pointer' }}
                    onClick={() => { setLightboxOpen(true); setLightboxIdx(idx); }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            {/* Lightbox Dialog */}
            <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} maxWidth="md">
              <DialogContent sx={{ position: 'relative', p: 0, bgcolor: 'background.default' }}>
                <IconButton
                  onClick={() => setLightboxOpen(false)}
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
                  aria-label="Close image preview"
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  onClick={() => setLightboxIdx((lightboxIdx - 1 + farmInfo.images.length) % farmInfo.images.length)}
                  sx={{ position: 'absolute', top: '50%', left: 8, zIndex: 2, bgcolor: 'background.paper', '&:hover': { bgcolor: 'primary.light' } }}
                  aria-label="Previous image"
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <img
                  src={farmInfo.images[lightboxIdx]}
                  alt={`Photo of Village12Farm: ${farmInfo.images[lightboxIdx].replace('/','').replace('.jpg','').replace(/([A-Z])/g, ' $1').trim()}`}
                  style={{ width: '100%', maxHeight: 600, objectFit: 'contain', borderRadius: 8, display: 'block', margin: '0 auto' }}
                />
                <IconButton
                  onClick={() => setLightboxIdx((lightboxIdx + 1) % farmInfo.images.length)}
                  sx={{ position: 'absolute', top: '50%', right: 8, zIndex: 2, bgcolor: 'background.paper', '&:hover': { bgcolor: 'primary.light' } }}
                  aria-label="Next image"
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </DialogContent>
            </Dialog>
          </Box>
        </Paper>
      </Box>

      {/* Crop Highlights Section */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Crop Highlights
          </Typography>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {farmInfo.crops.map((crop) => (
              <Grid item xs={12} sm={6} md={3} key={crop.name} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                <Card sx={{
                  p: 2,
                  borderRadius: 3,
                  textAlign: 'center',
                  height: '100%',
                  width: '100%',
                  minHeight: 240,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: 2,
                  mx: 'auto',
                }}>
                  <Box>{crop.icon}</Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>{crop.name}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>{crop.desc}</Typography>
                  <Typography variant="caption" color="success.main" sx={{ mb: 2 }}>{crop.fact}</Typography>
                  <Button variant="outlined" size="small" onClick={() => navigate(crop.link)} sx={{ mt: 1 }}>
                    View in Shop
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Seasonal Calendar Section */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Seasonal Calendar
          </Typography>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={calendarData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="Maize" stackId="a" fill="#1976d2" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Tomatoes" stackId="a" fill="#e57373" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Peppers" stackId="a" fill="#43a047" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Mealies" stackId="a" fill="#ffd600" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Planting and harvesting months for key crops.
          </Typography>
        </Paper>
      </Box>

      {/* Sustainability / Practices Section */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Sustainability & Practices
          </Typography>
          <Grid container spacing={3}>
            {farmInfo.sustainability.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center', height: '100%', boxShadow: 2 }}>
                  <Box>{item.icon}</Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>{item.title}</Typography>
                  <Typography color="text.secondary">{item.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Interactive Map Section */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Farm Location
          </Typography>
          <Box sx={{ width: '100%', height: 320, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
            <MapContainer
              center={farmCoordinates}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <ZoomControl position="topright" />
              <Marker position={farmCoordinates}>
                <Popup>
                  Village12Farm<br />Near Rusape, Nyabadza village, Nyanga road<br />
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${farmCoordinates[0]},${farmCoordinates[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Popup>
              </Marker>
              {/* Radius circle for farm boundary (e.g., 60m for 1 hectare) */}
              <Circle
                center={farmCoordinates}
                radius={60}
                pathOptions={{ color: '#1976d2', fillColor: '#1976d2', fillOpacity: 0.1 }}
              />
            </MapContainer>
          </Box>
        </Paper>
      </Box>

      {/* Farm History Timeline */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Our Story
          </Typography>
          <Timeline position="alternate">
            {farmInfo.history.map((item, idx) => (
              <TimelineItem key={idx}>
                <TimelineSeparator>
                  <TimelineDot color={idx === 0 ? 'primary' : 'grey'} />
                  {idx < farmInfo.history.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle1" fontWeight={700}>{item.year}</Typography>
                  <Typography color="text.secondary">{item.event}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Paper>
      </Box>

      {/* CTA Section */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center', background: 'linear-gradient(90deg, #e0f7fa 0%, #f5f7fa 100%)' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Visit Village12Farm or Shop Our Products
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              href={`https://www.google.com/maps/dir/?api=1&destination=${farmCoordinates[0]},${farmCoordinates[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 700, px: 4, borderRadius: 2 }}
              startIcon={<PlaceIcon />}
            >
              Visit Us
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/shop')}
              sx={{ fontWeight: 700, px: 4, borderRadius: 2 }}
              startIcon={<ShoppingBagIcon />}
            >
              Shop Farm Products
            </Button>
          </Stack>
        </Paper>
      </Box>
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
      <BackToTop />
      </Container>
    </Box>
  );
}

export default FarmInfo; 