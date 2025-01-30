import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';
import { getAllMarquesFn } from '../../api/marqueApi';

const MarqueSelector = ({ marqueId, setMarqueId, setMarqueNom, onMarqueChange }) => {
  const [marques, setMarques] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarques = async () => {
      try {
        const marquesData = await getAllMarquesFn();
        setMarques(Array.isArray(marquesData) ? marquesData : []);
      } catch (error) {
        console.error('Erreur lors de la récupération des marques:', error);
        setError('Impossible de charger les marques');
      }
    };

    fetchMarques();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Erreur: {error}</div>;
  }

  return (
    <ThemeSelector 
      label="Marque du véhicule" 
      value={marqueId} 
      onChange={(e) => {
        const selectedMarque = marques.find(m => m.id_marque === e.target.value);
        const id = selectedMarque?.id_marque || '';
        const nom = selectedMarque?.nom_marque || '';

        setMarqueId(id);
        setMarqueNom(nom);

        if (onMarqueChange) {
          onMarqueChange({ id, nom });
        }
      }}
    >
      {marques.map((marque) => (
        <MenuItem key={marque.id_marque} value={marque.id_marque}>
          {marque.nom_marque}
        </MenuItem>
      ))}
    </ThemeSelector>
  );
};

export default MarqueSelector;
