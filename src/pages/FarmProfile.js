import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Button,
  LinearProgress,
  useTheme,
  Fab,
  Collapse,
  Popover,
  IconButton
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PlaceIcon from '@mui/icons-material/Place';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TerrainIcon from '@mui/icons-material/Terrain';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const sectionIcons = {
  'Location & Agro-Ecology': <PlaceIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />,
  'Climate': <WbSunnyIcon color="warning" sx={{ fontSize: 32, mr: 1 }} />,
  'Soil Profile': <TerrainIcon color="secondary" sx={{ fontSize: 32, mr: 1 }} />,
  'Enterprise Options (1 ha)': <AgricultureIcon color="success" sx={{ fontSize: 32, mr: 1 }} />,
  'Proposed 1-Hectare Layout': <AgricultureIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />,
  'Water & Irrigation': <WaterDropIcon color="info" sx={{ fontSize: 32, mr: 1 }} />,
  'Annual Crop Calendar': <WbSunnyIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />,
  'Business & Scaling Strategy': <ContactMailIcon color="secondary" sx={{ fontSize: 32, mr: 1 }} />,
};

const landUseData = [
  { name: 'Veg Blocks', value: 0.5, color: '#1976d2' },
  { name: 'Orchard', value: 0.2, color: '#43a047' },
  { name: 'Tunnels', value: 0.06, color: '#ffd600' },
  { name: 'Poultry', value: 0.05, color: '#e57373' },
  { name: 'Pack-Shed', value: 0.04, color: '#8d6e63' },
  { name: 'Water Hub', value: 0.03, color: '#00bcd4' },
  { name: 'Compost', value: 0.02, color: '#8bc34a' },
];

const yieldData = [
  { crop: 'Maize', yield: 5 },
  { crop: 'Tomatoes', yield: 12 },
  { crop: 'Peppers', yield: 8 },
  { crop: 'Onions', yield: 7 },
];

const cropFacts = {
  Maize: 'Maize is the staple food crop in Zimbabwe, best grown in summer rains.',
  Tomatoes: 'Tomatoes can be grown year-round in tunnels for higher yields.',
  Peppers: 'Peppers are rich in vitamin C and thrive in well-drained soils.',
  Onions: 'Onions prefer cooler months and sandy loam soils.',
};

const cropImages = {
  Maize: '/mealies.jpg',
  Tomatoes: '/tomato1.jpg',
  Peppers: '/pepper.jpg',
  Onions: '/feggs.jpg', // Placeholder
};

const farmLayoutImg = '/Farm1.jpg'; // Placeholder for a layout SVG or image

const cropCycle = [
  { step: 'Land Prep', desc: 'Plough, lime, and fertilize fields', month: 'Aug–Sep' },
  { step: 'Planting', desc: 'Sow seeds or transplant seedlings', month: 'Oct–Nov' },
  { step: 'Irrigation', desc: 'Drip irrigation, mulching', month: 'Nov–Mar' },
  { step: 'Weeding', desc: 'Manual or chemical weed control', month: 'Nov–Mar' },
  { step: 'Harvest', desc: 'Pick crops at maturity', month: 'Feb–Jul' },
];

