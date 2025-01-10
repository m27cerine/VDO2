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

const AjoutMotorisation = ({ open, handleClose, handleSave, modeles }) => {
  const [motorisation, setMotorisation] = useState({
    type: '',
    idModele: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(motorisation);
    setMotorisation({ type: '', idModele: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2f3542', color: '#ffcc00' }}>
        Ajouter une motorisation
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Type de motorisation"
              value={motorisation.type}
              onChange={(e) => setMotorisation({ ...motorisation, type: e.target.value })}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Modèle</InputLabel>
              <Select
                value={motorisation.idModele}
                onChange={(e) => setMotorisation({ ...motorisation, idModele: e.target.value })}
                label="Modèle"
                required
              >
                {modeles.map((modele) => (
                  <MenuItem key={modele.ID_Modele} value={modele.ID_Modele}>
                    {modele.NomModele}
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

export default AjoutMotorisation;
