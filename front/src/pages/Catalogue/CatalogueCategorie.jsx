import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  Button,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../../components/LayoutC/Layout';
import photo from '../../static/png-clipart-cars-logo-brands-cars-logo-brands.png';
import CategoryGrid from '../../components/Category/CategoryGrid';

const Catalogue = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicleInfo = location.state || {};

  const handleSearch = () => {
    navigate('/Acceuil');
  };

  return (
    <Layout>
      <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
        <AppBar position="static" color="white" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src={photo}
                alt="Car logo"
                sx={{
                  height: 50,
                  width: 'auto',
                  marginRight: 2,
                }}
              />
              <Typography variant="caption" color="textSecondary">
                {vehicleInfo.nomType} - {vehicleInfo.nomMarque} - {vehicleInfo.nomModele} - {vehicleInfo.nomMotorisation}
              </Typography>
            </Box>
            <Box>
              <Button onClick={handleSearch} variant="contained" color="warning" sx={{ mr: 1, bgcolor: "#fabd15" }}>
                Changer mon véhicule
              </Button>
              <Button variant="contained" color="error">
                Supprimer
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
            Catalogue pièces auto
          </Typography>

          <TextField
            fullWidth
            placeholder="Rechercher les pièces par catégorie"
            variant="outlined"
            sx={{ mb: 4, bgcolor: 'white' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <CategoryGrid />
        </Box>
      </Box>
    </Layout>
  );
};

export default Catalogue;