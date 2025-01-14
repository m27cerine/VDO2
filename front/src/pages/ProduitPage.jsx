import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Button,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareIcon from '@mui/icons-material/Compare';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Layout from '../components/LayoutC/Layout';
import ProductGrid from '../components/Product/ProductGrid';
import photo from '../static/png-clipart-cars-logo-brands-cars-logo-brands.png';

// Styled components
const ProductImage = styled(CardMedia)({
  height: 400,
  backgroundSize: 'contain',
  backgroundColor: '#fff',
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontWeight: 'bold',
  '&.Mui-selected': {
    backgroundColor: '#ffc107',
    color: '#000',
  },
});

const AlternatingTableRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5',
}));

const ProduitPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: '14.567.DA',
    name: 'Pc Socket and Ratchet Spanner Set',
    brand: 'KRAFTWERK',
    rating: 4.5,
    price: '149.99',
    reference: '14.567.DA',
    availability: true,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  const products = [{
    id: '14.567.DA',
    name: 'Pc Socket and Ratchet Spanner Set',
    brand: 'KRAFTWERK',
    rating: 4.5,
    price: '149.99',
    reference: '14.567.DA',
    availability: true,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {id: '14.568.DA',
  name: 'Pc Socket and Ratchet Spanner Set',
  brand: 'KRAFTWERK',
  rating: 4.5,
  price: '149.99',
  reference: '14.567.DA',
  availability: true,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}
];

  const compatibleVehicles = [
    { brand: 'BMW', model: 'Série 1', year: '2019-2023' },
    { brand: 'AUDI', model: 'A3', year: '2020-2023' },
    // Add more vehicles...
  ];

  const manufacturerRefs = [
    { ref: 'BMW123', description: 'Compatible BMW parts' },
    { ref: 'AUD456', description: 'Compatible Audi parts' },
    // Add more refs...
  ];

  const reviews = [
    {
      author: 'John Doe',
      date: '2024-01-10',
      rating: 5,
      comment: 'Excellent product, very satisfied with the quality.',
    },
    // Add more reviews...
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Layout>
      <Box sx={{ bgcolor: '#fff', minHeight: '100vh', p: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column - Product Image */}
          <Grid item xs={12} md={6}>
            <ProductImage
              component="img"
              image={photo}
              alt={product.name}
            />
          </Grid>
  
          {/* Right Column - Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
  
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography variant="body2">Réf: {product.reference}</Typography>
              <Typography variant="body2">Marque: {product.brand}</Typography>
            </Box>
  
            <Typography
              variant="body2"
              color={product.availability ? 'success.main' : 'error.main'}
              mb={2}
            >
              {product.availability ? 'En stock' : 'Indisponible'}
            </Typography>
  
            <Typography variant="h4" color="primary" mb={2}>
              €{product.price}
            </Typography>
  
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
  
            {product.availability ? (
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                >
                  Ajouter au panier ({quantity})
                </Button>
              </Box>
            ) : (
              <Button variant="contained" color="primary" fullWidth>
                Faire une commande
              </Button>
            )}
  
            <Box display="flex" gap={2} mb={4}>
              <Button startIcon={<FavoriteIcon />} variant="outlined">
                Ajouter aux favoris
              </Button>
              <Button startIcon={<CompareIcon />} variant="outlined">
                Comparer
              </Button>
            </Box>
          </Grid>
        </Grid>
  
        {/* Tabs Section */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <StyledTab label="Peut être monté sur" />
            <StyledTab label="Référence constructeur" />
            <StyledTab label="Avis" />
          </Tabs>
        </Box>
  
        {/* Tab Content */}
        <Box>
          {/* Compatible Vehicles Tab */}
          <TabPanel value={tabValue} index={0}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Marque</TableCell>
                    <TableCell>Modèle</TableCell>
                    <TableCell>Années</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compatibleVehicles.map((vehicle, index) => (
                    <AlternatingTableRow key={index} index={index}>
                      <TableCell>{vehicle.brand}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                    </AlternatingTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
  
          {/* Manufacturer References Tab */}
          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Référence</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {manufacturerRefs.map((ref, index) => (
                    <AlternatingTableRow key={index} index={index}>
                      <TableCell>{ref.ref}</TableCell>
                      <TableCell>{ref.description}</TableCell>
                    </AlternatingTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
  
          {/* Reviews Tab */}
          <TabPanel value={tabValue} index={2}>
            {reviews.map((review, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography variant="subtitle2">{review.author}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {review.date}
                  </Typography>
                  <Rating value={review.rating} size="small" readOnly />
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
              </Paper>
            ))}
          </TabPanel>

          {/* Produit compatible... */}
            <ProductGrid 
             title="Produit compatible avec..." 
            products={products}
            />
        </Box>
      </Box>
    </Layout>
  );
  
};

export default ProduitPage;