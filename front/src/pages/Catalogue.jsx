import React from 'react';
import { 
  Box,
  Typography,
  TextField,
  ImageList,
  ImageListItem,
  Card,
  CardMedia,
  CardContent,
  AppBar,
  Toolbar,
  Button,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Cat } from 'lucide-react';
import Layout from '../components/LayoutC/Layout';
import photo from '../static/png-clipart-cars-logo-brands-cars-logo-brands.png';
import photo2 from '../static/peugeot_208_2023_4x3.webp';

const categories = [
  {
    id: 1,
    title: 'Accessoires',
    image: photo2
  },
  {
    id: 2,
    title: 'Alimentation carburant',
    image: photo2
  },
  {
    id: 3,
    title: 'Allumage / préchauffage',
    image: photo2
  },
  {
    id: 4,
    title: 'Boîte de vitesses',
    image: photo2
  },
  {
    id: 5,
    title: 'Carburation',
    image: photo2
  },
  {
    id: 6,
    title: 'Carrosserie',
    image: photo2
  },
  {
    id: 7,
    title: 'Chauffage / Ventilation',
    image: photo2
  },
  {
    id: 8,
    title: 'Climatisation',
    image: photo2
  }
];

const Catalogue = () => {
  return (
    <Layout>
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="white" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={photo}
            alt="Ford logo"
            sx={{
                height: 50, 
                width: 'auto', 
                marginRight: 2, 
            }}
            />
            <Typography variant="caption" color="textSecondary">
              FORD FIESTA Camionnette (F3L, F5L) 1.3 (09/1991 - 02/1996)
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="warning" bgcolor="#fabd15" sx={{ mr: 1 }}>
              Changer mon véhicule
            </Button>
            <Button variant="contained" color="error">
              Supprimer
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Catalogue pièces auto
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Rechercher les pièces par catégorie"
          variant="outlined"
          sx={{ mb: 4, bgcolor: 'white' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Categories Grid */}
        <ImageList cols={4} gap={24}>
          {categories.map((category) => (
            <ImageListItem key={category.id}>
              <Card sx={{ height: '100%', bgcolor: '#eee' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.title}
                />
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle1">
                    {category.title}
                  </Typography>
                </CardContent>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
    </Layout>
  );
};

export default Catalogue;