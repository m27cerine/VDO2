import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import NewsCard from './NewsCard';
import photo from '../../static/backgroundLogin.png';
const NewsGrid = () => {
  const newsArticles = [
    {
      id: 1,
      image: photo,
      title: 'Top five moto events not to miss in 2024',
      description: 'Découvrez les meilleurs événements de moto à ne pas manquer en 2024. Que vous soyez passionné ou curieux, voici un guide complet pour vous.',
    },
    {
      id: 2,
      image: photo,
      title: 'Les nouveautés Mercedes 2024',
      description: 'Découvrez les dernières innovations et modèles proposés par Mercedes pour l’année 2024.',
    },
    {
      id: 3,
      image: photo,
      title: 'Guide d\'entretien de votre compteur',
      description: 'Un guide essentiel pour maintenir votre compteur en parfait état. Suivez ces étapes simples pour prolonger sa durée de vie.',
    },
    {
      id: 4,
      image: photo,
      title: 'Nouvelles normes d\'émissions 2024',
      description: 'Tout ce que vous devez savoir sur les nouvelles réglementations concernant les émissions pour 2024.',
    },
  ];

  return (
    <Box sx={{ my: 4 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Les dernières nouvelles
      </Typography>
      <Grid container spacing={3}>
        {newsArticles.map((article) => (
          <Grid item xs={12} sm={6} md={3} key={article.id}>
            <NewsCard {...article} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsGrid;
