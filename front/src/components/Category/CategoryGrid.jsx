import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
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

const CategoryGrid = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleInfo = location.state || {};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategoriesFn();
        setCategories(categoryData);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        setError("Impossible de charger les catégories");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Si onCategoryClick est fourni, l'utiliser
    if (onCategoryClick) {
      onCategoryClick(categoryId);
      return;
    }

    // Sinon, effectuer la navigation par défaut avec les informations du véhicule
    navigate(`/SousCategorie/categorie/${categoryId}`, {
      state: {
        ...vehicleInfo,
        categoryId
      }
    });
  };

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Erreur : {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Catégories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid 
            item 
            xs={6} 
            sm={4} 
            md={2} 
            key={category.id_categorie}
            onClick={() => handleCategoryClick(category.id_categorie)}
          >
            <CategoryCard 
              icon={iconMap[category.icone] || <Build sx={{ fontSize: 40 }} />}
              title={category.nom_categorie}
              onClick={() => handleCategoryClick(category.id_categorie)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryGrid;