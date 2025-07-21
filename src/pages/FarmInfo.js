import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Stack, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TerrainIcon from '@mui/icons-material/Terrain';

const farmInfo = {
  name: 'Nyabadza Farm',
  location: 'Plot 12, Nyabadza, Manicaland, Zimbabwe',
  coordinates: { lat: -18.9001, lng: 32.6002 },
  geography: 'Nyabadza Farm is located in the fertile valleys of Manicaland, surrounded by gentle hills and close to the Save River. The area is known for its rich agricultural tradition and scenic landscapes.',
  climate: 'Subtropical with summer rainfall. Average annual rainfall: 800mm. Temperatures range from 15°C (winter) to 30°C (summer).',
  soil: 'Predominantly sandy loam, well-drained and rich in organic matter, ideal for a variety of crops and livestock.',
  size: '120 hectares',
  history: 'Established in 1985, Nyabadza Farm has grown from a small family operation to a leading producer of organic crops and livestock in the region.',
};

function FarmInfo() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">About {farmInfo.name}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <LocationOnIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6">Location</Typography>
                  <Typography variant="body2">{farmInfo.location}</Typography>
                  <Typography variant="body2" color="text.secondary">Farm Size: {farmInfo.size}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <PublicIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="h6">Geographical Background</Typography>
                  <Typography variant="body2">{farmInfo.geography}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <WbSunnyIcon color="warning" fontSize="large" />
                <Box>
                  <Typography variant="h6">Climate</Typography>
                  <Typography variant="body2">{farmInfo.climate}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TerrainIcon color="secondary" fontSize="large" />
                <Box>
                  <Typography variant="h6">Soil Type</Typography>
                  <Typography variant="body2">{farmInfo.soil}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Farm Map & Area</Typography>
              {/* Placeholder for map - can integrate react-leaflet or Google Maps here */}
              <Box sx={{ width: '100%', height: 300, bgcolor: '#e0e0e0', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Typography color="text.secondary">[Map Placeholder]</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Farm History</Typography>
              <Typography variant="body2">{farmInfo.history}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FarmInfo; 