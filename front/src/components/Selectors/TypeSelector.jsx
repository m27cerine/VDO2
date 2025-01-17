// TypeSelector.jsx
import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';
import { getAllTypesFn } from '../../api/typeApi';

const TypeSelector = () => {
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typesData = await getAllTypesFn();
        console.log("Fetched types:", typesData);
        setTypes(typesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des types :', error);
      }
    };
  
    fetchTypes();
  }, []);
  
  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <ThemeSelector label="Type de véhicule" value={selectedType} onChange={handleChange}>
      {types.map((type) => (
        <MenuItem key={type.id_Type} value={type.nomType}>
          {type.nomType}
        </MenuItem>
      ))}
    </ThemeSelector>
  );
};

export default TypeSelector;