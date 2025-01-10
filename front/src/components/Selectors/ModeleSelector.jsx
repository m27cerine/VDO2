import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';

const ModeleSelector = () => {
  const [selectedModele, setSelectedModele] = useState('');

  const handleChange = (event) => {
    setSelectedModele(event.target.value);
  };

  return (
    <ThemeSelector label="Modèle de véhicule" value={selectedModele} onChange={handleChange}>
      <MenuItem value="Corolla">Corolla</MenuItem>
      <MenuItem value="Civic">Civic</MenuItem>
    </ThemeSelector>
  );
};

export default ModeleSelector;
