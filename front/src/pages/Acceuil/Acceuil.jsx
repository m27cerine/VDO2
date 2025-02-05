
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/LayoutC/Layout';
import CategoryGrid from '../../components/Category/CategoryGrid';
import ProductGrid from '../../components/Product/ProductGrid';
import { Box, MenuItem, Select, Typography, Button, TextField, Grid } from '@mui/material';
import { Menu, QrCode } from '@mui/icons-material';
import SearchBar from '../../components/LayoutC/SearchBar';
import PromoCard from '../../components/Autres/PromoCard';
import NewsGrid from '../../components/Autres/NewsGrid';
import TypeSelector from '../../components/Selectors/TypeSelector';
import MarqueSelector from '../../components/Selectors/MarqueSelector';
import ModeleSelector from '../../components/Selectors/ModeleSelector';
import MotorisationSelector from '../../components/Selectors/MotorisationSelector';
import CategoryProducts from '../../components/Category/CategoryProduct';
import BrandLogos from '../../components/Autres/BrandLogo';
import photo from '../../static/promoAcceuil.png';

const Accueil = () => {
  const [typeId, setTypeId] = useState('');
  const [typeNom, setTypeNom] = useState('');
  const [marqueId, setMarqueId] = useState('');
  const [marqueNom, setMarqueNom] = useState('');
  const [modeleId, setModeleId] = useState('');
  const [modeleNom, setModeleNom] = useState('');
  const [motorisationId, setMotorisationId] = useState('');
  const [motorisationNom, setMotorisationNom] = useState('');
  const [codeBar, setCodeBar] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!typeId || !marqueId || !modeleId || !motorisationId) {
      setError('Veuillez remplir tous les champs requis');
      return;
    }
  
    navigate('/Catalogue', {
      state: {
        typeId,
        marqueId,
        modeleId,
        motorisationId,
        nomType: typeNom,
        nomMarque: marqueNom,
        nomModele: modeleNom,
        nomMotorisation: motorisationNom
      }
    });
  };
  
  
  const bestSellers = [
    { id: 1, name: 'Pneu Michelin 205/55 R16', price: 12000, image: '/api/placeholder/400/400' },
    { id: 2, name: 'Batterie Bosch 12V 60Ah', price: 15000, image: '/api/placeholder/400/400' },
    { id: 3, name: 'Amortisseur Monroe Avant', price: 8000, image: '/api/placeholder/400/400' },
    { id: 4, name: 'Filtre à huile Purflux LS123', price: 1200, image: '/api/placeholder/400/400' }
  ];

  const flashSales = [
    { id: 5, name: 'Kit de distribution Gates', price: 25000, image: '/api/placeholder/400/400' },
    { id: 6, name: 'Pare-chocs avant Renault Clio 4', price: 10000, image: '/api/placeholder/400/400' },
    { id: 7, name: 'Jeu de plaquettes de frein Bosch', price: 3500, image: '/api/placeholder/400/400' },
    { id: 8, name: 'Filtre à air Mann C32006', price: 800, image: '/api/placeholder/400/400' }
  ];

  return (
    <Layout>
      {/* Main Search Container */}
      <Box sx={{ display: 'flex', padding: '20px', gap: 3 }}>
        {/* Left Search Section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Box sx={{ position: 'relative', display: 'flex', borderRadius: '8px', overflow: 'hidden', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fabd15', padding: '10px 20px', marginLeft: '20px', gap: 7, width: '200px' }}>
              <Menu />
              <Typography>Rechercher par:</Typography>
            </Box>   
            <Select defaultValue="" displayEmpty sx={{ minWidth: 200, backgroundColor: 'white' }}>
              <MenuItem value="">Toutes les catégories</MenuItem>
            </Select>
            <SearchBar />
          </Box>
  
          {/* Promo Image */}
          <Box component="img" src={photo} sx={{ width: '70%', height: 'auto', borderRadius: '8px', position: 'absolute', paddingTop: '20px', zIndex: 0 }} />
        </Box>

        {/* Right Search Sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Advanced Search */}
          <Box sx={{ backgroundColor: '#010a19', padding: '20px', borderRadius: '8px', width: '300px', position: 'relative', paddingTop: '40px' }}>
            <Typography sx={{ backgroundColor: '#fabd15', padding: '10px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', position: 'absolute', top: '-10px', left: '20px', right: '20px', zIndex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Recherche avancée
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TypeSelector typeId={typeId} setTypeId={setTypeId} setTypeNom={setTypeNom} />
              <MarqueSelector typeId={typeId} marqueId={marqueId} setMarqueId={setMarqueId} setMarqueNom={setMarqueNom} />
              <ModeleSelector typeId={typeId} marqueId={marqueId} modeleId={modeleId} setModeleId={setModeleId} setModeleNom={setModeleNom} />
              <MotorisationSelector 
                modeleId={modeleId} 
                motorisationId={motorisationId} 
                setMotorisationId={setMotorisationId} 
                setMotorisationNom={setMotorisationNom} 
              />
              <Button fullWidth onClick={handleSearch} sx={{ backgroundColor: '#fabd15', color: 'black' }}>
                RECHERCHER
              </Button>
            </Box>
          </Box>

          {/* Barcode Search */}
          <Box sx={{ backgroundColor: '#fabd15', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '165px', gap: 1 }}>
            <QrCode sx={{ fontSize: 40 }} />
            <TextField fullWidth placeholder="Entrez le code-barres" value={codeBar} onChange={(e) => setCodeBar(e.target.value)} sx={{ backgroundColor: 'white', borderRadius: '4px' }} />
            <Button fullWidth sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}>
              RECHERCHER
            </Button>
          </Box>
        </Box>
      </Box>
              
      {/* Categories */}
      <CategoryGrid />

      {/* Promo Banners */}
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <PromoCard bgImage="/api/placeholder/800/400" title="40% de remise" subtitle="Sur nos Accessoires" buttonText="Commander" />
          </Grid>
          <Grid item xs={12} md={6}>
            <PromoCard bgImage="/api/placeholder/800/400" title="Toutes pièces à partir de" subtitle="2'500 DA" buttonText="Commander" darkOverlay />
          </Grid>
        </Grid>
      </Box>

      {/* Best Sellers & Flash Sales */}
      <ProductGrid title="Meilleures ventes" products={bestSellers} />
      <ProductGrid title="Nos ventes flashs" products={flashSales} type="flash" />

      {/* Special Offer Banner */}
      <PromoCard bgImage="/api/placeholder/1200/400" title="Des offres exceptionnelles" subtitle="De 40% à 80% jusqu'au 12/12/24" buttonText="Accéder" darkOverlay />

      {/* Category Products & Brand Logos */}
      <CategoryProducts />
      <BrandLogos />

      {/* News */}
      <NewsGrid />
    </Layout>
  );
};

export default Accueil;