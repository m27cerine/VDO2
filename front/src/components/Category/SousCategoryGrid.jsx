import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';
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
const SousCategorieGrid = ({ sousCategories, onSousCategorieClick, vehicleInfo }) => {
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
            onClick={() => onSousCategorieClick(sousCategorie.id_sous_categorie, vehicleInfo)}
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
