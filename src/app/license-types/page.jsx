import React from 'react'
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
const page = () => {
  return (
    <div>
        <Navbar/>
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <div>
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
        </div>
        </Container>
    </div>
  )
}

export default page