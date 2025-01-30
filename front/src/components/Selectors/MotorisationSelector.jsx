import React, { useState, useEffect } from "react";
import ThemeSelector from "./ThemeSelector";
import { MenuItem } from "@mui/material";
import { getMotorisationsByModele } from "../../api/motorisationApi";

const MotorisationSelector = ({ modeleId, motorisationId, setMotorisationId, setMotorisationNom, onMotorisationChange }) => {
  const [motorisations, setMotorisations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!modeleId) {
      setMotorisations([]);
      return;
    }

    const fetchMotorisations = async () => {
      setLoading(true);
      try {
        const motorisationsData = await getMotorisationsByModele(modeleId);
        setMotorisations(Array.isArray(motorisationsData) ? motorisationsData : []);
        setError(null);
      } catch (error) {
        console.error("Erreur lors de la récupération des motorisations :", error);
        setError("Impossible de charger les motorisations");
        setMotorisations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorisations();
  }, [modeleId]);

  if (error) {
    return <div style={{ color: 'red' }}>Erreur : {error}</div>;
  }

  return (
    <ThemeSelector
      label="Motorisation"
      value={motorisationId}
      onChange={(e) => {
        const selectedMotorisation = motorisations.find(m => m.id_motorisation === e.target.value);
        const id = selectedMotorisation?.id_motorisation || '';
        const nom = selectedMotorisation?.type_motorisation || '';

        setMotorisationId(id);
        setMotorisationNom(nom);

        if (onMotorisationChange) {
          onMotorisationChange({ id, nom });
        }
      }}
    >
      {loading ? (
        <MenuItem disabled>Chargement...</MenuItem>
      ) : motorisations.length > 0 ? (
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
