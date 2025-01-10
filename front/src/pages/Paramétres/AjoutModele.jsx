import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';

const AjoutModele = ({ open, handleClose, handleSave, marques, types }) => {
  const [modele, setModele] = useState({
    nom: '',
    idMarque: '',
    idType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(modele);
    setModele({ nom: '', idMarque: '', idType: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2f3542', color: '#ffcc00' }}>
        Ajouter un modèle de véhicule
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Nom du modèle"
              value={modele.nom}
              onChange={(e) => setModele({ ...modele, nom: e.target.value })}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Marque</InputLabel>
              <Select
                value={modele.idMarque}
                onChange={(e) => setModele({ ...modele, idMarque: e.target.value })}
                label="Marque"
                required
              >
                {marques.map((marque) => (
                  <MenuItem key={marque.ID_Marque} value={marque.ID_Marque}>
                    {marque.NomMarque}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={modele.idType}
                onChange={(e) => setModele({ ...modele, idType: e.target.value })}
                label="Type"
                required
              >
                {types.map((type) => (
                  <MenuItem key={type.ID_Type} value={type.ID_Type}>
                    {type.NomType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #ffcc00, #ffbb33)',
              color: '#000',
              '&:hover': {
                background: 'linear-gradient(45deg, #ffbb33, #ffcc00)',
              },
            }}
          >
            Sauvegarder
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AjoutModele;
