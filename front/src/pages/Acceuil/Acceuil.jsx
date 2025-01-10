// src/pages/Acceuil/Acceuil.jsx
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Acceuil() {
  const navigate = useNavigate();

  // Fonction de redirection vers le tableau de bord
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h3" gutterBottom>
          Bienvenue sur notre site de vente de pièces détachées
        </Typography>
        <Typography variant="h5" gutterBottom>
          Trouvez les pièces dont vous avez besoin pour votre véhicule facilement et rapidement !
        </Typography>
        
        <Box sx={{ marginTop: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={goToDashboard}
          >
            Accéder au tableau de bord
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Acceuil;
