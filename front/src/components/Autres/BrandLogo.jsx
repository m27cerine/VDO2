import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { getAllMarquesFn } from '../../api/marqueApi';

const BrandLogos = () => {
  const [marques, setMarques] = useState([]);  // Stocker les marques
  const [error, setError] = useState(null);  // Gérer les erreurs

  // Récupérer les marques depuis l'API
  useEffect(() => {
    const fetchMarques = async () => {
      try {
        const marqueData = await getAllMarquesFn();  // Appel API pour récupérer les marques
        setMarques(marqueData);  // Mettre à jour l'état avec les données des marques
      } catch (error) {
        console.error("Erreur lors de la récupération des marques:", error);
        setError("Impossible de charger les logos des marques");
      }
    };

    fetchMarques();  // Appel initial pour récupérer les marques
  }, []);  // Le tableau vide [] garantit que l'effet ne se déclenche qu'une fois

  if (error) {
    return <div>{error}</div>;  // Afficher l'erreur si il y en a
  }

  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={2}>
        {marques.map((marque) => (
          <Grid item xs={6} sm={4} md={2} lg={1} key={marque.id_marque}>
            <Box
              sx={{
                bgcolor: 'white',
                p: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
              }}
            >
              <Box
                component="img"
                src={marque.logo_marque}  // Utiliser le logo de la marque
                alt={marque.nom_marque}
                sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BrandLogos;
