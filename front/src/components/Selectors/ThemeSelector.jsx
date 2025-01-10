import React from 'react';
import { Paper, Typography, Select, MenuItem, InputLabel, FormControl, styled } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '6px', 
 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',   
  '&:hover': {
    transform: 'translateY(-4px)',  
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.12)',  
  },
  [theme.breakpoints.down('sm')]: {
    padding: '4px', 
  },
}));

const SelectLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.9rem',  
  color: '#333',
  marginBottom: '6px', 
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem', 
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FFA502',  // Bordure orange
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF6B35',  // Changement de couleur au survol
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF6B35',  // Bordure active avec couleur différente
  },
  fontSize: '0.85rem',  // Réduction de la taille du texte du select
  height: '35px',  // Réduction de la hauteur du sélecteur
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',  // Pour les écrans plus petits
    height: '30px',  // Ajustement de la hauteur pour les petits écrans
  },
}));

const ThemeSelector = ({ label, value, onChange, children }) => (
  <StyledPaper>
    <SelectLabel variant="body1">{label}</SelectLabel>
    <FormControl fullWidth variant="outlined">
      <StyledSelect value={value} onChange={onChange} label={`Choisir ${label}`}>
        <MenuItem value="">
          <em>Sélectionnez {label}</em>
        </MenuItem>
        {children}
      </StyledSelect>
    </FormControl>
  </StyledPaper>
);

export default ThemeSelector;
