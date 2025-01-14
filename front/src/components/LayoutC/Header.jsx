import React from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => { 
   const navigate = useNavigate();
  return (
    <header >
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
      }}>

        {/* Logo à gauche */}
        <Box sx={{ flexShrink: 0 }}>
          <img 
            src="src/static/exemple-Logo.png" 
            alt="Company Logo" 
            style={{ height: '90px' }} 
          />
        </Box>

        {/* Navigation et icônes à droite */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          marginLeft: 'auto'
        }}>

          {/* Navigation buttons */}
          <Box sx={{ 
            backgroundColor: 'black',
            borderRadius: 15,
            display: 'flex',
            alignItems: 'center',
            padding: '7px 20px'
          }}>
             <Button
                variant="text"
                sx={{ color: 'white' }}
                onClick={() => navigate('/acceuil')} // Redirection vers la page Acceuil
              >
                Acceuil
              </Button>
              <Button
                variant="text"
                sx={{ color: 'white' }}
                onClick={() => navigate('/Offres')} // Redirection vers la page Acceuil
              >
                Offres specialies 
              </Button>
            <Button variant="text" sx={{ color: 'white' }}>A Propos</Button>
            <Button variant="text" sx={{ color: 'white' }}>Contact</Button>
          </Box>

          {/* Icons */}
          <Box sx={{ 
            display: 'flex',
            gap: 2,
          }}>
            <IconButton 
              sx={{ 
                color: 'white',
                backgroundColor: 'black',
                borderRadius: 10,
                padding: '15px',
                '&:hover': { backgroundColor: '#333' }
              }}
            >
              <Person />
            </IconButton>
            <IconButton
              onClick={() => navigate('/Panier')} // Redirection vers la page Panier
              sx={{
                color: 'white',
                backgroundColor: 'black',
                borderRadius: 10,
                padding: '15px',
                '&:hover': { backgroundColor: '#333' },
              }}
            >
              <ShoppingCart />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default Header;