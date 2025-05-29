'use client'
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Grow
} from '@mui/material';
import {
  ExpandMore,
  Security,
  Lock,
  VisibilityOff,
  Gavel,
  Email,
  Cookie,
  DataUsage,
  Share
} from '@mui/icons-material';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { keyframes } from '@emotion/react';
import { cyan } from '@mui/material/colors';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const PrivacyPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const sections = [
    {
      id: 'panel1',
      icon: <DataUsage sx={{ fontSize: 28 }} />,
      title: "Information We Collect",
      content: (
        <>
          <Typography paragraph>
            <strong>Personal Information:</strong> When you create an account, make purchases, or contact us, 
            we collect information like your name, email address, and payment details.
          </Typography>
          <Typography paragraph>
            <strong>Usage Data:</strong> We automatically collect anonymous data about how you interact with our 
            website, including pages visited and device information.
          </Typography>
          <Typography>
            <strong>Cookies:</strong> <Cookie sx={{ verticalAlign: 'middle', fontSize: 20 }} /> We use cookies to enhance functionality and analyze performance. 
            You can manage these in your browser settings.
          </Typography>
        </>
      )
    },
    {
      id: 'panel2',
      icon: <Lock sx={{ fontSize: 28 }} />,
      title: "How We Use Your Information",
      content: (
        <Typography component="ul" sx={{ pl: 3 }}>
          <li>Process orders and deliver digital products</li>
          <li>Maintain and secure your account</li>
          <li>Communicate important updates and offers</li>
          <li>Improve our platform's performance</li>
          <li>Comply with legal requirements</li>
        </Typography>
      )
    },
    {
      id: 'panel3',
      icon: <Share sx={{ fontSize: 28 }} />,
      title: "Data Sharing",
      content: (
        <>
          <Typography paragraph>
            We <strong>do not sell</strong> your personal data. Information is only shared with:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Payment processors to complete transactions</li>
            <li>Essential service providers (hosting, email services)</li>
            <li>Legal authorities when required by law</li>
          </Typography>
        </>
      )
    },
    {
      id: 'panel4',
      icon: <Security sx={{ fontSize: 28 }} />,
      title: "Data Security",
      content: (
        <>
          <Typography paragraph>
            We implement industry-standard security measures including encryption, firewalls, and regular 
            security audits to protect your information.
          </Typography>
          <Typography>
            While no system is completely secure, we continuously work to safeguard your data against 
            unauthorized access.
          </Typography>
        </>
      )
    },
    {
      id: 'panel5',
      icon: <Gavel sx={{ fontSize: 28 }} />,
      title: "Your Rights",
      content: (
        <>
          <Typography paragraph>
            You have the right to:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Access, correct, or delete your data</li>
            <li>Restrict or object to data processing</li>
            <li>Withdraw consent</li>
            <li>Request a portable copy of your data</li>
          </Typography>
        </>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, transparent 60%)',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Grow in={true} timeout={500}>
            <Box textAlign="center" mb={6}>
              <Typography 
  variant={isMobile ? 'h4' : 'h3'} 
  component="h1" 
  gutterBottom 
  sx={{ 
    fontWeight: 'bold', 
     color: '#1C2836',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }}
>
  Privacy Policy
</Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  display: 'inline-block',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                Last Updated: {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Grow>

          <Fade in={true} timeout={800}>
            <Paper 
              elevation={0} 
              sx={{ 
                mb: 6, 
                p: 4,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)'
              }}
            >
              <Typography variant="h6" paragraph sx={{ fontWeight: 500 }}>
                At <span style={{ color: cyan[600] }}>MockShark</span>, your privacy is our top priority. This policy explains how we collect, use, and protect your information when you use our services.
              </Typography>
              <Typography>
                We're committed to being transparent about our data practices and giving you control over your personal information.
              </Typography>
            </Paper>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6, position: 'relative', zIndex: 1 ,bgcolor: '#fff' }}>
        {sections.map((section, index) => (
          <Grow in={true} timeout={index * 200 + 500} key={section.id}>
            <Box mb={3}>
              <Accordion 
                expanded={expanded === section.id} 
                onChange={handleChange(section.id)}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.12)'
                  },
                  '&.Mui-expanded': {
                    margin: '16px 0'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    minHeight: 72,
                    '&.Mui-expanded': {
                      minHeight: 72,
                      backgroundColor: 'rgba(63, 81, 181, 0.05)'
                    },
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center',
                      margin: '12px 0'
                    }
                  }}
                >
                  <Box 
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      animation: `${pulse} 2s infinite`,
                      animationPlayState: expanded === section.id ? 'paused' : 'running'
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {section.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: 'rgba(245, 245, 245, 0.5)',
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {section.content}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grow>
        ))}

        <Fade in={true} timeout={1500}>
          <Paper
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(63,81,181,0.1) 0%, rgba(33,150,243,0.1) 100%)',
              border: '1px solid rgba(33, 150, 243, 0.2)',
              textAlign: 'center'
            }}
          >
            <Email sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" paragraph sx={{ fontWeight: 600 }}>
              Contact Us for Privacy Concerns
            </Typography>
            <Typography paragraph>
              To exercise your rights or for any privacy-related questions:
            </Typography>
          <Typography 
  variant="h5" 
  component="a" 
  href="mailto:contact@mockshark.com"
  sx={{
    color: cyan[600],
    textDecoration: 'none',
    fontWeight: 700,
    display: 'inline-block',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      textDecoration: 'underline',
    }
  }}
>
  contact@mockshark.com
</Typography>
          </Paper>
        </Fade>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: 4, 
            textAlign: 'center',
            fontStyle: 'italic'
          }}
        >
          We may update this policy periodically. Significant changes will be communicated through email or website notice.
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;