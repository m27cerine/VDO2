import { Box, Button, IconButton, Typography } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

const ProductCard = ({ type = 'regular', product }) => {
  // Vérifie si l'image existe, sinon une image par défaut est utilisée
  const imageUrl = product.image_url || 'https://via.placeholder.com/150'; // Image par défaut

  if (type === 'flash') {
    return (
      <Box sx={{ 
        display: 'flex',
        backgroundColor: 'white',
        height: '180px',
        borderRadius: 1,
        overflow: 'hidden'
      }}>
        <Box sx={{ width: '60%', position: 'relative' }}>
          <Box
            component="img"
            src={imageUrl}
            alt={product.nom_piece}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            p: 0.5
          }}>
            <Typography sx={{ fontSize: '0.7rem' }}>{product.nom_piece}</Typography>
          </Box>
        </Box>
        <Box sx={{ 
          width: '40%',
          backgroundColor: 'black',
          p: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography sx={{ color: '#fabd15', fontSize: '0.7rem' }}>
              {product.timeLeft}
            </Typography>
            <IconButton size="small">
              <FavoriteBorder sx={{ color: '#fabd15', fontSize: '0.8rem' }} />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {product.oldPrice && (
              <Typography sx={{ 
                color: 'grey.500',
                textDecoration: 'line-through',
                fontSize: '0.7rem'
              }}>
                {product.oldPrice} DA
              </Typography>
            )}
            <Typography sx={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {product.prix} DA
            </Typography>
          </Box>
          <Button
            fullWidth
            sx={{
              backgroundColor: '#fabd15',
              color: 'black',
              textTransform: 'none',
              fontSize: '0.7rem',
              minHeight: '24px',
              '&:hover': { backgroundColor: '#e0a911' }
            }}
          >
            + Panier
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 200, 
        height: 300, 
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 2,
        overflow: 'visible',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Partie Image */}
      <Box
        sx={{
          flex: '0 0 60%',
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={product.nom_piece} // Utilise 'nom_piece' pour le nom du produit
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            padding: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FavoriteBorder sx={{ color: 'white', fontSize: '1rem' }} />
        </Box>
      </Box>

      {/* Partie Nom et Prix */}
      <Box
        sx={{
          flex: '0 0 30%',
          backgroundColor: 'white',
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: 0.5 }}
        >
          {product.nom_piece} {/* Nom du produit */}
        </Typography>
        <Typography
          sx={{ color: 'grey.500', fontSize: '0.9rem', textDecoration: 'line-through' }}
        >
          {product.oldPrice && `${product.oldPrice} DA`} {/* Si prix ancien existe */}
        </Typography>
        <Typography sx={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>
          {product.prix} DA {/* Prix du produit */}
        </Typography>
      </Box>

      {/* Bouton Ajouter au Panier */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#fabd15',
          color: 'black',
          textTransform: 'none',
          position: 'absolute',
          bottom: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          boxShadow: 2,
          '&:hover': { backgroundColor: '#e0a911' },
        }}
      >
        + Panier
      </Button>
    </Box>
  );
};

export default ProductCard;
