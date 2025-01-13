import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { 
  DirectionsCar,
  BatteryChargingFull, 
  Build,
  Engineering,
  DirectionsCarFilled,
  Bolt
} from '@mui/icons-material';

const categories = [
  { 
    id: 1,
    icon: <DirectionsCar sx={{ fontSize: 40 }} />, 
    title: 'Moteur' 
  },
  { 
    id: 2,
    icon: <BatteryChargingFull sx={{ fontSize: 40 }} />, 
    title: 'Energie' 
  },
  { 
    id: 3,
    icon: <Build sx={{ fontSize: 40 }} />, 
    title: 'Pièces' 
  },
  { 
    id: 4,
    icon: <Engineering sx={{ fontSize: 40 }} />, 
    title: 'Mécanique' 
  },
  { 
    id: 5,
    icon: <DirectionsCarFilled sx={{ fontSize: 40 }} />, 
    title: 'Carrosserie' 
  },
  { 
    id: 6,
    icon: <Bolt sx={{ fontSize: 40 }} />, 
    title: 'Electricité' 
  }
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/categorie/${categoryId}`);
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Catégories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={2} key={category.id} 
            onClick={() => handleCategoryClick(category.id)}
          >
            <CategoryCard 
              icon={category.icon} 
              title={category.title} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryGrid;