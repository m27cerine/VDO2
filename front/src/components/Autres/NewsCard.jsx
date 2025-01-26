import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const NewsCard = ({ image, title, description, url }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: 2,
      boxShadow: 1,
      overflow: 'hidden',
    }}
  >
    {/* Image */}
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderBottom: '1px solid #e0e0e0',
      }}
    />
    {/* Titre */}
    <Box sx={{ p: 2, flex: 1 }}>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 'bold',
          mb: 1,
          fontSize: '1rem',
        }}
      >
        {title}
      </Typography>
      {/* Description */}
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'text.secondary',
          mb: 2,
          flexGrow: 1,
          fontSize: '0.9rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3, 
        }}
      >
        {description}
      </Typography>
      {/* Lien */}
      <a
        href={url}  // Lien dynamique vers l'article
        target="_blank"  // Ouvrir dans un nouvel onglet
        rel="noopener noreferrer"  // Sécurité supplémentaire
        style={{
          color: '#fabd15',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '0.9rem',
        }}
      >
        Lire l'article
      </a>
    </Box>
  </Box>
);

export default NewsCard;
