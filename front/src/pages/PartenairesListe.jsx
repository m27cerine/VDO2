import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Stack,
} from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import Layout from '../components/LayoutC/Layout';
import { getAllVendeursFn } from '../api/vendeurApi';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const PartenairesListe = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [vendeurs, setVendeurs] = useState([]);
  const [error, setError] = useState(null);
  const partnersPerPage = 10;

  useEffect(() => {
    const fetchVendeurs = async () => {
      try {
        const vendeurData = await getAllVendeursFn();
        setVendeurs(vendeurData);
      } catch (error) {
        console.error('Erreur lors de la récupération des vendeurs:', error);
        setError("Impossible de charger les vendeurs");
      }
    };
    fetchVendeurs();
  }, []);

  const getCoordinatesOSM = async (adresse) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adresse)}&format=json`
      );
      const data = await response.json();
      return data.length > 0 ? { lat: data[0].lat, lng: data[0].lon } : null;
    } catch (error) {
      console.error("Erreur API OSM :", error);
      return null;
    }
  };

  const handleShowMap = async (adresse) => {
    const coordinates = await getCoordinatesOSM(adresse);
    if (coordinates) {
      setSelectedPosition(coordinates);
      setShowMap(true);
    }
  };

  const handleCloseMap = () => setShowMap(false);

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = vendeurs.slice(indexOfFirstPartner, indexOfLastPartner);
  const totalPages = Math.ceil(vendeurs.length / partnersPerPage);

  return (
    <Layout>
      <Typography variant="h4" mb={1} marginTop={2}>Nos partenaires</Typography>
      <Typography variant="h6" mb={3}>Recherchez un professionnel près de chez vous</Typography>

      {error && <Typography color="error" mb={2}>{error}</Typography>}

      <Box p={2}>
        {/* Barre de recherche */}
        <Stack direction="row" mb={4} spacing={1} sx={{ maxWidth: '800px', width: '100%' }}>
          <TextField label="Métier" variant="outlined" size="small" fullWidth />
          <TextField label="Wilaya" variant="outlined" size="small" fullWidth />
          <TextField label="Commune" variant="outlined" size="small" fullWidth />
          <Button
            variant="contained"
            sx={{ bgcolor: '#fabd15', color: 'black', '&:hover': { bgcolor: '#fdd835' } }}
          >
            <SearchIcon />
          </Button>
        </Stack>

        {/* Tableau des partenaires */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nom et prénom</strong></TableCell>
                <TableCell><strong>Commune</strong></TableCell>
                <TableCell><strong>Adresse</strong></TableCell>
                <TableCell><strong>Téléphone</strong></TableCell>
                <TableCell><strong>Position</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPartners.map((partner, index) => (
                <TableRow key={index} sx={{ bgcolor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                  <TableCell>{`${partner.nom} ${partner.prenom}`}</TableCell>
                  <TableCell>{partner.commune}</TableCell>
                  <TableCell>{partner.adresse}</TableCell>
                  <TableCell>{partner.telephone}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleShowMap(partner.adresse)} sx={{ color: '#fabd15' }}>
                      <LocationOnIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination count={totalPages} page={currentPage} onChange={(e, page) => setCurrentPage(page)} />
        </Box>

        {/* Carte Dialog */}
        <Dialog open={showMap} onClose={handleCloseMap} maxWidth="md" fullWidth>
          <DialogContent>
            {selectedPosition && (
              <MapContainer center={[selectedPosition.lat, selectedPosition.lng]} zoom={13} style={{ height: "500px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[selectedPosition.lat, selectedPosition.lng]} icon={customIcon}>
                  <Popup>Position du partenaire</Popup>
                </Marker>
              </MapContainer>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default PartenairesListe;
