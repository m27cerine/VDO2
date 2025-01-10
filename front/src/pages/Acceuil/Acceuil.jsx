import React, { useState } from 'react';
import Layout from '../../components/Layout';
import CategoryGrid from '../../components/CategoryGrid';
import PromoSection from '../../components/PromoSection';
import ProductGrid from '../../components/productGrid';
import { Box, MenuItem, Select, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { Menu, QrCode, Search, Person, ShoppingCart } from '@mui/icons-material';
import SearchBar from '../../components/searchBar';
import photo from '../../static/promoAcceuil.png';

const Accueil = () => {
  const [type, setType] = useState('');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [motorisation, setMotorisation] = useState('');
  const [codeBar, setCodeBar] = useState('');

  return (
    <Layout>
      {/* Main Search Container */}
      <Box sx={{ 
        display: 'flex', 
        padding: '20px',
        gap: 3
      }}>
        {/* Left Search Section */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          <Box sx={{ 
            position: 'relative',  // Make the parent box the positioning context
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            zIndex: 1 // Ensure the box is above the image
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fabd15',
              padding: '10px 20px',
              gap: 7,
              width: '200px'
            }}>
              <Menu />
              <Typography>Rechercher par:</Typography>
            </Box>
            
            <Select
              defaultValue=""
              displayEmpty
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">Toutes les catégories</MenuItem>
            </Select>
            <SearchBar />
          </Box>
  
          {/* Promo Image */}
          <Box 
            component="img"
            src={photo}
            sx={{ 
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              position: 'relative',
              zIndex: 0 // Ensure the image stays behind the box
            }}
          />
        </Box>

       {/* Right Search Sections */}
       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Advanced Search */}
          <Box sx={{ 
            backgroundColor: '#010a19',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            position: 'relative',
            paddingTop: '40px'  // Ajouté pour laisser de l'espace pour le titre qui déborde
          }}>
            <Typography sx={{ 
              backgroundColor: '#fabd15',
              padding: '10px',
              borderRadius: '4px',
              textAlign: 'center',
              fontWeight: 'bold',
              position: 'absolute',
              top: '-10px',
              left: '20px',
              right: '20px',
              zIndex: 1,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Recherche avancée
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Select 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
                displayEmpty 
                fullWidth
                sx={{ 
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  '& .MuiSelect-select': { backgroundColor: 'white' }
                }}
              >
                <MenuItem value="">Type de véhicule</MenuItem>
              </Select>
              <Select 
                value={marque} 
                onChange={(e) => setMarque(e.target.value)} 
                displayEmpty 
                fullWidth
                sx={{ 
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  '& .MuiSelect-select': { backgroundColor: 'white' }
                }}
              >
                <MenuItem value="">Marque</MenuItem>
              </Select>
              <Select 
                value={modele} 
                onChange={(e) => setModele(e.target.value)} 
                displayEmpty 
                fullWidth
                sx={{ 
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  '& .MuiSelect-select': { backgroundColor: 'white' }
                }}
              >
                <MenuItem value="">Modèle</MenuItem>
              </Select>
              <Select 
                value={motorisation} 
                onChange={(e) => setMotorisation(e.target.value)} 
                displayEmpty 
                fullWidth
                sx={{ 
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  '& .MuiSelect-select': { backgroundColor: 'white' }
                }}
              >
                <MenuItem value="">Motorisation</MenuItem>
              </Select>
              
              <Button
                fullWidth
                sx={{ 
                  backgroundColor: '#fabd15',
                  color: 'black',
                  '&:hover': { backgroundColor: '#e0a911' }
                }}
              >
                RECHERCHER
              </Button>
            </Box>
          </Box>

          {/* Barcode Search */}
          <Box sx={{ 
            backgroundColor: '#fabd15',
            padding: '20px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}>
            <QrCode sx={{ fontSize: 40 }} />
            <TextField
              fullWidth
              placeholder="Entrez le code-barres"
              value={codeBar}
              onChange={(e) => setCodeBar(e.target.value)}
              sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            />
            <Button
              fullWidth
              sx={{ 
                backgroundColor: 'black',
                color: 'white',
                '&:hover': { backgroundColor: '#333' }
              }}
            >
              RECHERCHER
            </Button>
          </Box>
        </Box>
      </Box>

      <CategoryGrid />
      <PromoSection />

    </Layout>
  );
};

export default Accueil;