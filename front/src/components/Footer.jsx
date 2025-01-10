import React from 'react';
import { Truck, Phone, Tag, MapPin } from 'lucide-react';
import { Box, Button, TextField, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>

      <Box sx={{ backgroundColor: 'grey.200', py: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" color="textPrimary" fontWeight="bold">
            Enregistrez-vous à notre newsletter
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Entrez votre Email"
            sx={{ width: 300, fontWeight: 'bold' }}
          />
          <Button variant="contained" color="black" sx={{ py: 1, px: 2, fontWeight: 'bold' }}>
            ➤
          </Button>
          <IconButton href="#" aria-label="Facebook" sx={{ fontWeight: 'bold' }}>
            <Facebook sx={{ fontSize: 24, color: 'black' }} />
          </IconButton>
          <IconButton href="#" aria-label="Instagram" sx={{ fontWeight: 'bold' }}>
            <Instagram sx={{ fontSize: 24, color: 'black' }} />
          </IconButton>
          <IconButton href="#" aria-label="Twitter" sx={{ fontWeight: 'bold' }}>
            <Twitter sx={{ fontSize: 24, color: 'black' }} />
          </IconButton>
          <IconButton href="#" aria-label="LinkedIn" sx={{ fontWeight: 'bold' }}>
            <FaLinkedinIn style={{ fontSize: 24, color: 'black' }} />
          </IconButton>
        </Box>
      </Box>


      <Box sx={{ backgroundColor: 'grey.100', py: 8 }}>
        <Grid container spacing={6}>
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
            <Box>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                À propos
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                Qui sommes-nous ?
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                Notre vision
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                Nos partenaires
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Typography variant="h6" gutterBottom>
              Produits
            </Typography>
            <Box>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                Mécanique
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                Accessoires
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Box>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                Livraison
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                Mise en place
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block" mb={1}>
                Retour marchandise
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Typography component="a" href="#" color="textSecondary" display="block">
              Assistance 24/7
            </Typography>
          </Grid>
        </Grid>
      </Box>


      <Box sx={{ backgroundColor: '#FABD15', py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Truck sx={{ fontSize: 28, fontWeight: 'bolder' }} />
            <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bolder' }}>
              LIVRAISON GRATUITE POUR PLUS DE 5000 DA
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Phone sx={{ fontSize: 28, fontWeight: 'bolder' }} />
            <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bolder' }}>
              +213 67 89 88
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tag sx={{ fontSize: 28, fontWeight: 'bolder' }} />
            <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bolder' }}>
              Coupon -50%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MapPin sx={{ fontSize: 28, fontWeight: 'bolder' }} />
            <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bolder' }}>
              MAPB:335CQWKT
            </Typography>
          </Box>
        </Box>
      </Box>


      <Box sx={{ backgroundColor: 'black', color: 'white', py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 4, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ width: 48, height: 32, backgroundColor: 'grey.600' }} />
            <Box sx={{ width: 48, height: 32, backgroundColor: 'grey.600' }} />
          </Box>
          <Typography variant="body2">
            Tous droits réservés © 2024
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