const SectionCard = ({ title, children, color = 'primary', idx, expandable, expanded, onToggle }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { delay: 0.1 * idx, duration: 0.7, type: 'spring', stiffness: 60 } },
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <Card
      sx={{
        mb: 3,
        boxShadow: 3,
        borderLeft: `6px solid`,
        borderColor: `${color}.main`,
        background: 'linear-gradient(90deg, #f5f7fa 80%, #e0f7fa 100%)',
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
          {sectionIcons[title]}
          <Typography variant="h6" gutterBottom color={color} fontWeight={700} sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {expandable && (
            <IconButton onClick={onToggle} size="small" aria-label={expanded ? 'Collapse section' : 'Expand section'}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Stack>
        <Divider sx={{ mb: 2 }} />
        {expandable ? <Collapse in={expanded}>{children}</Collapse> : children}
      </CardContent>
    </Card>
  </motion.div>
);

export default function FarmProfile() {
  const navigate = useNavigate();
  const [showScroll, setShowScroll] = React.useState(false);
  const theme = useTheme();
  // Expand/collapse state for each section
  const [expanded, setExpanded] = useState({});
  // Popover state for crop facts
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverCrop, setPopoverCrop] = useState('');

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

  const handleToggle = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePopoverOpen = (event, crop) => {
    setAnchorEl(event.currentTarget);
    setPopoverCrop(crop);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverCrop('');
  };
  const open = Boolean(anchorEl);

  // PDF Download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Village12Farm Profile', 10, 10);
    doc.text('Location: Nyabadza, Makoni District, Manicaland', 10, 20);
    doc.text('See the web app for full details and infographics.', 10, 30);
    doc.save('Village12Farm_Profile.pdf');
  };

  // Rainfall infographic (simulate 800mm out of 1050mm max)
  const rainfall = 800;
  const rainfallMax = 1050;
  const rainfallPct = Math.round((rainfall / rainfallMax) * 100);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mb: 2, fontWeight: 600, textTransform: 'none', fontSize: 16 }}
      >
        ← Back to Home
      </Button>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Farm Profile: Village12Farm / Rusape Area
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<DownloadIcon />}
        sx={{ mb: 3 }}
        onClick={handleDownloadPDF}
      >
        Download PDF
      </Button>

      {/* Land Use Pie Chart */}
      <SectionCard title="Land Use Breakdown (1 ha)" color="primary" idx={0}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={landUseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {landUseData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Crop Yields Bar Chart */}
      <SectionCard title="Crop Yields (t/ha, mock data)" color="success" idx={0}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={yieldData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="crop" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="yield" fill={theme.palette.primary.main} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Location & Agro-Ecology */}
      <SectionCard title="Location & Agro-Ecology" color="primary" idx={1} expandable expanded={expanded['Location & Agro-Ecology']} onToggle={() => handleToggle('Location & Agro-Ecology')}>
        <Typography>
          The farm is situated in <b>Nyabadza, Makoni District, Manicaland</b>,
          along the Harare–Mutare corridor. The region lies mainly in{' '}
          <b>Natural Region II</b>, suitable for intensive cropping and
          livestock, with annual rainfall between{' '}
          <b>700–1,050 mm</b>.
        </Typography>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <img src={farmLayoutImg} alt="Farm Layout" style={{ maxWidth: 400, width: '100%', borderRadius: 12, boxShadow: '0 2px 12px #c3e0e5' }} />
        </Box>
      </SectionCard>

      {/* Climate */}
      <SectionCard title="Climate" color="warning" idx={2} expandable expanded={expanded['Climate']} onToggle={() => handleToggle('Climate')}>
        <List>
          <ListItem>
            <ListItemText primary="Rainfall Season" secondary="November – March (wettest in Dec–Jan)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dry Season" secondary="April – October (coolest in July)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Altitude & Type" secondary="~1,400 m; subtropical highland climate (Cwb)" />
          </ListItem>
        </List>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Annual Rainfall: {rainfall}mm
          </Typography>
          <LinearProgress
            variant="determinate"
            value={rainfallPct}
            sx={{ height: 12, borderRadius: 6, background: theme.palette.grey[200], '& .MuiLinearProgress-bar': { background: theme.palette.info.main } }}
            aria-label="Annual rainfall progress"
          />
          <Typography variant="caption" color="text.secondary">
            {rainfallPct}% of max (1,050mm)
          </Typography>
        </Box>
      </SectionCard>

      {/* Soils */}
      <SectionCard title="Soil Profile" color="secondary" idx={3} expandable expanded={expanded['Soil Profile']} onToggle={() => handleToggle('Soil Profile')}>
        <Typography>
          Dominated by <b>granitic sandy soils</b>—low in nitrogen, phosphorus,
          and sulfur with acidic tendencies (pH often &lt; 5.5). Pockets of
          <b>red/brown clay loams</b> occur, offering higher fertility. To
          optimize production:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Lime" secondary="Raise pH to 5.8–6.5 for vegetables" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Organic Matter" secondary="Apply compost, chicken manure, cover crops" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phosphorus" secondary="Band P fertilizers pre-planting (root & bulb crops)" />
          </ListItem>
        </List>
      </SectionCard>

      {/* Enterprise Choices */}
      <SectionCard title="Enterprise Options (1 ha)" color="success" idx={4} expandable expanded={expanded['Enterprise Options (1 ha)']} onToggle={() => handleToggle('Enterprise Options (1 ha)')}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">Irrigated Vegetables</Typography>
            <List dense>
              <ListItem><ListItemText primary="Tomatoes, onions, cabbage, spinach" /></ListItem>
              <ListItem><ListItemText primary="Green beans, butternut, carrots" /></ListItem>
              <ListItem><ListItemText primary="Herbs: coriander, parsley, basil" /></ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">Perennials & Livestock</Typography>
            <List dense>
              <ListItem><ListItemText primary="Compact orchard: citrus, avocado, peaches" /></ListItem>
              <ListItem><ListItemText primary="Poultry unit: 300–500 broilers or 150–250 layers" /></ListItem>
              <ListItem><ListItemText primary="Optional: potatoes, mushrooms, nursery seedlings" /></ListItem>
            </List>
          </Grid>
        </Grid>
      </SectionCard>

      {/* Farm Layout */}
      <SectionCard title="Proposed 1-Hectare Layout" color="primary" idx={5} expandable expanded={expanded['Proposed 1-Hectare Layout']} onToggle={() => handleToggle('Proposed 1-Hectare Layout')}>
        <Stack spacing={1}>
          <Chip label="0.20 ha - Veg Block A (Tomatoes + Leafy Greens)" />
          <Chip label="0.20 ha - Veg Block B (Onions, Beans, Cabbage, Butternut)" />
          <Chip label="0.10 ha - Veg Block C (Leafy Greens & Herbs)" />
          <Chip label="0.20 ha - Orchard (Citrus, Avocado, Stone Fruit)" />
          <Chip label="0.06 ha - Tunnels (Tomatoes, Peppers, Lettuce, Basil)" />
          <Chip label="0.05 ha - Poultry Unit & Manure Yard" />
          <Chip label="0.04 ha - Pack-Shed & Cold Room" />
          <Chip label="0.03 ha - Water & Fertigation Hub" />
          <Chip label="0.02 ha - Compost & Vermiculture" />
        </Stack>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <img src={farmLayoutImg} alt="Farm Layout" style={{ maxWidth: 400, width: '100%', borderRadius: 12, boxShadow: '0 2px 12px #c3e0e5' }} />
        </Box>
      </SectionCard>

      {/* Water & Irrigation */}
      <SectionCard title="Water & Irrigation" color="info" idx={6} expandable expanded={expanded['Water & Irrigation']} onToggle={() => handleToggle('Water & Irrigation')}>
        <Typography>
          Dry season irrigation is critical (May–Oct). A borehole with storage
          tanks and drip irrigation is recommended. Peak demand for 0.5 ha
          vegetables may reach <b>15–25 m³/day</b>. Invest in:
        </Typography>
        <List dense>
          <ListItem><ListItemText primary="Drip irrigation system with sand/media filters" /></ListItem>
          <ListItem><ListItemText primary="Fertigation pump for precision feeding" /></ListItem>
          <ListItem><ListItemText primary="Moisture probes / tensiometers" /></ListItem>
          <ListItem><ListItemText primary="Mulching to reduce evaporation" /></ListItem>
        </List>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <img src="/Farm3.jpg" alt="Irrigation System" style={{ maxWidth: 400, width: '100%', borderRadius: 12, boxShadow: '0 2px 12px #c3e0e5' }} />
        </Box>
      </SectionCard>

      {/* Annual Calendar */}
      <SectionCard title="Annual Crop Calendar" color="warning" idx={7} expandable expanded={expanded['Annual Crop Calendar']} onToggle={() => handleToggle('Annual Crop Calendar')}>
        <List dense>
          <ListItem>
            <ListItemText primary="Aug–Oct" secondary="Prepare fields, lime, plant onions, carrots, brassicas, tunnel tomatoes" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Nov–Mar" secondary="Rain-fed crops: tomatoes, beans, butternut, cabbage" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Apr–Jul" secondary="Cool-season crops: peas, carrots, lettuce, brassicas" />
          </ListItem>
        </List>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <img src="/lettuce.jpg" alt="Seasonal Crops" style={{ maxWidth: 400, width: '100%', borderRadius: 12, boxShadow: '0 2px 12px #c3e0e5' }} />
        </Box>
      </SectionCard>

      {/* Business & Scaling */}
      <SectionCard title="Business & Scaling Strategy" color="secondary" idx={8} expandable expanded={expanded['Business & Scaling Strategy']} onToggle={() => handleToggle('Business & Scaling Strategy')}>
        <Typography>
          <b>Markets:</b> Rusape town, Mutare, Harare corridor, schools, hotels,
          and wholesale buyers.  <br />
          <b>Approach:</b> Stagger plantings for weekly cashflow, practice basic
          Good Agricultural Practices (GAP), and use digital traceability via
          the farm web app.  <br />
          <b>Scaling:</b> Start with 5–6 crops, optimize irrigation & pack-out,
          then expand into out-grower schemes or additional land blocks.
        </Typography>
      </SectionCard>

      {/* Crop Chips with Popovers */}
      <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Crop Facts
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
          {Object.keys(cropFacts).map((crop) => (
            <Chip
              key={crop}
              label={crop}
              color="primary"
              icon={<InfoIcon />}
              onClick={(e) => handlePopoverOpen(e, crop)}
              sx={{ fontWeight: 600, fontSize: 16, mb: 1, cursor: 'pointer' }}
              aria-describedby={open ? 'crop-fact-popover' : undefined}
            />
          ))}
        </Stack>
        <Popover
          id="crop-fact-popover"
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Box sx={{ p: 2, maxWidth: 300 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              {popoverCrop}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 1 }}>
              {cropFacts[popoverCrop]}
            </Typography>
            {cropImages[popoverCrop] && (
              <img src={cropImages[popoverCrop]} alt={popoverCrop} style={{ width: '100%', borderRadius: 8 }} />
            )}
          </Box>
        </Popover>
      </Box>

      {/* Crop Cycle Timeline/Stepper */}
      <SectionCard title="Crop Cycle (Typical)" color="primary" idx={9}>
        <Timeline position="alternate">
          {cropCycle.map((item, idx) => (
            <TimelineItem key={idx}>
              <TimelineSeparator>
                <TimelineDot color={idx === 0 ? 'primary' : 'grey'} />
                {idx < cropCycle.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1" fontWeight={700}>{item.step}</Typography>
                <Typography color="text.secondary">{item.desc} <b>({item.month})</b></Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </SectionCard>

      {/* Scroll to Top Button */}
      {showScroll && (
        <Fab
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
        </Fab>
      )}
      {/* Sticky Contact Us Button */}
      <Fab
        color="primary"
        variant="extended"
        onClick={() => navigate('/contact')}
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 32,
          zIndex: 1200,
          fontWeight: 700,
          px: 3,
          boxShadow: 4,
        }}
        aria-label="Contact Us"
      >
        <ContactMailIcon sx={{ mr: 1 }} />
        Contact Us
      </Fab>
    </Container>
  );
}
