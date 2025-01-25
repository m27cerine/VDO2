import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector'; 
import { MenuItem } from '@mui/material';
import { getAllMotorisationsFn } from '../../api/motorisationApi';

const MotorisationSelector = () => {
  const [selectedMotorisation, setSelectedMotorisation] = useState('');
  const [motorisations, setMotorisations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotorisations = async () => {
      try {
        const motorisationsData = await getAllMotorisationsFn();
        const motorisationsArray = Array.isArray(motorisationsData) ? motorisationsData : [];
        setMotorisations(motorisationsArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des motorisations:', error);
        setError('Impossible de charger les motorisations');
      }
    };

    fetchMotorisations();
  }, []);

  const handleChange = (event) => {
    setSelectedMotorisation(event.target.value);
  };

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <ThemeSelector 
      label="Motorisation de véhicule" 
      value={selectedMotorisation} 
      onChange={handleChange}
    >
      {motorisations.map((motorisation) => (
        <MenuItem 
          key={motorisation.id_motorisation} 
          value={motorisation.type_motorisation} 
        >
          {motorisation.type_motorisation} 
        </MenuItem>
      ))}
    </ThemeSelector>
  );
};

export default MotorisationSelector;
