import React from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  Cancel,
  Gavel,
  MonetizationOn,
  AccountCircle,
  DeliveryDining,
  Build
} from '@mui/icons-material';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6 , bgcolor: '#fff'}}>
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
        <Typography 
  variant="h3" 
  component="h2" 
  gutterBottom 
  sx={{ 
    fontWeight: 'bold', 
    color: '#1C2836',   // your requested color as text color
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}
>
  Terms & Conditions
</Typography>

          <Typography variant="subtitle1" color="text.secondary">
            Last Updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        {/* Introduction */}
        <Paper elevation={0} sx={{ 
          mb: 6, 
          p: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'cyan.100',
          backgroundColor: 'rgba(6, 182, 212, 0.05)'
        }}>
          <Typography variant="h6" paragraph>
            Welcome to <span style={{ color: '#06b6d4', fontWeight: 600 }}>MockShark</span>! These terms govern your use of our products and services.
          </Typography>
          <Typography>
            By purchasing or using our mockups, you agree to these terms. Please read them carefully.
          </Typography>
        </Paper>

        {/* License Types */}
        <Accordion defaultExpanded sx={{ mb: 3, borderRadius: '12px !important' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'cyan.600' }} />}>
            <Box display="flex" alignItems="center">
              <MonetizationOn sx={{ mr: 2, color: 'cyan.600' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>1. License Types</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              We offer three types of licenses to meet different needs:
            </Typography>
            
            {/* Personal License */}
            <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderColor: 'success.main', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Chip label="Personal License" color="success" sx={{ fontWeight: 600 }} />
              </Box>
              <Typography paragraph sx={{ fontWeight: 500 }}>
                <span style={{ color: '#06b6d4' }}>Permitted Use:</span> Personal use, educational projects, or portfolio presentation.
              </Typography>
              <Typography>
                <span style={{ color: '#06b6d4' }}>Restrictions:</span> Cannot be used for any commercial purposes, resale, redistribution, AI training, or NFTs.
              </Typography>
            </Paper>
            
            {/* Commercial License */}
            <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderColor: 'warning.main', backgroundColor: 'rgba(234, 179, 8, 0.05)' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Chip label="Commercial License" color="warning" sx={{ fontWeight: 600 }} />
              </Box>
              <Typography paragraph sx={{ fontWeight: 500 }}>
                <span style={{ color: '#06b6d4' }}>Permitted Use:</span> Client projects, business branding, websites, advertisements, and marketing materials.
              </Typography>
              <Typography>
                <span style={{ color: '#06b6d4' }}>Restrictions:</span> Cannot be resold, redistributed, or included in products where the mockup is the main value.
              </Typography>
            </Paper>
            
            {/* Extended License */}
            <Paper sx={{ p: 3, mb: 2, borderLeft: '4px solid', borderColor: 'error.main', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Chip label="Extended Commercial License" color="error" sx={{ fontWeight: 600 }} />
              </Box>
              <Typography paragraph sx={{ fontWeight: 500 }}>
                <span style={{ color: '#06b6d4' }}>Permitted Use:</span> Unlimited commercial use, including resale in templates, digital products, or print-on-demand platforms.
              </Typography>
              <Typography>
                <span style={{ color: '#06b6d4' }}>Restrictions:</span> May not be used in any defamatory, obscene, illegal, or misleading context.
              </Typography>
            </Paper>
            
            <Typography variant="body2" fontStyle="italic">
              Note: All licenses are non-exclusive, royalty-free, perpetual, and valid worldwide unless stated otherwise.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Refund Policy */}
        <Accordion sx={{ mb: 3, borderRadius: '12px !important' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'cyan.600' }} />}>
            <Box display="flex" alignItems="center">
              <MonetizationOn sx={{ mr: 2, color: 'cyan.600' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>2. Refund Policy</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: 'cyan.600' }}>•</ListItemIcon>
                <Typography>
                  <span style={{ fontWeight: 500, color: '#06b6d4' }}>Eligibility:</span> Refund requests within 24 hours if files haven't been downloaded
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: 'cyan.600' }}>•</ListItemIcon>
                <Typography>
                  <span style={{ fontWeight: 500, color: '#06b6d4' }}>How to Request:</span> Email contact@mockshark.com with order details
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: 'cyan.600' }}>•</ListItemIcon>
                <Typography>
                  <span style={{ fontWeight: 500, color: '#06b6d4' }}>Not Eligible:</span> No refunds after file download
                </Typography>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Usage Rights */}
        <Accordion sx={{ mb: 3, borderRadius: '12px !important' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'cyan.600' }} />}>
            <Box display="flex" alignItems="center">
              <Gavel sx={{ mr: 2, color: 'cyan.600' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>3. Usage Rights</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
              {/* Allowed Uses */}
              <Box flex={1}>
                <Typography variant="subtitle1" sx={{ color: 'success.main', mb: 2, fontWeight: 600 }}>
                  <CheckCircle sx={{ verticalAlign: 'middle', mr: 1 }} /> Allowed
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'success.main' }}>•</ListItemIcon>
                    <Typography>Use in personal or client projects</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'success.main' }}>•</ListItemIcon>
                    <Typography>Commercial use (based on license type)</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'success.main' }}>•</ListItemIcon>
                    <Typography>Marketing, presentations, product mockups</Typography>
                  </ListItem>
                </List>
              </Box>
              
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
              
              {/* Prohibited Uses */}
              <Box flex={1}>
                <Typography variant="subtitle1" sx={{ color: 'error.main', mb: 2, fontWeight: 600 }}>
                  <Cancel sx={{ verticalAlign: 'middle', mr: 1 }} /> Not Allowed
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'error.main' }}>•</ListItemIcon>
                    <Typography>Resale or redistribution (unless Extended License)</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'error.main' }}>•</ListItemIcon>
                    <Typography>Use in AI training datasets or for NFTs</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'error.main' }}>•</ListItemIcon>
                    <Typography>Sharing with third parties</Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Additional Sections */}
        {[
          {
            icon: <DeliveryDining sx={{ color: 'cyan.600' }} />,
            title: "4. File Delivery",
            content: (
              <>
                <Typography paragraph>
                  <span style={{ color: '#06b6d4', fontWeight: 500 }}>Delivery Method:</span> After purchase, products are available on your MockShark download page.
                </Typography>
                <Typography>
                  <span style={{ color: '#06b6d4', fontWeight: 500 }}>Support:</span> Contact us at contact@mockshark.com for any issues.
                </Typography>
              </>
            )
          },
          {
            icon: <AccountCircle sx={{ color: 'cyan.600' }} />,
            title: "5. User Account Terms",
            content: (
              <>
                <Typography paragraph sx={{ fontWeight: 500, color: '#06b6d4' }}>
                  Account Requirement:
                </Typography>
                <Typography paragraph>
                  Users must create an account to purchase and access downloads.
                </Typography>
                <Typography paragraph sx={{ fontWeight: 500, color: '#06b6d4' }}>
                  User Responsibility:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'cyan.600' }}>•</ListItemIcon>
                    <Typography>Keep account credentials secure</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'cyan.600' }}>•</ListItemIcon>
                    <Typography>You're responsible for all account activity</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'cyan.600' }}>•</ListItemIcon>
                    <Typography>Notify us immediately of unauthorized access</Typography>
                  </ListItem>
                </List>
              </>
            )
          },
          {
            icon: <Build sx={{ color: 'cyan.600' }} />,
            title: "6. Custom Mockup Service",
            content: (
              <Typography>
                Custom mockups are handled under separate terms per project. Delivery time, revisions, and usage rights will be agreed upon in advance.
              </Typography>
            )
          },
          {
            icon: <Gavel sx={{ color: 'cyan.600' }} />,
            title: "7. Governing Law",
            content: (
              <Typography>
                These Terms are governed by Bangladeshi law. Transactions using Paddle may also be subject to UK/EU consumer regulations.
              </Typography>
            )
          }
        ].map((section, index) => (
          <Accordion key={index} sx={{ mb: 3, borderRadius: '12px !important' }}>
            <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'cyan.600' }} />}>
              <Box display="flex" alignItems="center">
                {section.icon}
                <Typography variant="h6" sx={{ fontWeight: 600, ml: 2 }}>
                  {section.title}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {section.content}
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Contact CTA */}
        <Paper sx={{ 
          mt: 6, 
          p: 4, 
          textAlign: 'center',
          backgroundColor: 'cyan.50',
          border: '1px solid',
          borderColor: 'cyan.200',
          borderRadius: 3
        }}>
          <Typography variant="h6" paragraph sx={{ fontWeight: 600 }}>
            Questions About Our Terms?
          </Typography>
          <Typography paragraph>
            Contact us at{' '}
            <a 
              href="mailto:contact@mockshark.com" 
              style={{ 
                color: '#06b6d4', 
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              contact@mockshark.com
            </a>
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;