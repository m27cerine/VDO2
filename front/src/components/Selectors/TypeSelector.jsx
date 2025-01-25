import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';
import { getAllTypesFn } from '../../api/typeApi';

const TypeSelector = ({ typeId, onTypeChange }) => {
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typesData = await getAllTypesFn();
        const typesArray = Array.isArray(typesData) ? typesData : [];
        setTypes(typesArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des types:', error);
        setError('Impossible de charger les types');
      }
    };

    fetchTypes();
  }, []);

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <ThemeSelector 
      label="Type de véhicule" 
      value={typeId} 
      onChange={(e) => onTypeChange(e.target.value)}
    >
      {types.map((type) => (
        <MenuItem 
          key={type.id_type} 
          value={type.id_type}
        >
          {type.nom_type}
        </MenuItem>
      ))}
    </ThemeSelector>
  );
};


export default TypeSelector;
