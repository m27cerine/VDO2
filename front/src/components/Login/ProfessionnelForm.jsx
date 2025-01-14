import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { StyledTextField } from './StyledComponents';
import { Delete as DeleteIcon } from '@mui/icons-material';


const ProfessionnelForm = () => {
  const [horaires, setHoraires] = useState([{ jour: '', ouverture: '', fermeture: '' }]);

  const handleAddHoraire = () => {
    setHoraires([...horaires, { jour: '', ouverture: '', fermeture: '' }]);
  };

  const handleHoraireChange = (index, field, value) => {
    const updatedHoraires = [...horaires];
    updatedHoraires[index][field] = value;
    setHoraires(updatedHoraires);
  };

  return (
    <Stack spacing={2}>
      {/* Nom et Prénom */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StyledTextField required placeholder="Nom *" variant="outlined" fullWidth />
        <StyledTextField required placeholder="Prénom *" variant="outlined" fullWidth />
      </Box>

      {/* Nom d'utilisateur et Adresse E-mail */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StyledTextField required placeholder="Nom d'utilisateur *" variant="outlined" fullWidth />
        <StyledTextField required placeholder="Adresse E-mail *" variant="outlined" fullWidth />
      </Box>

      {/* Téléphone */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      <StyledTextField required placeholder="Téléphone *" variant="outlined" fullWidth />

      {/* Inscription dans l'annuaire */}
      <FormControlLabel
        control={<Checkbox />}
        label="M'inscrire dans l'annuaire"
        sx={{ color: 'text.secondary' }}
      />
      </Box>

      {/* Mot de passe et Confirmation */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StyledTextField
          placeholder="Mot de passe *"
          type="password"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          required
          placeholder="Confirmation du mot de passe *"
          type="password"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Métier et Registre de Commerce */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StyledTextField select required placeholder="Métier *" variant="outlined" fullWidth>
          <MenuItem value="metier1">Métier 1</MenuItem>
          <MenuItem value="metier2">Métier 2</MenuItem>
        </StyledTextField>
        <StyledTextField placeholder="N° du registre de commerce" variant="outlined" fullWidth />
      </Box>

      {/* Identification fiscale et Article d'imposition */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StyledTextField placeholder="Numéro d'identification fiscale" variant="outlined" fullWidth />
        <StyledTextField placeholder="Article d'imposition" variant="outlined" fullWidth />
      </Box>

      {/* Wilaya et Commune */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StyledTextField select required placeholder="Wilaya *" variant="outlined" fullWidth>
          <MenuItem value="wilaya1">Wilaya 1</MenuItem>
          <MenuItem value="wilaya2">Wilaya 2</MenuItem>
        </StyledTextField>
        <StyledTextField select required placeholder="Commune *" variant="outlined" fullWidth>
          <MenuItem value="commune1">Commune 1</MenuItem>
          <MenuItem value="commune2">Commune 2</MenuItem>
        </StyledTextField>
      </Box>

      {/* Adresse */}
      <StyledTextField
        placeholder="Adresse"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
      />

      {/* Carte */}
      <Box sx={{ height: 200, bgcolor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>Carte ici (intégrer API Google Maps )</span>
      </Box>

    {/* Horaires d'ouverture */}
      <Typography>Horaires d'ouverture</Typography>
      <Stack spacing={2}>
        {horaires.map((horaire, index) => (
          <Box
            key={index}
            sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 2, alignItems: 'center' }}
          >
            <StyledTextField
              placeholder="Jour"
              value={horaire.jour}
              onChange={(e) => handleHoraireChange(index, 'jour', e.target.value)}
              fullWidth
            />
            <StyledTextField
              placeholder="De --:--"
              value={horaire.ouverture}
              onChange={(e) => handleHoraireChange(index, 'ouverture', e.target.value)}
              fullWidth
            />
            <StyledTextField
              placeholder="À --:--"
              value={horaire.fermeture}
              onChange={(e) => handleHoraireChange(index, 'fermeture', e.target.value)}
              fullWidth
            />
            <IconButton
              onClick={() => setHoraires(horaires.filter((_, i) => i !== index))}
              sx={{ color: 'red' }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
        <Box
          onClick={handleAddHoraire}
          sx={{
            cursor: 'pointer',
            color: 'green',
            textDecoration: 'underline',
            '&:hover': { color: 'darkgreen' },
          }}
        >
          + Ajouter un horaire
        </Box>
      </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
    {/* Case à cocher */}
    <FormControlLabel
      control={<Checkbox />}
      label="J'accepte les termes et conditions d'utilisation de la plateforme"
      sx={{ color: 'text.secondary' }}
    />
      {/* Bouton Confirmer */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#FFD700',
            color: 'black',
            '&:hover': { bgcolor: '#FDB813' },
            borderRadius: '25px',
            textTransform: 'none',
            boxShadow: 7,
            px: 4,
            py: 1,
          }}
        >
          Confirmer
        </Button>
      </Box>
      </Box>
    </Stack>
  );
};

export default ProfessionnelForm;
