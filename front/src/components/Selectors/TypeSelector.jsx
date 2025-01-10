import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';

const TypeSelector = () => {
  const [selectedType, setSelectedType] = useState('');

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <ThemeSelector label="Type de véhicule" value={selectedType} onChange={handleChange}>
      <MenuItem value="Touristique">Touristique</MenuItem>
      <MenuItem value="Camion">Camion</MenuItem>
    </ThemeSelector>
  );
};

export default TypeSelector;
