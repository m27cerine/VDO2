import React from 'react';
import { Box, Typography } from '@mui/material';

const CategoryCard = ({ icon, title }) => (
  <Box 
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      p: 2,
      borderRadius: 1,
      border: 1,
      boxShadow: 1,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        transform: 'translateY(-2px)'
      }
    }}
  >
    <Box sx={{ 
      fontSize: '2rem',
      color: '#333',
      mb: 1
    }}>
      {icon}
    </Box>
    <Typography 
      sx={{ 
        fontSize: '0.9rem',
        color: '#333',
        textAlign: 'center'
      }}
    >
      {title}
    </Typography>
  </Box>
);

export default CategoryCard;