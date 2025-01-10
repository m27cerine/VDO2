import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';

const AjoutMarque = ({ open, handleClose, handleSave }) => {
  const [marque, setMarque] = useState({
    nom: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(marque);
    setMarque({ nom: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2f3542', color: '#ffcc00' }}>
        Ajouter une marque de véhicule
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Nom de la marque"
              value={marque.nom}
              onChange={(e) => setMarque({ ...marque, nom: e.target.value })}
              required
              fullWidth
            />
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

export default AjoutMarque;
