import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  IconButton,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ViewListIcon from '@mui/icons-material/ViewList';
import photo from '../static/png-clipart-cars-logo-brands-cars-logo-brands.png';
import Layout from '../components/LayoutC/Layout';

const Offres = () => {
    const products = [
        {
          id: 1,
          name: 'Pompe hydraulique, direction',
          image: photo,
          price: '18,690 DA',
          specs: {
            Marque: 'Speciale',
            Modèle: 'Type A',
            Référence: '123456',
          },
          available: true,
        },
        {
          id: 2,
          name: 'Courroie de distribution',
          image: photo,
          price: '7,500 DA',
          specs: {
            Marque: 'Premium',
            Modèle: 'Type B',
            Référence: '789012',
          },
          available: false,
        },
      ];
      

  const categories = [
    { title: 'Moteur', items: ['Filtre', 'Huile', 'Bougie', 'Courroie', 'Culasse', 'Pompe', 'Joint'] },
    { title: 'Équipage', items: ['OEM', 'Marque', 'Modèle', 'Boitier', 'Pièces', 'Plaquettes', 'Disque'] },
    { title: 'Energie', items: ['Diesel', 'Spark', 'Essence', 'Hybride'] },
  ];

  return (
    <Layout>
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>

      <Grid container spacing={2} sx={{ p: 2 }}>
        {/* Left Sidebar */}
        <Grid item xs={3}>
          <Paper>
            {categories.map((category, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: '#fabd15',
                    color: 'black',
                    p: 1,
                  }}
                >
                  {category.title}
                </Typography>
                <List dense>
                  {category.items.map((item, idx) => (
                    <ListItem
                      key={idx}
                      button
                      sx={{
                        bgcolor: 'white',
                        '&:hover': { bgcolor: '#f5f5f5' },
                        '&.Mui-selected': {
                          bgcolor: '#fabd15',
                          color: 'black',
                          fontWeight: 'bold',
                        },
                      }}
                    >
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </div>
            ))}
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={9}>
        {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          bgcolor: 'black',
          color: 'white',
        }}
      >
        <Typography variant="h6">Offres &lt; Moteurs</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton sx={{ color: 'white' }}>
            <SortIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <ViewComfyIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <ViewListIcon />
          </IconButton>
        </Box>
      </Box>
      {products.map((product) => (
  <Card key={product.id} sx={{ mb: 3, p: 2 }}>
    <Grid container spacing={2} alignItems="center">
      {/* Image */}
      <Grid item xs={3}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: '100%',
            height: '150px', // Taille carrée
            objectFit: 'cover',
          }}
        />
      </Grid>

      {/* Product Details */}
      <Grid item xs={6}>
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
          >
            {product.name}
          </Typography>

          {/* Product Specs Table */}
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.9rem',
            }}
          >
            <tbody>
              {Object.entries(product.specs).map(([key, value], index) => (
                <tr
                  key={key}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0',
                  }}
                >
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>{key}:</td>
                  <td style={{ padding: '8px' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Grid>

      {/* Price and Availability */}
      <Grid item xs={3}>
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: '#fabd15', fontWeight: 'bold', mb: 1 }}
          >
            {product.price}
          </Typography>
          <Divider sx={{ bgcolor: 'black', mb: 1 }} />
          <Typography
            variant="body2"
            sx={{
              color: product.available ? 'green' : 'red',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            {product.available ? 'Disponible' : 'Indisponible'}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#fabd15',
              color: 'black',
              '&:hover': { bgcolor: '#e0a911' },
              px: 3,
            }}
          >
            + Panier
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Card>

          ))}
        </Grid>
      </Grid>
    </Box>
    </Layout>
  );
};

export default Offres;
