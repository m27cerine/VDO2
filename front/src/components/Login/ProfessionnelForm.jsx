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

const ProfessionnelForm = () => (
  <Stack spacing={2}>
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
    <StyledTextField
      required
      placeholder="Nom d'utilisateur *"
      variant="outlined"
      fullWidth
    />
    <StyledTextField
      required
      placeholder="Téléphone *"
      variant="outlined"
      fullWidth
    />
    <StyledTextField
      placeholder="Fax"
      variant="outlined"
      fullWidth
    />
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      <StyledTextField
        placeholder="Mot de passe"
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
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      <StyledTextField
        select
        placeholder="Type *"
        variant="outlined"
        fullWidth
        required
      />
      <StyledTextField
        select
        placeholder="Spécialités"
        variant="outlined"
        fullWidth
      />
    </Box>
    <StyledTextField
      placeholder="N° Identification fiscale"
      variant="outlined"
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox />}
      label="J'accepte les termes et conditions d'utilisation de la plateforme"
      sx={{ color: 'text.secondary' }}
    />
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: '#FFD700',
          color: 'black',
          '&:hover': { bgcolor: '#FDB813' },
          borderRadius: '25px',
          textTransform: 'none',
          px: 4,
          py: 1
        }}
        endIcon={<Box component="span">→</Box>}
      >
        Confirmer
      </Button>
    </Box>
  </Stack>
);

export default ProfessionnelForm;