import React from 'react';
import { Truck, Phone, Tag, MapPin } from 'lucide-react';
import { Box, Button, TextField, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowX: 'hidden',
      }}>
        {/* Première section */}
        <Box sx={{ backgroundColor: 'grey.200', py: { xs: 1, sm: 2 }, textAlign: 'center', width: '100%' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1
          }}>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Enregistrez-vous à notre newsletter
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Entrez votre Email"
              sx={{ width: { xs: '80%', sm: 450 } }}
            />
            <Button variant="contained" sx={{
              backgroundColor: 'black', color: 'white',
              py: 0.5, px: 1.5, fontSize: { xs: '0.875rem', sm: '1rem' }
            }}>
              ➤
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton href="#" aria-label="Facebook">
                <Facebook sx={{ color: 'black' }} />
              </IconButton>
              <IconButton href="#" aria-label="Instagram">
                <Instagram sx={{ color: 'black' }} />
              </IconButton>
              <IconButton href="#" aria-label="Twitter">
                <Twitter sx={{ color: 'black' }} />
              </IconButton>
              <IconButton href="#" aria-label="LinkedIn">
                <FaLinkedinIn style={{ color: 'black' }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Deuxième section */}
        <Box sx={{ backgroundColor: 'grey.100', py: { xs: 2, sm: 4 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2.5}>
              <Typography variant="h6" gutterBottom>
                Nom de l'entreprise
              </Typography>
              <Typography color="textSecondary">Avenue Agha Rue PP No.</Typography>
              <Typography color="textSecondary">Alger, 20000</Typography>
              <Typography color="textSecondary">+213 55 77 88</Typography>
              <Typography color="textSecondary">contact@entreprise.com</Typography>
              <Typography color="textSecondary">www.nomcompagnie.com</Typography>
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <Typography variant="h6" gutterBottom>
                Informations
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">À propos</Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">Qui sommes-nous ?</Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">Notre vision</Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">Nos partenaires</Typography>
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <Typography variant="h6" gutterBottom>
                Produits
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">Mécanique</Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">Accessoires</Typography>
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <Typography variant="h6" gutterBottom>
                Services
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">Livraison</Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">Mise en place</Typography>
              <Typography component="a" href="#" color="textSecondary" display="block">Retour marchandise</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom>
                Support
              </Typography>
              <Typography component="a" href="#" color="textSecondary">Assistance 24/7</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Troisième section */}
        <Box sx={{ backgroundColor: '#FABD15', py: { xs: 1, sm: 2 } }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', px: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Truck />
              <Typography>LIVRAISON GRATUITE POUR PLUS DE 5000 DA</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone />
              <Typography>+213 67 89 88</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tag />
              <Typography>Coupon -50%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MapPin />
              <Typography>MAPB:335CQWKT</Typography>
            </Box>
          </Box>
        </Box>

        {/* Quatrième section */}
        <Box sx={{ backgroundColor: 'black', color: 'white', py: { xs: 1, sm: 2 } }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 3, alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ width: 48, height: 32, backgroundColor: 'grey.600' }} />
              <Box sx={{ width: 48, height: 32, backgroundColor: 'grey.600' }} />
            </Box>
            <Typography>Tous droits réservés © 2024</Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
