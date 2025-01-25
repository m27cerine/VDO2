import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { getAllCategoriesFn } from '../../api/categorieApi'; 

import { 
  DirectionsCar, 
  BatteryChargingFull, 
  Build, 
  Engineering, 
  DirectionsCarFilled, 
  Bolt 
} from '@mui/icons-material';

const iconMap = {
  DirectionsCar: <DirectionsCar sx={{ fontSize: 40 }} />,
  BatteryChargingFull: <BatteryChargingFull sx={{ fontSize: 40 }} />,
  Build: <Build sx={{ fontSize: 40 }} />,
  Engineering: <Engineering sx={{ fontSize: 40 }} />,
  DirectionsCarFilled: <DirectionsCarFilled sx={{ fontSize: 40 }} />,
  Bolt: <Bolt sx={{ fontSize: 40 }} />
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategoriesFn();
        console.log("Données des catégories reçues:", categoryData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        setError("Impossible de charger les catégories");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/categorie/${categoryId}`);
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Catégories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => {
          console.log("Catégorie:", category);  
          if (category.id_categorie && category.nom_categorie && category.icone) {
            return (
              <Grid item xs={6} sm={4} md={2} key={category.id_categorie} 
                onClick={() => handleCategoryClick(category.id_categorie)}
              >
                <CategoryCard 
                  icon={iconMap[category.icone]}  
                  title={category.nom_categorie} 
                />
              </Grid>
            );
          } else {
            console.warn("Données manquantes pour la catégorie:", category);
            return null;
          }
        })}
      </Grid>
    </Box>
  );
};

export default CategoryGrid;
