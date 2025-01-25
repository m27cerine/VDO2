import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';
import { getAllModelesFn } from '../../api/modeleApi';

const ModeleSelector = () => {
  const [modeles, setModeles] = useState([]);
  const [selectedModele, setSelectedModele] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModeles = async () => {
      try {
        const modelesData = await getAllModelesFn();
        const modelesArray = Array.isArray(modelesData) ? modelesData : [];
        setModeles(modelesArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des modeles:', error);
        setError('Impossible de charger les modeles');
      }
    };

    fetchModeles();
  }, []);

  const handleChange = (event) => {
    setSelectedModele(event.target.value);
  };

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <ThemeSelector 
      label="Modèle de véhicule" 
      value={selectedModele} 
      onChange={handleChange}
    >
      {modeles.map((modele) => (
        <MenuItem 
          key={modele.id_modele} 
          value={modele.nom_modele}
        >
          {modele.nom_modele}
        </MenuItem>
      ))}
    </ThemeSelector>
  );
};

export default ModeleSelector;