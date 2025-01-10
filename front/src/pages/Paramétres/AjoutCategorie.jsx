import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from '@mui/material';

const AjoutCategorie = ({ open, handleClose, handleSave }) => {
  const motorisations = [
    { id: 1, nom: 'Essence' },
    { id: 2, nom: 'Diesel' },
    { id: 3, nom: 'Electrique' },
    { id: 4, nom: 'Hybride' },
  ];

  const [categorie, setCategorie] = useState({
    nom: '',
    motorisations: [] // Liste des motorisations associées à la catégorie
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(categorie);
    setCategorie({ nom: '', motorisations: [] });
  };

  const handleMotorisationChange = (event) => {
    const value = event.target.value;
    setCategorie({
      ...categorie,
      motorisations: typeof value === 'string' ? value.split(',') : value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2f3542', color: '#ffcc00' }}>
        Ajouter une catégorie
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Nom de la catégorie"
              value={categorie.nom}
              onChange={(e) => setCategorie({ ...categorie, nom: e.target.value })}
              required
              fullWidth
            />

            <FormControl fullWidth required>
              <InputLabel>Motorisations associées</InputLabel>
              <Select
                multiple
                value={categorie.motorisations}
                onChange={handleMotorisationChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {motorisations.map((motorisation) => (
                  <MenuItem key={motorisation.id} value={motorisation.id}>
                    <Checkbox checked={categorie.motorisations.indexOf(motorisation.id) > -1} />
                    <ListItemText primary={motorisation.nom} />
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

export default AjoutCategorie;
