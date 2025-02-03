import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Box,
  AppBar,
  Toolbar
} from '@mui/material';
import Layout from '../../components/LayoutC/Layout';
import { getPiecesBySybCategoryAndMotorisationFn } from '../../api/pieceApi';
import { getAllTypesFn } from '../../api/typeApi';
import { getAllMarquesFn } from '../../api/marqueApi';
import { getModelesByTypeAndMarque } from '../../api/modeleApi';
import { getMotorisationsByModele } from '../../api/motorisationApi';
import photo from '../../static/png-clipart-cars-logo-brands-cars-logo-brands.png';
import SidebarFilters from '../../components/Autres/SidebarFilters';

const ListeProduitSousCategorie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicleInfo = location.state || {};
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);
  const [motorisations, setMotorisations] = useState([]);
  
  // États de sélection
  const [selectedType, setSelectedType] = useState(vehicleInfo.idType || null);
  const [selectedMarque, setSelectedMarque] = useState(vehicleInfo.idMarque || null);
  const [selectedModele, setSelectedModele] = useState(vehicleInfo.idModele || null);
  const [selectedMotorisation, setSelectedMotorisation] = useState(vehicleInfo.idMotorisation || null);

  const sousCategorieId = vehicleInfo.sousCategorieId;

  // Fetch initial des données
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Chargement des types
        const typesData = await getAllTypesFn();
        setTypes(typesData);

        // Chargement des marques
        const marquesData = await getAllMarquesFn();
        setMarques(marquesData);

        // Chargement des modèles si type et marque sont connus
        if (vehicleInfo.idType && vehicleInfo.idMarque) {
          const modelesData = await getModelesByTypeAndMarque(vehicleInfo.idType, vehicleInfo.idMarque);
          setModeles(modelesData);
        }

        // Chargement des motorisations si modèle est connu
        if (vehicleInfo.idModele) {
          const motorisationsData = await getMotorisationsByModele(vehicleInfo.idModele);
          setMotorisations(motorisationsData);
        }

      } catch (error) {
        console.error("Erreur lors du chargement initial des données:", error);
      }
    };
    fetchInitialData();
  }, []);

  // Gestion des sélections
  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    setSelectedMarque(null);
    setSelectedModele(null);
    setSelectedMotorisation(null);
  };

  const handleMarqueSelect = (marqueId) => {
    setSelectedMarque(marqueId);
    setSelectedModele(null);
    setSelectedMotorisation(null);
  };

  const handleModeleSelect = (modeleId) => {
    setSelectedModele(modeleId);
    setSelectedMotorisation(null);
  };

  const handleMotorisationSelect = (motorisationId) => {
    setSelectedMotorisation(motorisationId);
  };

  // Mise à jour des données lorsque les sélections changent
  useEffect(() => {
    const fetchModeles = async () => {
      if (selectedType && selectedMarque) {
        try {
          const modelesData = await getModelesByTypeAndMarque(selectedType, selectedMarque);
          setModeles(modelesData);
        } catch (error) {
          console.error('Erreur lors de la récupération des modèles:', error);
        }
      }
    };
    fetchModeles();
  }, [selectedType, selectedMarque]);

  useEffect(() => {
    const fetchMotorisations = async () => {
      if (selectedModele) {
        try {
          const motorisationsData = await getMotorisationsByModele(selectedModele);
          setMotorisations(motorisationsData);
        } catch (error) {
          console.error("Erreur lors de la récupération des motorisations :", error);
        }
      }
    };
    fetchMotorisations();
  }, [selectedModele]);

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

        <Grid container spacing={2} sx={{ p: 2 }}>
          {/* Sidebar */}
          <Grid item xs={3}>
            <SidebarFilters
              types={types}
              marques={marques}
              modeles={modeles}
              motorisations={motorisations}
              selectedType={selectedType}
              selectedMarque={selectedMarque}
              selectedModele={selectedModele}
              selectedMotorisation={selectedMotorisation}
              onTypeSelect={handleTypeSelect}
              onMarqueSelect={handleMarqueSelect}
              onModeleSelect={handleModeleSelect}
              onMotorisationSelect={handleMotorisationSelect}
            />
          </Grid>

          {/* Liste des produits */}
          <Grid item xs={9}>
            {/* Contenu des produits */}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default ListeProduitSousCategorie;
