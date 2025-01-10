import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ProductCard = ({ name, price, oldPrice, image, timeLeft }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 2,
        boxShadow: 2,
        position: 'relative', // Ajout de position relative pour pouvoir positionner le bouton au-dessus
        '&:hover': {
          boxShadow: 4,
          transition: 'box-shadow 0.3s',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
        {timeLeft && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'red',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
            }}
          >
            {timeLeft}
          </Box>
        )}
      </Box>

      <Typography variant="h6" sx={{ mt: 2, fontWeight: 'medium', color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {name}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {price.toLocaleString()} DA
          </Typography>
          {oldPrice && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
              {oldPrice.toLocaleString()} DA
            </Typography>
          )}
        </Box>
      </Box>

      {/* Bouton Panier */}
      <Button
        variant="contained"
        sx={{
          position: 'absolute',  // Positionner le bouton de manière absolue
          bottom: -15,           // Décaler le bouton en bas du produit
          left: '50%',           // Centrer horizontalement
          transform: 'translateX(-50%)',  // Centrer parfaitement
          backgroundColor: '#fabd15',  // Couleur de fond
          color: 'black',
          padding: '5px 10px',
          '&:hover': {
            backgroundColor: '#f9a800', // Couleur au survol
          },
        }}
      >
        + Panier
      </Button>
    </Box>
  );
};

export default ProductCard;
