import React from 'react';
import { Container, Typography, Paper, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

export default function PolicyCommunity() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(90deg, #e3f2fd 80%, #fce4ec 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <GroupIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" color="primary" fontWeight={700}>
            Community Guidelines
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>1. Introduction</Typography>
        <Typography paragraph>
          Village12Farm is a community built on respect, safety, and collaboration. These guidelines help ensure a positive experience for everyone.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>2. Respectful Conduct</Typography>
        <List dense>
          <ListItem><ListItemText primary="Treat all members, staff, and customers with respect and courtesy." /></ListItem>
          <ListItem><ListItemText primary="No harassment, discrimination, or hate speech will be tolerated." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>3. Safety</Typography>
        <List dense>
          <ListItem><ListItemText primary="Report any unsafe behavior or content immediately." /></ListItem>
          <ListItem><ListItemText primary="Follow all farm safety instructions and signage during visits." /></ListItem>
        </List>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>4. Reporting Issues</Typography>
        <Typography paragraph>
          If you witness or experience a violation of these guidelines, please contact us at <b>info@village12farm.com</b>.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>5. Enforcement</Typography>
        <Typography paragraph>
          Violations may result in removal from the community, denial of service, or legal action as appropriate.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>6. Contact</Typography>
        <Typography paragraph>
          For questions or to report an issue, contact us at <b>info@village12farm.com</b>.
        </Typography>
      </Paper>
    </Container>
  );
}
