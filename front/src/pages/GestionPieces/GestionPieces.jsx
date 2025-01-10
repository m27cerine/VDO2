import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import CategorieSelector from '../../components/Selectors/CategorieSelector';
import MarqueSelector from '../../components/Selectors/MarqueSelector';
import ModeleSelector from '../../components/Selectors/ModeleSelector';
import MotorisationSelector from '../../components/Selectors/MotorisationSelector';
import TypeSelector from '../../components/Selectors/TypeSelector';
import SousCategorieSelector from '../../components/Selectors/SousCategorieSelector';
import Sidebar from '../../components/Layout/Sidebar';
import Header from '../../components/Layout/Header';
import AjoutPieces from './AjoutPieces';

const ListePieces = ({ pieces, handleMoreInfo, handleEdit, handleDelete }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 4,
        border: '2px solid #ffcc00',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                Nom de la Pièce
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                Prix (€)
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                Quantité
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pieces.map((piece, index) => (
            <TableRow
            key={index}
            sx={{
              backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            <TableCell>{piece.nom}</TableCell>
            <TableCell>{piece.prix}€</TableCell>
            <TableCell>{piece.quantite}</TableCell>
            <TableCell align="center">
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleMoreInfo(piece)}
                  sx={{ marginRight: 1 }}
                >
                  <InfoIcon />
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleEdit(piece)}
                  sx={{ marginRight: 1 }}
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleDelete(piece)}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            </TableCell>
          </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const GestionPieces = () => {
  const [type, setType] = useState('');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [motorisation, setMotorisation] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sousCategorie, setSousCategorie] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);

  const [pieces, setPieces] = useState([
    { nom: 'Disque de frein avant', prix: 50, quantite: 100 },
    { nom: 'Amortisseur arrière', prix: 80, quantite: 150 },
    { nom: 'Pneu hiver', prix: 120, quantite: 200 },
    { nom: 'Filtre à air', prix: 20, quantite: 300 },
    { nom: 'Courroie de distribution', prix: 200, quantite: 50 },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSave = (newPiece) => {
    setPieces((prevPieces) => [...prevPieces, newPiece]);
  };

  const filteredPieces = pieces.filter(piece => {
    if (type && !piece.nom.includes(type)) return false;
    if (marque && !piece.nom.includes(marque)) return false;
    if (modele && !piece.nom.includes(modele)) return false;
    if (motorisation && !piece.nom.includes(motorisation)) return false;
    if (categorie && !piece.nom.includes(categorie)) return false;
    if (sousCategorie && !piece.nom.includes(sousCategorie)) return false;
    if (piece.prix < priceRange[0] || piece.prix > priceRange[1]) return false;
    return true;
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ order: { xs: 1, md: 2 } }}>
              <Paper sx={{ padding: 2, backgroundColor: '#2f3542', marginTop: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TypeSelector type={type} setType={setType} />
                  <MarqueSelector marque={marque} setMarque={setMarque} />
                  <ModeleSelector modele={modele} setModele={setModele} />
                  <MotorisationSelector motorisation={motorisation} setMotorisation={setMotorisation} />
                  <CategorieSelector categorie={categorie} setCategorie={setCategorie} />
                  <SousCategorieSelector sousCategorie={sousCategorie} setSousCategorie={setSousCategorie} />
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
                      Filtrer par prix
                    </Typography>
                    <Slider
                      value={priceRange}
                      onChange={(e, newValue) => setPriceRange(newValue)}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}€`}
                      min={0}
                      max={300}
                      sx={{ width: '100%', marginTop: 2, height: 5 }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} sx={{ order: { xs: 2, md: 1 } }}>
              <ListePieces pieces={filteredPieces} />
              <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                <Pagination
                  count={Math.ceil(filteredPieces.length / 5)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      backgroundColor: '#ffcc00',
                      color: 'black',
                      borderRadius: 1,
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#ffbb33',
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #ffcc00, #ffbb33)',
                    color: '#000',
                    padding: '12px 30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ffbb33, #ffcc00)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
                    },
                  }}
                  size="large"
                  onClick={handleOpenModal}
                >
                  Ajouter une Pièce
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <AjoutPieces open={openModal} handleClose={handleCloseModal} handleSave={handleSave} />
    </Box>
  );
};

export default GestionPieces;
