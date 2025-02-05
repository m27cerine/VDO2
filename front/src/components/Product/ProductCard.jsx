import { Box, Button, IconButton, Typography } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { getPieceFn } from '../../api/pieceApi';
import StarIcon from '@mui/icons-material/Star';

const ProductCard = ({ type = 'regular', product, onClick }) => {
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
      }}
      onClick={() => onClick(product.id_piece)} >
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
  } else if (type === 'details'){
    return (
      <Box
      sx={{
        width: '100vw',
        display: 'flex',
        gap: 4,
        p: 6,
        alignItems: 'center',
      }}
    >
      {/* Image à gauche */}
      <Box sx={{ flex: '1', maxWidth: '40vw' }}>
        <Box
          component="img"
          src={product.image_url || 'https://via.placeholder.com/500'}
          alt={product.nom_piece}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      </Box>

      {/* Détails du produit à droite */}
      <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column', maxWidth: '50vw' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {product.nom_piece}
        </Typography>

        {/* Note et avis */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {[...Array(4)].map((_, i) => (
            <StarIcon key={i} sx={{ color: '#FABD15', fontSize: '2rem' }} />
          ))}
          <Typography variant="h6">(67 avis)</Typography>
        </Box>

        {/* Référence et marque */}
        <Typography variant="h6" sx={{ color: 'gray', mt: 1 }}>
          Référence : {product.id_piece} | Marque : <strong>Toshiba</strong>
        </Typography>

        {/* Prix */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
          {product.prix} DA
        </Typography>

        {/* Disponibilité */}
        <Typography
          sx={{
            color: product.quantite_stock > 0 ? 'green' : 'red',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          {product.quantite_stock > 0 ? 'En stock' : 'Non disponible'}
        </Typography>

        {/* Description */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          {product.description || "Aucune description disponible."}
        </Typography>

        {/* Bouton commander */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FF3B30',
            color: 'white',
            mt: 3,
            width: '250px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            p: 1.5,
            '&:hover': { backgroundColor: '#E62E25' },
          }}
        >
          Faire une commande
        </Button>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
          <IconButton>
            <FavoriteBorder sx={{ fontSize: '2rem' }} />
          </IconButton>
          <Typography variant="h6">Ajouter aux favoris</Typography>
        </Box>

        {/* Catégorie & Tags */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          <strong>Catégorie :</strong> Pièce moteur
        </Typography>
        <Typography variant="h6">
          <strong>Tags :</strong> Pièce, Moteur, Mécanique
        </Typography>
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
      onClick={() => onClick(product.id_piece)} >
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
