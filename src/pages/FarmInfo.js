import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Stack, Divider, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TerrainIcon from '@mui/icons-material/Terrain';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const farmInfo = {
  name: 'Nyabadza Farm',
  location: 'Plot 12, Nyabadza, Manicaland, Zimbabwe',
  coordinates: { lat: -18.5387375, lng: 32.2790781 },
  geography: 'Nyabadza Farm is located in the fertile valleys of Manicaland, surrounded by gentle hills and close to the Save River. The area is known for its rich agricultural tradition and scenic landscapes.',
  climate: 'Subtropical with summer rainfall. Average annual rainfall: 800mm. Temperatures range from 15°C (winter) to 30°C (summer).',
  soil: 'Predominantly sandy loam, well-drained and rich in organic matter, ideal for a variety of crops and livestock.',
  size: '1 hectare',
  history: 'Established in 2025, Nyabadza Farm has grown from a small family operation to a leading producer of organic crops and livestock in the region.',
};

const farmCoordinates = [farmInfo.coordinates.lat, farmInfo.coordinates.lng];

const farmIcon = new L.Icon({
  iconUrl: '/marker.webp', // Place your icon in public/
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function FarmInfo() {
  const [satellite, setSatellite] = useState(false);

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
              <Button
                variant="outlined"
                size="small"
                onClick={() => setSatellite((prev) => !prev)}
                sx={{ mb: 1 }}
              >
                {satellite ? 'Standard View' : 'Satellite View'}
              </Button>
              <Box sx={{ width: '100%', height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                <MapContainer center={farmCoordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution={satellite
                      ? 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                      : '&copy; OpenStreetMap contributors'}
                    url={satellite
                      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                  />
                  <Marker position={farmCoordinates} icon={farmIcon}>
                    <Popup>
                      Nyabadza Farm<br />Near Rusape, Nyabadza village, Nyanga road<br />
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${farmCoordinates[0]},${farmCoordinates[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Popup>
                  </Marker>
                </MapContainer>
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