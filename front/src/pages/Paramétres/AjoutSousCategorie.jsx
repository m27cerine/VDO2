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

const AjoutSousCategorie = ({ open, handleClose, handleSave }) => {
  const [sousCategorie, setSousCategorie] = useState({
    nom: '',
    categorie: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(sousCategorie);
    setSousCategorie({ nom: '', categorie: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2f3542', color: '#ffcc00' }}>
        Ajouter une sous-catégorie
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Nom de la sous-catégorie"
              value={sousCategorie.nom}
              onChange={(e) => setSousCategorie({ ...sousCategorie, nom: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Catégorie principale"
              value={sousCategorie.categorie}
              onChange={(e) => setSousCategorie({ ...sousCategorie, categorie: e.target.value })}
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

export default AjoutSousCategorie;
