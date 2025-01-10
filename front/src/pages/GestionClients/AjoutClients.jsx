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
  Grid,
  Checkbox,
  ListItemText
} from '@mui/material';

const AjoutClients = ({ open, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    nomAcheteur: '',
    adresseAcheteur: '',
    email: '',
    telephone: '',
    numeroRegistreCommerce: '',
    numeroIdentificationFiscale: '',
    articleImposition: '',
    secteurActivite: '',
    typeRevendeur: '',
    motDePasse: '',
    typeClient: '', // 'Entreprise', 'Revendeur' ou 'Normal'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newClient = {
      idClient: Date.now(), // Identifiant unique basé sur le timestamp
      ...formData,
      secteurActivite: formData.typeClient === 'Entreprise' ? formData.secteurActivite : undefined,
      typeRevendeur: formData.typeClient === 'Revendeur' ? formData.typeRevendeur : undefined,
    };

    handleSave(newClient);
    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setFormData({
      nomAcheteur: '',
      adresseAcheteur: '',
      email: '',
      telephone: '',
      numeroRegistreCommerce: '',
      numeroIdentificationFiscale: '',
      articleImposition: '',
      secteurActivite: '',
      typeRevendeur: '',
      motDePasse: '',
      typeClient: '',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2f3542', color: '#ffcc00' }}>
        Ajouter un Client
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="nomAcheteur"
              label="Nom du Client"
              fullWidth
              variant="outlined"
              value={formData.nomAcheteur}
              onChange={handleChange}
              required
            />
            <TextField
              name="adresseAcheteur"
              label="Adresse"
              fullWidth
              variant="outlined"
              value={formData.adresseAcheteur}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="telephone"
              label="Téléphone"
              type="tel"
              fullWidth
              variant="outlined"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="numeroRegistreCommerce"
                  label="Numéro Registre Commerce"
                  fullWidth
                  variant="outlined"
                  value={formData.numeroRegistreCommerce}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="numeroIdentificationFiscale"
                  label="Numéro Identification Fiscale"
                  fullWidth
                  variant="outlined"
                  value={formData.numeroIdentificationFiscale}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <TextField
              name="articleImposition"
              label="Article d'Imposition"
              fullWidth
              variant="outlined"
              value={formData.articleImposition}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Type de Client</InputLabel>
              <Select
                name="typeClient"
                value={formData.typeClient}
                onChange={handleChange}
                label="Type de Client"
              >
                <MenuItem value="Entreprise">Entreprise</MenuItem>
                <MenuItem value="Revendeur">Revendeur</MenuItem>
                <MenuItem value="Normal">Client Normal</MenuItem>
              </Select>
            </FormControl>
            {formData.typeClient === 'Entreprise' && (
              <TextField
                name="secteurActivite"
                label="Secteur d'Activité"
                fullWidth
                variant="outlined"
                value={formData.secteurActivite}
                onChange={handleChange}
              />
            )}
            {formData.typeClient === 'Revendeur' && (
              <TextField
                name="typeRevendeur"
                label="Type de Revendeur"
                fullWidth
                variant="outlined"
                value={formData.typeRevendeur}
                onChange={handleChange}
              />
            )}
            <TextField
              name="motDePasse"
              label="Mot de Passe"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.motDePasse}
              onChange={handleChange}
              required
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
            Ajouter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AjoutClients;
