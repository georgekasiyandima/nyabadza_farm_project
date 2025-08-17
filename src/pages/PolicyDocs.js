import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper, Box, Link } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import SpaIcon from '@mui/icons-material/Spa';
import PolicyIcon from '@mui/icons-material/Policy';
import ReplayIcon from '@mui/icons-material/Replay';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

export default function PolicyDocs() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(90deg, #e3f2fd 80%, #f1f8e9 100%)' }}>
        <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
          Farm Policies & Governance
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Village12Farm is committed to transparency, sustainability, and ethical business practices. Explore our key policy documents below.
        </Typography>
        <List>
          <ListItem button onClick={() => navigate('/policy/terms')}>
            <GavelIcon color="primary" sx={{ mr: 2 }} />
            <ListItemText primary="Terms of Use" secondary="Rules and guidelines for using our services." />
          </ListItem>
          <ListItem button onClick={() => navigate('/policy/sustainability')}>
            <SpaIcon color="success" sx={{ mr: 2 }} />
            <ListItemText primary="Sustainable Commitment Goals" secondary="Our environmental, social, and ethical commitments." />
          </ListItem>
          <ListItem button onClick={() => navigate('/policy/returns')}>
            <ReplayIcon color="warning" sx={{ mr: 2 }} />
            <ListItemText primary="Returns & Refunds Policy" secondary="How we handle returns, refunds, and replacements." />
          </ListItem>
          <ListItem button onClick={() => navigate('/policy/privacy')}>
            <LockIcon color="secondary" sx={{ mr: 2 }} />
            <ListItemText primary="Privacy Policy" secondary="How we protect your data and privacy." />
          </ListItem>
          <ListItem button onClick={() => navigate('/policy/community')}>
            <GroupIcon color="primary" sx={{ mr: 2 }} />
            <ListItemText primary="Community Guidelines" secondary="Our standards for respectful and safe engagement." />
          </ListItem>
        </List>
      </Paper>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <PolicyIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          More policy documents coming soon: Privacy Policy, Returns & Refunds, Community Guidelines, and more.
        </Typography>
      </Box>
    </Container>
  );
}
