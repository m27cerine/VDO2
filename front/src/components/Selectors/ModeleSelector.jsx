import React, { useState, useEffect } from 'react';
import { MenuItem } from '@mui/material';
import ThemeSelector from './ThemeSelector'; 
import { getModelesByTypeAndMarque } from '../../api/modeleApi';

const ModeleSelector = ({ typeId, marqueId, onModeleChange, setModeleNom, setModeleId, modeleId }) => {
  const [modeles, setModeles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModeles = async () => {
      if (typeId && marqueId) {
        try {
          const modelesData = await getModelesByTypeAndMarque(typeId, marqueId);
          setModeles(modelesData || []);
        } catch (error) {
          console.error('Erreur lors de la récupération des modèles:', error);
          setError('Impossible de charger les modèles');
          setModeles([]);
        }
      } else {
        setModeles([]);
        // Réinitialiser la sélection quand typeId ou marqueId change
        if (setModeleId) {
          setModeleId('');
        }
        if (setModeleNom) {
          setModeleNom('');
        }
      }
    };

    fetchModeles();
  }, [typeId, marqueId, setModeleId, setModeleNom]);

  // Gérer le cas d'erreur
  if (error) {
    return <ThemeSelector 
      label="Modèle" 
      value=""
      error={true}
      helperText={error}
      disabled
    />;
  }

  return (
    <ThemeSelector 
      label="Modèle" 
      value={modeleId || ''}
      onChange={(e) => {
        const selectedModele = modeles.find(m => m.id_modele === e.target.value);
        const id = selectedModele?.id_modele || '';
        const nom = selectedModele?.nom_modele || '';

        if (setModeleId) {
          setModeleId(id);
        }
        if (setModeleNom) {
          setModeleNom(nom);
        }

        if (onModeleChange) {
          onModeleChange({ id, nom });
        }
      }}
      disabled={!typeId || !marqueId || modeles.length === 0}
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