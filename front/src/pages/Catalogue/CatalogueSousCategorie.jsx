import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, AppBar, Toolbar, Button, InputAdornment } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../../components/LayoutC/Layout';
import SousCategorieGrid from '../../components/Category/SousCategoryGrid';
import photo from '../../static/png-clipart-cars-logo-brands-cars-logo-brands.png';
import { getSousCategorieByCategorie } from '../../api/souscategorieApi';

const SousCategorie = () => {
  const [sousCategories, setSousCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams();
  const vehicleInfo = location.state || {};

  useEffect(() => {
    const fetchSousCategories = async () => {
      try {
        const sousCategoriesData = await getSousCategorieByCategorie(categoryId);
        setSousCategories(sousCategoriesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des sous-catégories :", error);
        setError("Impossible de charger les sous-catégories.");
      }
    };

    if (categoryId) {
      fetchSousCategories();
    }
  }, [categoryId]);

  const handleSousCategorieClick = (sousCategorieId) => {
    navigate(`/catalogue/pieces/${sousCategorieId}`, {
      state: {
        ...vehicleInfo,
        sousCategorieId: sousCategorieId, // Assurez-vous qu'il est bien inclus
        idMotorisation: vehicleInfo.idMotorisation
      }
    });
  };
  
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les sous-catégories en fonction du terme de recherche
  const filteredSousCategories = sousCategories.filter(sousCategorie => 
    sousCategorie.nom_sous_categorie && 
    sousCategorie.nom_sous_categorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Erreur : {error}</Typography>
      </Box>
    );
  }

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
                {vehicleInfo.nomType} {vehicleInfo.nomMarque} {vehicleInfo.nomModele} {vehicleInfo.nomMotorisation}
              </Typography>
            </Box>
            <Box>
              <Button onClick={() => navigate('/Acceuil')} variant="contained" color="warning" sx={{ mr: 1, bgcolor: "#fabd15" }}>
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
            Sous-catégories
          </Typography>

          <TextField
            fullWidth
            placeholder="Rechercher les sous-catégories"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 4, bgcolor: 'white' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ my: 4 }}>
          <SousCategorieGrid 
            sousCategories={filteredSousCategories} 
            onSousCategorieClick={handleSousCategorieClick} 
            vehicleInfo={vehicleInfo} 
          />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default SousCategorie;