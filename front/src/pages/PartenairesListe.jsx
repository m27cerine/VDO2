import React, { useState } from 'react';
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

const PartenairesListe = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const partnersPerPage = 10;

  // Exemple data
  const partners = Array(15).fill({
    nom: 'Test',
    prenom: 'Test',
    commune: 'Alger',
    adresse: 'Rue des Martyrs, Alger',
    telephone: '07737363738',
    position: { lat: 36.752887, lng: 3.042048 },
  });

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = partners.slice(indexOfFirstPartner, indexOfLastPartner);
  const totalPages = Math.ceil(partners.length / partnersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleShowMap = (position) => {
    setSelectedPosition(position);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  return (
    <Layout>
      <Typography variant="h4" mb={1} marginTop={2}>
        Nos partenaires
      </Typography>
      <Typography variant="h6" mb={3}>
        Recherchez un professionnel près de chez vous
      </Typography>
      <Box p={2}>
        {/* Search bar section */}
        <Stack direction="row"  mb={4} sx={{ width: '100%', maxWidth: '600px' }}>
          <TextField
            label="Métier"
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Wilaya"
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Commune"
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              bgcolor: '#fabd15',
              color: 'black',
              minWidth: '50px',
              '&:hover': { bgcolor: '#fdd835' },
            }}
          />
        </Stack>

        {/* Table */}
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
                <TableRow
                  key={index}
                  sx={{
                    bgcolor: index % 2 === 0 ? '#f5f5f5' : 'white',
                  }}
                >
                  <TableCell>{`${partner.nom} ${partner.prenom}`}</TableCell>
                  <TableCell>{partner.commune}</TableCell>
                  <TableCell>{partner.adresse}</TableCell>
                  <TableCell>{partner.telephone}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleShowMap(partner.position)}
                      sx={{ color: '#fabd15' }}
                    >
                      <LocationOnIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box 
          display="flex" 
          justifyContent="center" 
          mt={3}
          sx={{
            '& .MuiPagination-root': {
              '& .MuiPaginationItem-root': {
                color: '#000',
                '&.Mui-selected': {
                  bgcolor: '#fabd15',
                  color: '#000',
                  '&:hover': {
                    bgcolor: '#fdd835',
                  },
                },
              },
            },
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>

        {/* Map Dialog */}
        <Dialog
          open={showMap}
          onClose={handleCloseMap}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
            },
          }}
        >
          <DialogContent>
            {selectedPosition && (
              <iframe
                src={`https://maps.google.com/maps?q=${selectedPosition.lat},${selectedPosition.lng}&z=15&output=embed`}
                width="100%"
                height="500"
                style={{ border: 'none' }}
                title="Carte"
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default PartenairesListe;