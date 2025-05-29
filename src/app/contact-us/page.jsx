'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Schedule,
  Send,
} from '@mui/icons-material';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { cyan } from '@mui/material/colors';

const ContactUs = () => {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 10 , bgcolor: '#fff'}}>
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h3"
            fontWeight={600}
            gutterBottom
            sx={{
               color: '#1C2836', 
              textShadow: '0 4px 20px rgba(6, 182, 212, 0.2)',
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="sm"
            mx="auto"
          >
            We're here to help. Choose the most convenient way to contact us.
          </Typography>
        </Box>

       {/* Contact Cards */}
<Grid 
  container 
  spacing={4} 
  mb={10} 
  justifyContent="center"  // center grid items horizontally
  sx={{ textAlign: 'center' }}  // center text inside grid container (optional)
>
  {[
    {
      icon: <Email sx={{ fontSize: 44 }} />,
      title: 'Email Us',
      subtitle: 'General inquiries and support',
      action: 'contact@mockshark.com',
      href: 'mailto:contact@mockshark.com',
      buttonLabel: 'Send Email',
    },
    {
      icon: <Phone sx={{ fontSize: 44 }} />,
      title: 'Call Us',
      subtitle: 'Available during office hours',
      chips: [
        'Bangladesh: +880 1600140898',
        'USA: +1 7862977534',
      ],
    },
    {
      icon: <LocationOn sx={{ fontSize: 44 }} />,
      title: 'Visit Us',
      subtitle: 'Dhaka Office',
      action: '617/312 Delpara, Sharifbag, Narayanganj',
      href: 'https://maps.google.com',
      buttonLabel: 'Open in Maps',
    },
  ].map((item, i) => (
    <Grid 
      item 
      xs={12} 
      md={4} 
      key={i} 
      sx={{ display: 'flex', justifyContent: 'center' }}  // center each grid item horizontally
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          height: '100%',
          maxWidth: 360,  // limit card width to keep them neat
          width: '100%',
          textAlign: 'center',
          transition: '0.3s ease',
          backgroundColor: 'rgba(6, 182, 212, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 8px 24px rgba(6, 182, 212, 0.2)`,
          },
        }}
      >
        <Box
          mb={2}
          sx={{
            color: cyan[600],
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            width: 64,
            height: 64,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            mx: 'auto',
          }}
        >
          {item.icon}
        </Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {item.subtitle}
        </Typography>

        {item.chips ? (
          item.chips.map((label, idx) => (
            <Chip
              key={idx}
              label={label}
              icon={<Phone fontSize="small" />}
              variant="outlined"
              sx={{
                mb: 1,
                width: '100%',
                justifyContent: 'flex-start',
              }}
            />
          ))
        ) : (
          <Button
            variant="contained"
            fullWidth
            href={item.href}
            sx={{
              mt: 1,
              bgcolor: cyan[600],
              '&:hover': {
                bgcolor: cyan[700],
              },
            }}
            startIcon={<Send />}
          >
            {item.buttonLabel}
          </Button>
        )}
      </Paper>
    </Grid>
  ))}
</Grid>


      {/* Office Hours */}
<Paper
  elevation={2}
  sx={{
    p: 5,
    mb: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(6, 182, 212, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',      // Center horizontally
  }}
>
  <Box display="flex" alignItems="center" mb={4}>
    <Schedule sx={{ fontSize: 30, mr: 2, color: cyan[600] }} />
    <Typography variant="h5" fontWeight={700}>
      Office Hours
    </Typography>
  </Box>

  <Grid container spacing={3} sx={{ maxWidth: 600, justifyContent: 'center' }}>
    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          p: 3,
          backgroundColor: '#fff',
          borderRadius: 3,
          border: `1px solid ${cyan[100]}`,
          width: '100%',
          maxWidth: 260,           // keep boxes consistent width
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} color={cyan[600]}>
          Monday – Friday
        </Typography>
        <Typography>9:00 AM – 6:00 PM</Typography>
      </Box>
    </Grid>

    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          p: 3,
          backgroundColor: '#fff',
          borderRadius: 3,
          border: `1px solid ${cyan[100]}`,
          width: '100%',
          maxWidth: 260,
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} color={cyan[600]}>
          Saturday & Sunday
        </Typography>
        <Typography>Closed</Typography>
      </Box>
    </Grid>
  </Grid>
</Paper>


        {/* Contact Form Placeholder */}
        <Paper
          elevation={1}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(6, 182, 212, 0.03)',
          }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Message Us
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Our contact form is on its way. In the meantime, feel free to email us directly.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Email />}
            href="mailto:contact@mockshark.com"
            sx={{
              bgcolor: cyan[600],
              '&:hover': {
                bgcolor: cyan[700],
              },
            }}
          >
            Email Us
          </Button>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUs;
