import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  InputAdornment,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { StyledTextField } from './StyledComponents';

const ClientForm = () => (
  <Stack spacing={2}>
    {/* Nom et Prénom */}
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      <StyledTextField
        required
        placeholder="Nom *"
        variant="outlined"
        fullWidth
      />
      <StyledTextField
        required
        placeholder="Prénom *"
        variant="outlined"
        fullWidth
      />
    </Box>

    {/* Nom d'utilisateur et Adresse E-mail */}
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      <StyledTextField
        required
        placeholder="Nom d'utilisateur *"
        variant="outlined"
        fullWidth
      />
      <StyledTextField
        required
        placeholder="Adresse E-mail *"
        variant="outlined"
        fullWidth
      />
    </Box>

    {/* Téléphone */}
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
    <StyledTextField
      required
      placeholder="Téléphone *"
      variant="outlined"
      fullWidth
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
        endIcon={<Box component="span">→</Box>}
      >
        Confirmer
      </Button>
    </Box>
  </Stack>
);

export default ClientForm;
