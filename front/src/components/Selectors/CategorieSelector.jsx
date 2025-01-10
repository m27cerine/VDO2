import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';

const CategorieSelector = () => {
  const [selectedCategorie, setSelectedCategorie] = useState('');

  const handleChange = (event) => {
    setSelectedCategorie(event.target.value);
  };

  return (
    <ThemeSelector label="Catégorie de pièce" value={selectedCategorie} onChange={handleChange}>
      <MenuItem value="Freinage">Freinage</MenuItem>
      <MenuItem value="Suspension">Suspension</MenuItem>
    </ThemeSelector>
  );
};

export default CategorieSelector;
