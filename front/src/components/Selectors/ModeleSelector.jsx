import React, { useState, useEffect } from 'react';
import { MenuItem } from '@mui/material';
import ThemeSelector from './ThemeSelector'; 
import { getModelesByTypeAndMarque } from '../../api/modeleApi';

const ModeleSelector = ({ typeId, marqueId, onModeleChange, modeleId }) => {
  const [modeles, setModeles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModeles = async () => {
      if (typeId && marqueId) {
        try {
          const modelesData = await getModelesByTypeAndMarque(typeId, marqueId);
          setModeles(modelesData);
        } catch (error) {
          console.error('Erreur lors de la récupération des modèles:', error);
          setError('Impossible de charger les modèles');
        }
      } else {
        setModeles([]); // Réinitialiser si aucun type ou marque n'est sélectionné
      }
    };

    fetchModeles();
  }, [typeId, marqueId]);

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <ThemeSelector 
      label="Modèle" 
      value={modeleId} 
      onChange={(e) => onModeleChange(e.target.value)}
    >
      {modeles.map((modele) => (
        <MenuItem 
          key={modele.id_modele} 
          value={modele.id_modele}
        >
          {modele.nom_modele}
        </MenuItem>
      ))}
    </ThemeSelector>
  );
};

export default ModeleSelector;
