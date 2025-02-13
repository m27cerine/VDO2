import { Box, Button, IconButton, Typography, Snackbar, Alert } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { useUserContext } from '../../context/UserContext';
import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { user } = useUserContext();
  const { addToCart } = useCartContext();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    addToCart(product); // Ajout au panier via le contexte
    setOpenSnackbar(true); // Affichage de la notification
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        width: 200,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1,
      }}
    >
      {/* Image */}
      <Box sx={{ width: '100%', height: '60%', position: 'relative' }}>
        <Box
          component="img"
          src={product.image || 'https://via.placeholder.com/150'}
          alt={product.nom_piece}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            borderRadius: '50%',
            p: 0.5,
          }}
        >
          <FavoriteBorder />
        </IconButton>
      </Box>

      {/* Nom & Prix */}
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 0.5 }}>
          {product.nom_piece}
        </Typography>
        {product.oldPrice && (
          <Typography sx={{ color: 'grey.500', textDecoration: 'line-through', fontSize: '0.9rem' }}>
            {product.oldPrice.toLocaleString()} DA
          </Typography>
        )}
        <Typography sx={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>
          {product.prix.toLocaleString()} DA
        </Typography>
      </Box>

      {/* Bouton Ajouter au Panier */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#fabd15',
          color: 'black',
          textTransform: 'none',
          width: '90%',
          mt: 1,
        }}
        onClick={handleAddToCart}
      >
        + Panier
      </Button>

      {/* Pop-up Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Produit ajouté au panier !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductCard;
