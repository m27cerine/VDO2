import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import NewsCard from './NewsCard';

const newsArticles = [
  {
    id: 1,
    image: "https://www.automobile-magazine.fr/asset/midResHorizontal/toyota-gr-corolla-circuit-2022-13.jpg",
    title: "Toyota GR Corolla : La compacte sportive qui défie les attentes",
    description: "Découvrez la dernière création de Gazoo Racing, une compacte qui combine puissance et agilité.",
    link: "https://www.automobile-magazine.fr/toyota/gr-corolla-sportive-performance"
  },
  {
    id: 2,
    image: "https://images.caradisiac.com/logos/9/5/5/5/169555/mercedes-classe-e-2023-180-1-1.jpg",
    title: "Mercedes Classe E 2024 : Technologie et élégance",
    description: "Un aperçu complet des innovations technologiques et du design de la nouvelle génération.",
    link: "https://www.caradisiac.com/mercedes-classe-e-2024-nouveautes"
  },
  {
    id: 3,
    image: "https://www.autojournal.fr/wp-content/uploads/autojournal/2023/09/pieces-detachees-automobile.jpg",
    title: "Comment choisir des pièces détachées de qualité",
    description: "Guide pratique pour sélectionner les meilleures pièces de rechange pour votre véhicule.",
    link: "https://www.autojournal.fr/guide-pieces-detachees-qualite"
  },
  {
    id: 4,
    image: "https://www.largus.fr/images/images/emission-co2-voiture.jpg",
    title: "Normes d'émissions 2024 : Ce qui change",
    description: "Décryptage des nouvelles réglementations environnementales pour l'automobile.",
    link: "https://www.largus.fr/actualite-automobile/normes-emissions-2024"
  }
];

const NewsGrid = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Dernières actualités automobiles
      </Typography>
      <Grid container spacing={3}>
        {newsArticles.map((article) => (
          <Grid item xs={12} sm={6} md={3} key={article.id}>
            <NewsCard 
              image={article.image}
              title={article.title}
              description={article.description}
              url={article.link}  // Passer directement le lien comme prop
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsGrid;
