import React from 'react';
import { Container, Typography, Paper, Box, Divider, List, ListItem, ListItemIcon, ListItemText, LinearProgress } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function PolicySustainability() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(90deg, #e8f5e9 80%, #e3f2fd 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SpaIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" color="success.main" fontWeight={700}>
            Sustainable Commitment Goals
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Our Mission</Typography>
        <Typography paragraph>
          Village12Farm is dedicated to producing healthy food while protecting the environment, empowering our community, and upholding ethical business practices.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Environmental Goals</Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><SpaIcon color="success" /></ListItemIcon>
            <ListItemText primary="Adopt organic and regenerative farming methods." />
          </ListItem>
          <ListItem>
            <ListItemIcon><SpaIcon color="success" /></ListItemIcon>
            <ListItemText primary="Reduce water and chemical usage through efficient irrigation and natural pest control." />
          </ListItem>
          <ListItem>
            <ListItemIcon><SpaIcon color="success" /></ListItemIcon>
            <ListItemText primary="Promote biodiversity by growing a variety of crops and maintaining natural habitats." />
          </ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Social Responsibility</Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><PeopleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Support local employment and fair wages." />
          </ListItem>
          <ListItem>
            <ListItemIcon><PeopleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Engage in community outreach and education on sustainable agriculture." />
          </ListItem>
          <ListItem>
            <ListItemIcon><PeopleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Foster a safe, inclusive, and respectful workplace." />
          </ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Ethical Practices</Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><VerifiedUserIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Maintain transparency in our operations and supply chain." />
          </ListItem>
          <ListItem>
            <ListItemIcon><VerifiedUserIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Respect the rights and privacy of all stakeholders." />
          </ListItem>
          <ListItem>
            <ListItemIcon><VerifiedUserIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Continuously improve through feedback and innovation." />
          </ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Progress Tracking</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">2024 Sustainability Goals Progress</Typography>
          <LinearProgress variant="determinate" value={60} sx={{ height: 12, borderRadius: 6, mt: 1 }} />
          <Typography variant="caption" color="text.secondary">60% of 2024 goals achieved</Typography>
        </Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Contact</Typography>
        <Typography paragraph>
          For more information about our sustainability commitments, contact us at <b>info@village12farm.com</b>.
        </Typography>
      </Paper>
    </Container>
  );
}
