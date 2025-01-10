import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';

const MarqueSelector = () => {
  const [selectedMarque, setSelectedMarque] = useState('');

  const handleChange = (event) => {
    setSelectedMarque(event.target.value);
  };

  return (
    <ThemeSelector label="Marque du véhicule" value={selectedMarque} onChange={handleChange}>
      <MenuItem value="Toyota">Toyota</MenuItem>
      <MenuItem value="Honda">Honda</MenuItem>
    </ThemeSelector>
  );
};

export default MarqueSelector;
