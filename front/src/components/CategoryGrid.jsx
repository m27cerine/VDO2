import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';

const categories = [
  { 
    id: 1,
    icon: "Moteur",
    name: "Moteur"
  },
  {
    id: 2,
    icon: "Energie",
    name: "Energie"
  },
  {
    id: 3,
    icon: "Pièces",
    name: "Pièces"
  },
  {
    id: 4,
    icon: "Mécanique",
    name: "Mécanique"
  },
  {
    id: 5,
    icon: "Carrosserie",
    name: "Carrosserie"
  },
  {
    id: 6,
    icon: "Electricité",
    name: "Electricité"
  }
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/categorie/${categoryId}`);
  };

  return (
    <Grid container spacing={3} sx={{ my: 0 }}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={category.id}>
          <CategoryCard
            {...category}
            onClick={() => handleCategoryClick(category.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
