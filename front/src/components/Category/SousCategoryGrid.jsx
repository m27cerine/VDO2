import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { getSousCategorieByCategorie } from '../../api/souscategorieApi';
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

const SousCategorieGrid = () => {
  const [sousCategories, setSousCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchSousCategories = async () => {
      try {
        const sousCategoriesData = await getSousCategorieByCategorie(categoryId);
        setSousCategories(sousCategoriesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des sous-catégories :", error);
        setError("Impossible de charger les sous-catégories");
      }
    };

    if (categoryId) {
      fetchSousCategories();
    }
  }, [categoryId]);

  const handleSousCategorieClick = (sousCategorieId) => {
    navigate(`/pieces`, {
      state: {
        categoryId,
        sousCategorieId
      }
    });
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Sous-catégories
      </Typography>
      <Grid container spacing={2}>
        {sousCategories.map((sousCategorie) => (
          <Grid 
            item 
            xs={6} 
            sm={4} 
            md={2} 
            key={sousCategorie.id_sous_categorie}
            onClick={() => handleSousCategorieClick(sousCategorie.id_sous_categorie)}
          >
            <CategoryCard 
              icon={iconMap[sousCategorie.icone] || <Build sx={{ fontSize: 40 }} />} 
              title={sousCategorie.nom_sous_categorie}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SousCategorieGrid;
