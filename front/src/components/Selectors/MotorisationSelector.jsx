import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';

const MotorisationSelector = () => {
  const [selectedMotorisation, setSelectedMotorisation] = useState('');

  const handleChange = (event) => {
    setSelectedMotorisation(event.target.value);
  };

  return (
    <ThemeSelector label="Type de motorisation" value={selectedMotorisation} onChange={handleChange}>
      <MenuItem value="Essence">Essence</MenuItem>
      <MenuItem value="Diesel">Diesel</MenuItem>
      <MenuItem value="Électrique">Électrique</MenuItem>
    </ThemeSelector>
  );
};

export default MotorisationSelector;
