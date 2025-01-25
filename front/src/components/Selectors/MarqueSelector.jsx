import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';
import { getAllMarquesFn } from '../../api/marqueApi';

const MarqueSelector = ({ marqueId, onMarqueChange }) => {
  const [marques, setMarques] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarques = async () => {
      try {
        const marquesData = await getAllMarquesFn();
        const marquesArray = Array.isArray(marquesData) ? marquesData : [];
        setMarques(marquesArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des marques:', error);
        setError('Impossible de charger les marques');
      }
    };

    fetchMarques();
  }, []);

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <ThemeSelector 
      label="Marque" 
      value={marqueId} 
      onChange={(e) => onMarqueChange(e.target.value)}
    >
      {marques.map((marque) => (
        <MenuItem 
          key={marque.id_marque} 
          value={marque.id_marque}
        >
          {marque.nom_marque}
        </MenuItem>
      ))}
    </ThemeSelector>
  );
};


export default MarqueSelector;
