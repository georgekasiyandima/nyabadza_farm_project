import React from 'react';
import { Container, Typography, Paper, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

export default function PolicyTerms() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(90deg, #e3f2fd 80%, #fffde7 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <GavelIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" color="primary" fontWeight={700}>
            Terms of Use
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>1. Introduction</Typography>
        <Typography paragraph>
          Welcome to Village12Farm! By accessing or using our website and services, you agree to comply with these Terms of Use. Please read them carefully.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>2. User Responsibilities</Typography>
        <List dense>
          <ListItem><ListItemText primary="Provide accurate and up-to-date information when placing orders or creating an account." /></ListItem>
          <ListItem><ListItemText primary="Respect our staff, community, and other customers in all interactions." /></ListItem>
          <ListItem><ListItemText primary="Do not misuse our website or attempt to disrupt our services." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>3. Orders & Payments</Typography>
        <List dense>
          <ListItem><ListItemText primary="All orders are subject to availability and confirmation." /></ListItem>
          <ListItem><ListItemText primary="Prices are listed in USD and may change without notice." /></ListItem>
          <ListItem><ListItemText primary="Payment is required at checkout. We accept secure online and mobile payment methods." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>4. Returns & Refunds</Typography>
        <Typography paragraph>
          If you are not satisfied with your purchase, please contact us within 48 hours of delivery. We offer refunds or replacements for damaged or spoiled products, subject to our review.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>5. Privacy</Typography>
        <Typography paragraph>
          We respect your privacy. Your personal information is handled according to our Privacy Policy and is never sold to third parties.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>6. Contact</Typography>
        <Typography paragraph>
          For questions or concerns about these terms, please contact us at <b>info@village12farm.com</b>.
        </Typography>
      </Paper>
    </Container>
  );
}
