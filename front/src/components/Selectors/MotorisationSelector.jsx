import React, { useState, useEffect } from "react";
import ThemeSelector from "./ThemeSelector";
import { MenuItem } from "@mui/material";
import { getMotorisationsByModele } from "../../api/motorisationApi";

const MotorisationSelector = ({ modeleId, onMotorisationChange, motorisationId }) => {
  const [motorisations, setMotorisations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!modeleId) {
      setMotorisations([]); 
      return;
    }

    const fetchMotorisations = async () => {
      try {
        const motorisationsData = await getMotorisationsByModele(modeleId);
        setMotorisations(motorisationsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des motorisations :", error);
        setError("Impossible de charger les motorisations");
      }
    };

    fetchMotorisations();
  }, [modeleId]);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

return (
    <ThemeSelector
      label="Motorisation"
      value={motorisationId}
      onChange={(e) => onMotorisationChange(e.target.value)}
    >
      {motorisations.length > 0 ? (
        motorisations.map((motorisation) => (
          <MenuItem key={motorisation.id_motorisation} value={motorisation.id_motorisation}>
            {motorisation.type_motorisation}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>Aucune motorisation disponible</MenuItem>
      )}
    </ThemeSelector>
  );

};

export default MotorisationSelector;
