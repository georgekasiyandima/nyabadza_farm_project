import React from 'react';
import { Container, Typography, Paper, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

export default function PolicyReturns() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(90deg, #fffde7 80%, #e3f2fd 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ReplayIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" color="warning.main" fontWeight={700}>
            Returns & Refunds Policy
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>1. Introduction</Typography>
        <Typography paragraph>
          At Village12Farm, we strive to deliver the freshest and highest quality products. If you are not satisfied with your purchase, please review our returns and refunds policy below.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>2. Eligibility</Typography>
        <List dense>
          <ListItem><ListItemText primary="Requests must be made within 48 hours of delivery." /></ListItem>
          <ListItem><ListItemText primary="Products must be unused, in original condition, and with proof of purchase." /></ListItem>
          <ListItem><ListItemText primary="Perishable items (e.g., fresh produce, eggs) are only eligible for return if damaged or spoiled on arrival." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>3. Returns Process</Typography>
        <List dense>
          <ListItem><ListItemText primary="Contact us at info@village12farm.com with your order details and reason for return." /></ListItem>
          <ListItem><ListItemText primary="We may request photos or additional information to process your request." /></ListItem>
          <ListItem><ListItemText primary="If approved, we will arrange for pickup or provide return instructions." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>4. Refunds</Typography>
        <List dense>
          <ListItem><ListItemText primary="Refunds are issued to the original payment method within 7 business days after approval." /></ListItem>
          <ListItem><ListItemText primary="In some cases, we may offer a replacement or store credit instead of a refund." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>5. Contact</Typography>
        <Typography paragraph>
          For questions or to initiate a return, please contact us at <b>info@village12farm.com</b>.
        </Typography>
      </Paper>
    </Container>
  );
}
