import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { StyledTextField } from './StyledComponents';

// Opening Hours Component
const OpeningHours = () => (
  <Box sx={{ mt: 4 }}>
    <Box sx={{ mb: 2 }}>Horaire d'ouverture</Box>
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <StyledTextField
          select
          defaultValue=""
          sx={{ minWidth: 120 }}
          size="small"
          placeholder="Jour"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="span">De</Box>
          <StyledTextField
            type="time"
            size="small"
            sx={{ width: 120 }}
          />
          <Box component="span">À</Box>
          <StyledTextField
            type="time"
            size="small"
            sx={{ width: 120 }}
          />
          <IconButton color="error" size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Button
        startIcon={<AddIcon />}
        sx={{ color: 'success.main', justifyContent: 'flex-start', width: 'fit-content' }}
      >
        Ajouter un horaire
      </Button>
    </Stack>
  </Box>
);

const VendeurForm = () => (
  <Stack spacing={4}>
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
          placeholder="wilaya *"
          variant="outlined"
          fullWidth
          required
        />
        <StyledTextField
          select
          placeholder="Commune *"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <StyledTextField
        multiline
        rows={3}
        placeholder="Adresse *"
        variant="outlined"
        fullWidth
        required
      />
      <FormControlLabel
        control={<Checkbox />}
        label="J'accepte les termes et conditions d'utilisation de la plateforme"
        sx={{ color: 'text.secondary' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
    <OpeningHours />
    <Box 
      sx={{ 
        height: 300,
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 1
        }
      }}
    >
      <img src="/api/placeholder/800/300" alt="Map" />
    </Box>
  </Stack>
);

export default VendeurForm;