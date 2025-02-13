import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getAllPiecesFn } from '../../api/pieceApi';  

const ProductGrid = ({ title, type }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
    const navigate = useNavigate();

  // Récupérer les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllPiecesFn();
        console.log("Produits récupérés:", productData);
        setProducts(productData);  
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        setError("Impossible de charger les produits");
      }
    };

    fetchProducts();
  }, []);  
  const handlePieceClick = async (productId)=>{
    navigate(`/catalogue/details/${productId}`, {
      state: {
        productId: productId, // Assurez-vous qu'il est bien inclus
      }
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ border: 1, borderColor: 'grey.300' }}>
            <ArrowBackIosNew sx={{ fontSize: '0.9rem' }} />
          </IconButton>
          <IconButton size="small" sx={{ border: 1, borderColor: 'grey.300' }}>
            <ArrowForwardIos sx={{ fontSize: '0.9rem' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Grid de produits */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid 
            item 
            xs={type === 'flash' ? 12 : 6} 
            md={type === 'flash' ? 6 : 4} 
            lg={type === 'flash' ? 3 : 3} 
            key={product.id_piece}
          >
            <ProductCard 
              type={type} 
              product={product} 
              onClick={handlePieceClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;