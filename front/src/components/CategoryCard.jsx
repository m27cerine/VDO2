import React from 'react';
import { Box, Typography } from '@mui/material';
import { CarRepair, ElectricCar, Build, Handyman, ColorLens, FlashOn } from '@mui/icons-material'; // Icônes MUI

const CategoryCard = ({ icon, name, onClick }) => {
  // Choisir l'icône en fonction du nom de la catégorie
  const renderIcon = () => {
    switch (icon) {
      case 'Moteur':
        return <CarRepair sx={{ fontSize: 40, color: 'black' }} />;
      case 'Energie':
        return <FlashOn sx={{ fontSize: 40, color: 'black' }} />;
      case 'Pièces':
        return <Build sx={{ fontSize: 40, color: 'black' }} />;
      case 'Mécanique':
        return <Handyman sx={{ fontSize: 40, color: 'black' }} />;
      case 'Carrosserie':
        return <ColorLens sx={{ fontSize: 40, color: 'black' }} />;
      case 'Electricité':
        return <ElectricCar sx={{ fontSize: 40, color: 'black' }} />;
      default:
        return null;
    }
  };

  return (
    <Box 
      onClick={onClick} 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        backgroundColor: '#f0f0f0', // Fond gris
        borderRadius: '8px',
        boxShadow: 1,
        transition: 'all 0.3s',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3,
          transform: 'scale(1.05)'
        }
      }}
    >
      <Box sx={{ mb: 2 }}>
        {renderIcon()}
      </Box>
      <Typography variant="body2" sx={{ fontWeight: '500', color: 'text.secondary' }}>
        {name}
      </Typography>
    </Box>
  );
};

export default CategoryCard;
