import React from 'react';
import Layout from '../../components/Layout';
import CategoryGrid from '../../components/CategoryGrid';
import PromoSection from '../../components/PromoSection';
import ProductGrid from '../../components/productGrid';
import SearchBar from '../../components/searchBar';
import { bestSellerProducts, flashSaleProducts } from '../../data/products';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

const Accueil = () => {
  return (
    <Layout>
<Box sx={{ position: 'relative', marginTop: '25px' }}>
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', padding: '10px' }}>
    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#fabd15', width: '250px', padding: '5px', fontWeight: 'bold' }}>
      <Menu sx={{ color: 'black' }} />
      Rechercher par :
    </Typography>

    <Box sx={{ width: '250px', fontWeight: 'bold' }}>
      <Select defaultValue="" displayEmpty fullWidth>
        <MenuItem value="" disabled>Toutes les categories</MenuItem>
        <MenuItem value="1">Categorie 1</MenuItem>
        <MenuItem value="2">Categorie 2</MenuItem>
        <MenuItem value="3">Categorie 3</MenuItem>
      </Select>
    </Box>

    <SearchBar />
  </Box>
</Box>

      <CategoryGrid />
      <PromoSection />
      <ProductGrid 
        title="Meilleurs ventes"
        products={bestSellerProducts}
      />
      <ProductGrid 
        title="Nos ventes flashs"
        products={flashSaleProducts}
      />
    </Layout>
  );
};

export default Accueil;