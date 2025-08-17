import React from 'react';
import { Container, Typography, Paper, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

export default function PolicyPrivacy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(90deg, #f3e5f5 80%, #e3f2fd 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LockIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" color="secondary" fontWeight={700}>
            Privacy Policy
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>1. Introduction</Typography>
        <Typography paragraph>
          Village12Farm is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>2. Data Collection</Typography>
        <List dense>
          <ListItem><ListItemText primary="We collect information you provide when placing orders, signing up for newsletters, or contacting us." /></ListItem>
          <ListItem><ListItemText primary="We may collect usage data (e.g., pages visited, device type) to improve our services." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>3. Use of Data</Typography>
        <List dense>
          <ListItem><ListItemText primary="To process orders and provide customer support." /></ListItem>
          <ListItem><ListItemText primary="To send updates, offers, and farm news (with your consent)." /></ListItem>
          <ListItem><ListItemText primary="To improve our website and services." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>4. Data Security</Typography>
        <Typography paragraph>
          We use industry-standard security measures to protect your data. However, no method is 100% secure, and we cannot guarantee absolute security.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>5. User Rights</Typography>
        <List dense>
          <ListItem><ListItemText primary="You may request access, correction, or deletion of your personal data at any time." /></ListItem>
          <ListItem><ListItemText primary="You may opt out of marketing communications at any time." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>6. Contact</Typography>
        <Typography paragraph>
          For privacy questions or requests, contact us at <b>info@village12farm.com</b>.
        </Typography>
      </Paper>
    </Container>
  );
}
