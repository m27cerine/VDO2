import React, { useState } from 'react';
import Layout from '../../components/LayoutC/Layout';
import CategoryGrid from '../../components/Category/CategoryGrid';
import ProductGrid from '../../components/Product/ProductGrid';
import { Box, MenuItem, Select, Typography, Button, TextField} from '@mui/material';
import { Menu, QrCode } from '@mui/icons-material';
import SearchBar from '../../components/LayoutC/SearchBar';
import photo from '../../static/promoAcceuil.png';
import photo2 from '../../static/peugeot_208_2023_4x3.webp';
import PromoCard from '../../components/Autres/PromoCard';
import { Grid } from '@mui/material';
import photo3 from '../../static/png-clipart-cars-logo-brands-cars-logo-brands.png';
import NewsGrid from '../../components/Autres/NewsGrid';

const Accueil = () => {
  const [type, setType] = useState('');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [motorisation, setMotorisation] = useState('');
  const [codeBar, setCodeBar] = useState('');

    const bestSellers = [
      {
        id: 1,
        name: "Kit de freinage complet",
        price: "7'800",
        image: photo2
      },
      {
        id: 2,
        name: "Phares arrière Golf GTI",
        price: "7'800",
        image: photo2
      },
      {
        id: 3,
        name: "Turbo essence 4.6L",
        price: "123'000",
        image: photo2
      }
    ];
  
    const flashSales = [
      {
        id: 1,
        name: "Kit clé à cliquet professionnel",
        price: "1'300",
        oldPrice: "1'500",
        image: photo2,
        timeLeft: "00:34:51"
      },
      {
        id: 2,
        name: "Batterie 12V Premium",
        price: "4'100",
        oldPrice: "4'500",
        image: photo2,
        timeLeft: "02:15:44"
      },
      {
        id: 3,
        name: "Phares avant Opel Astra",
        price: "54'900",
        oldPrice: "60'000",
        image: photo2,
        timeLeft: "14:08:12"
      },
      {
        id: 4,
        name: "Radiateur Mercedes Class A",
        price: "180'000",
        oldPrice: "200'000",
        image: photo2,
        timeLeft: "22:23:21"
      }
    ];
  
    const categoryProducts = [
      {
        id: 1,
        name: "Kit clé à cliquet professionnel",
        price: "7'800",
        image: photo2
      },
      {
        id: 2,
        name: "Disques de frein sport",
        price: "123'000",
        image: photo2
      },
      {
        id: 3,
        name: "Amortisseurs sport",
        price: "7'800",
        image: photo2
      },
      {
        id: 4,
        name: "Turbo 4.6L Essence",
        price: "103'000",
        image: photo2
      },
      {
        id: 5,
        name: "Ventilateur Mercedes",
        price: "700",
        image: photo2
      }
    ];
  

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
            position: 'relative', 
            display: 'flex',
            borderRadius: '8px',
            overflow: 'hidden',
            zIndex: 1 
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fabd15',
              padding: '10px 20px',
              marginLeft: '20px',
              gap: 7,
              width: '200px'
            }}>
              <Menu />
              <Typography>Rechercher par:</Typography>
            </Box>   
            <Select
              defaultValue=""
              displayEmpty
              sx={{ 
                minWidth: 200, 
                backgroundColor: 'white' 
              }}
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
              width: '70%',
              height: 'auto',
              borderRadius: '8px',
              position: 'absolute',
              paddingTop: '20px' ,
              zIndex: 0 
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
            paddingTop: '40px' 
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
            padding: '10px', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '165px', 
            gap: 1  
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
              
      {/* Categories */}
      <CategoryGrid  />

      {/* Promo Banners */}
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <PromoCard
              bgImage="/api/placeholder/800/400"
              title="40% de remise"
              subtitle="Sur nos Accessoires"
              buttonText="Commander"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PromoCard
              bgImage="/api/placeholder/800/400"
              title="Toutes pièces à partir de"
              subtitle="2'500 DA"
              buttonText="Commander"
              darkOverlay
            />
          </Grid>
        </Grid>
      </Box>

      {/* Best Sellers */}
      <ProductGrid 
        title="Meilleures ventes" 
        products={bestSellers}
      />

      {/* Flash Sales */}
      <ProductGrid 
        title="Nos ventes flashs" 
        products={flashSales}
        type="flash"
      />

      {/* Special Offer Banner */}
      <Box sx={{ my: 4 }}>
        <PromoCard
          bgImage="/api/placeholder/1200/400"
          title="Des offres exceptionnelles"
          subtitle="De 40% à 80% jusqu'au 12/12/24"
          buttonText="Accéder"
          darkOverlay
        />
      </Box>

      {/* Category Products */}
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Produits par catégorie
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            bgcolor: 'white',
            borderRadius: 1,
            p: 0.5
          }}>
            <Typography sx={{ 
              px: 1, 
              py: 0.5, 
              borderRadius: 1,
              cursor: 'pointer',
              bgcolor: '#fabd15',
              color: 'black'
            }}>
              Mécanique
            </Typography>
            <Typography sx={{ 
              px: 1, 
              py: 0.5, 
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}>
              Pneumatique
            </Typography>
            <Typography sx={{ 
              px: 1, 
              py: 0.5, 
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}>
              Accessoires
            </Typography>
          </Box>
        </Box>
        <ProductGrid products={categoryProducts} />
      </Box>

      {/* Brand Logos */}
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          {[...Array(10)].map((_, index) => (
            <Grid item xs={6} sm={4} md={2} lg={1} key={index}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60
                }}
              >
                <Box
                  component="img"
                  src={photo3}
                  alt={`Brand ${index + 1}`}
                  sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* article */}
      <NewsGrid />

    </Layout>
  );
};

export default Accueil;