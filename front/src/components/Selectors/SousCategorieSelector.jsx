import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';

const SousCategorieSelector = () => {
  const [selectedSousCategorie, setSelectedSousCategorie] = useState('');

  const handleChange = (event) => {
    setSelectedSousCategorie(event.target.value);
  };

  return (
    <ThemeSelector label="Sous-catégorie de pièce" value={selectedSousCategorie} onChange={handleChange}>
      <MenuItem value="Disque de frein">Disque de frein</MenuItem>
      <MenuItem value="Amortisseur">Amortisseur</MenuItem>
    </ThemeSelector>
  );
};

export default SousCategorieSelector;
