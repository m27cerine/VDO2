import React from "react";
import { 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Typography,
  Divider,
  Paper
} from "@mui/material";

const SidebarFilters = ({
  types,
  marques,
  modeles,
  motorisations,
  selectedType,
  selectedMarque,
  selectedModele,
  selectedMotorisation,
  onTypeSelect,
  onMarqueSelect,
  onModeleSelect,
  onMotorisationSelect
}) => {
  const highlightStyle = { 
    bgcolor: '#fabd15', 
    borderRadius: '4px',
    '&:hover': { bgcolor: '#f8d27a' }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      {/* Catégories */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
        Catégories
      </Typography>
      <List dense>
        {types.map((type) => (
          <ListItem 
            key={type.id_type}
            button
            onClick={() => onTypeSelect(type.id_type)}
            sx={selectedType === type.id_type ? highlightStyle : {}}
          >
            <ListItemText 
              primary={`- ${type.nom_type}`} 
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Marques */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
        Marques
      </Typography>
      <List dense>
        {marques.map((marque) => (
          <ListItem 
            key={marque.id_marque}
            button
            onClick={() => onMarqueSelect(marque.id_marque)}
            sx={selectedMarque === marque.id_marque ? highlightStyle : {}}
          >
            <ListItemText 
              primary={`- ${marque.nom_marque}`} 
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Modèles */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
        Modèles
      </Typography>
      <List dense>
        {modeles.map((modele) => (
          <ListItem 
            key={modele.id_modele}
            button
            onClick={() => onModeleSelect(modele.id_modele)}
            sx={selectedModele === modele.id_modele ? highlightStyle : {}}
          >
            <ListItemText 
              primary={`- ${modele.nom_modele}`} 
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Motorisations */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
        Motorisations
      </Typography>
      <List dense>
        {motorisations.map((motorisation) => (
          <ListItem 
            key={motorisation.id_motorisation}
            button
            onClick={() => onMotorisationSelect(motorisation.id_motorisation)}
            sx={selectedMotorisation === motorisation.id_motorisation ? highlightStyle : {}}
          >
            <ListItemText 
              primary={`- ${motorisation.type_motorisation}`} 
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SidebarFilters;