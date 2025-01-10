import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ title, products = [] }) => {
  // Ajouter des produits d'exemple si `products` est vide
  if (products.length === 0) {
    products = [
      {
        id: 1,
        name: 'Produit 1',
        price: 1500,
        oldPrice: 2000,
        image: 'https://via.placeholder.com/200',
        timeLeft: '1h 30m',
      },
      {
        id: 2,
        name: 'Produit 2',
        price: 1200,
        oldPrice: 1600,
        image: 'https://via.placeholder.com/200',
        timeLeft: '2h 15m',
      },
      {
        id: 3,
        name: 'Produit 3',
        price: 800,
        image: 'https://via.placeholder.com/200',
      },
      {
        id: 4,
        name: 'Produit 4',
        price: 2200,
        oldPrice: 2500,
        image: 'https://via.placeholder.com/200',
        timeLeft: '3h 00m',
      },
    ];
  }

  return (
    <Box sx={{ my: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" sx={{ padding: '6px' }}>←</Button>
          <Button variant="outlined" sx={{ padding: '6px' }}>→</Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
