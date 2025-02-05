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
import { getPiecesBySybCategoryAndMotorisationFn, getPiecesBySubCategoryFn, getPieceFn } from '../../api/pieceApi';
import { getAllTypesFn } from '../../api/typeApi';
import { getAllMarquesFn } from '../../api/marqueApi';
import { getModelesByTypeAndMarque } from '../../api/modeleApi';
import { getMotorisationsByModele } from '../../api/motorisationApi';
import photo from '../../static/png-clipart-cars-logo-brands-cars-logo-brands.png';
import SidebarFilters from '../../components/Autres/SidebarFilters';
import ProductGrid from '../../components/Product/ProductGrid';
import ProductCard from '../../components/Product/ProductCard';

const ProductDetails = () => {
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

  const productId = location.state?.productId || null;

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

        if (productId) {
          const productsData = await getPieceFn(productId);
          setProducts(productsData);
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

  const handleMotorisationSelect = async (motorisationId) => {
    setSelectedMotorisation(motorisationId);
    if (sousCategorieId) {
      const productsData = await getPiecesBySybCategoryAndMotorisationFn(sousCategorieId,motorisationId);
      setProducts(productsData);
    }
  };

  const handlePieceClick = async (products)=>{
    navigate(`/catalogue/details/${products}`, {
      state: {
        ...vehicleInfo,
        products: products, // Assurez-vous qu'il est bien inclus
        idMotorisation: vehicleInfo.idMotorisation
      }
    });
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
        <Grid container spacing={2} sx={{ p: 2 }}>
          {/* Sidebar */}

          {/* Liste des produits */}
        
          
            <ProductCard 
            type='details'
              product={products} 
            />
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProductDetails;
