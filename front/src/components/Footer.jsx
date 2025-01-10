import React from 'react'; 
import { Truck, Phone, Tag, MapPin } from 'lucide-react';
import { Box, Button, TextField, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <Box sx={{ minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Première section */}
        <Box sx={{ backgroundColor: 'grey.200', py: { xs: 1, sm: 2 }, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" color="textPrimary" fontWeight="bold" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Enregistrez-vous à notre newsletter
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Entrez votre Email"
              sx={{ width: { xs: '80%', sm: 450 }, fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}
            />
            <Button variant="contained" color="black" sx={{ py: 0.5, px: 1.5, fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              ➤
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton href="#" aria-label="Facebook" sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 'bold' }}>
                <Facebook sx={{ color: 'black' }} />
              </IconButton>
              <IconButton href="#" aria-label="Instagram" sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 'bold' }}>
                <Instagram sx={{ color: 'black' }} />
              </IconButton>
              <IconButton href="#" aria-label="Twitter" sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 'bold' }}>
                <Twitter sx={{ color: 'black' }} />
              </IconButton>
              <IconButton href="#" aria-label="LinkedIn" sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 'bold' }}>
                <FaLinkedinIn style={{ fontSize: 20, color: 'black' }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Deuxième section */}
        <Box sx={{ backgroundColor: 'grey.100', py: { xs: 2, sm: 4 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2.5}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Nom de l'entreprise
              </Typography>
              <Typography color="textSecondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Avenue Agha Rue PP No.</Typography>
              <Typography color="textSecondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Alger, 20000</Typography>
              <Typography color="textSecondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>+213 55 77 88</Typography>
              <Typography color="textSecondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>contact@entreprise.com</Typography>
              <Typography color="textSecondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>www.nomcompagnie.com</Typography>
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Informations
              </Typography>
              <Box>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  À propos
                </Typography>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Qui sommes-nous ?
                </Typography>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Notre vision
                </Typography>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Nos partenaires
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Produits
              </Typography>
              <Box>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Mécanique
                </Typography>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Accessoires
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Services
              </Typography>
              <Box>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Livraison
                </Typography>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Mise en place
                </Typography>
                <Typography component="a" href="#" color="textSecondary" display="block" mb={0.5} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Retour marchandise
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Support
              </Typography>
              <Typography component="a" href="#" color="textSecondary" display="block" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                Assistance 24/7
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Troisième section */}
        <Box sx={{ backgroundColor: '#FABD15', py: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', px: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Truck sx={{ fontSize: { xs: 20, sm: 24 }, fontWeight: 'bolder' }} />
              <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bolder', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                LIVRAISON GRATUITE POUR PLUS DE 5000 DA
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone sx={{ fontSize: { xs: 20, sm: 24 }, fontWeight: 'bolder' }} />
              <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bolder', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                +213 67 89 88
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tag sx={{ fontSize: { xs: 20, sm: 24 }, fontWeight: 'bolder' }} />
              <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bolder', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                Coupon -50%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MapPin sx={{ fontSize: { xs: 20, sm: 24 }, fontWeight: 'bolder' }} />
              <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bolder', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                MAPB:335CQWKT
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Quatrième section */}
        <Box sx={{ backgroundColor: 'black', color: 'white', py: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ width: 48, height: 32, backgroundColor: 'grey.600' }} />
              <Box sx={{ width: 48, height: 32, backgroundColor: 'grey.600' }} />
            </Box>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              Tous droits réservés © 2024
            </Typography>
          </Box>
        </Box>

      </Box>
    </footer>
  );
};

export default Footer;
