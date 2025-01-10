import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Grid
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import CategorieSelector from '../../components/Selectors/CategorieSelector';
import SousCategorieSelector from '../../components/Selectors/SousCategorieSelector';
import MotorisationSelector from '../../components/Selectors/MotorisationSelector';

const AjoutPieces = ({ open, handleClose, handleSave }) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [quantite, setQuantite] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sousCategorie, setSousCategorie] = useState('');
  const [motorisation, setMotorisation] = useState('');
  const [caracteristiques, setCaracteristiques] = useState([]);

  const handleAddCaracteristique = () => {
    setCaracteristiques([...caracteristiques, { nom: '', valeur: '' }]);
  };

  const handleRemoveCaracteristique = (index) => {
    setCaracteristiques(caracteristiques.filter((_, i) => i !== index));
  };

  const handleChangeCaracteristique = (index, field, value) => {
    const updatedCaracteristiques = [...caracteristiques];
    updatedCaracteristiques[index][field] = value;
    setCaracteristiques(updatedCaracteristiques);
  };

  const handleSubmit = () => {
    if (nom && prix && quantite) {
      handleSave({
        nom,
        description,
        prix: parseFloat(prix),
        quantite: parseInt(quantite, 10),
        categorie,
        sousCategorie,
        motorisation,
        caracteristiques,
      });
      handleClose();
      setNom('');
      setDescription('');
      setPrix('');
      setQuantite('');
      setCategorie('');
      setSousCategorie('');
      setMotorisation('');
      setCaracteristiques([]);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2f3542', color: '#ffcc00' }}>
        Ajouter une nouvelle pièce
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nom de la Pièce"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Prix (€)"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quantité en stock"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                type="number"
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <CategorieSelector categorie={categorie} setCategorie={setCategorie} />
          <SousCategorieSelector sousCategorie={sousCategorie} setSousCategorie={setSousCategorie} />
          <MotorisationSelector motorisation={motorisation} setMotorisation={setMotorisation} />

          <Typography variant="h6" sx={{ mt: 2, color: '#2f3542' }}>
            Caractéristiques
          </Typography>
          {caracteristiques.map((caracteristique, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                label="Nom de la caractéristique"
                value={caracteristique.nom}
                onChange={(e) => handleChangeCaracteristique(index, 'nom', e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Valeur"
                value={caracteristique.valeur}
                onChange={(e) => handleChangeCaracteristique(index, 'valeur', e.target.value)}
                fullWidth
                required
              />
              <IconButton onClick={() => handleRemoveCaracteristique(index)} color="error">
                <Remove />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={handleAddCaracteristique}
            startIcon={<Add />}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Ajouter une caractéristique
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #ffcc00, #ffbb33)',
            color: '#000',
            '&:hover': {
              background: 'linear-gradient(45deg, #ffbb33, #ffcc00)',
            },
          }}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AjoutPieces;
