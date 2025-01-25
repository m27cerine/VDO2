import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';
import { getAllMarquesFn } from '../../api/marqueApi';

const MarqueSelector = () => {
  const [selectedMarque, setSelectedMarque] = useState('');
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

  const handleChange = (event) => {
    setSelectedMarque(event.target.value);
  };

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <ThemeSelector 
      label="Marque de véhicule" 
      value={selectedMarque} 
      onChange={handleChange}
    >
      {marques.map((marque) => (
        <MenuItem 
          key={marque.id_marque } 
          value={marque.nom_marque }
        >
          {marque.nom_marque }
        </MenuItem>
      ))}
    </ThemeSelector>
  );
};

export default MarqueSelector;