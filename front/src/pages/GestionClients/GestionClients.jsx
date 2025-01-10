import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import Sidebar from '../../components/Layout/Sidebar';
import Header from '../../components/Layout/Header';
import AjoutClients from './AjoutClients';

const ListeClients = ({ clients, handleMoreInfo, handleEdit, handleDelete }) => {
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
                Nom du Client
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                Type (Entreprise/Revendeur)
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                Email
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
          {clients.map((client, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              <TableCell>{client.nomClient}</TableCell>
              <TableCell>{client.type}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleMoreInfo(client)}
                    sx={{ marginRight: 1 }}
                  >
                    <InfoIcon />
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleEdit(client)}
                    sx={{ marginRight: 1 }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleDelete(client)}
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

const GestionClients = () => {
  const [clients, setClients] = useState([
    { idClient: 1, nomClient: 'Client A', type: 'Entreprise', email: 'clientA@email.com' },
    { idClient: 2, nomClient: 'Client B', type: 'Revendeur', email: 'clientB@email.com' },
    { idClient: 3, nomClient: 'Client C', type: 'Entreprise', email: 'clientC@email.com' },
    { idClient: 4, nomClient: 'Client D', type: 'Normal', email: 'clientD@email.com' },
  ]);
  const [filteredClients, setFilteredClients] = useState(clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSave = (newClient) => {
    setClients((prevClients) => [...prevClients, newClient]);
    setFilteredClients((prevClients) => [...prevClients, newClient]);
  };

  const handleMoreInfo = (client) => {
    console.log('Info: ', client);
  };

  const handleEdit = (client) => {
    console.log('Edit: ', client);
  };

  const handleDelete = (client) => {
    setClients(clients.filter(c => c.idClient !== client.idClient));
    setFilteredClients(filteredClients.filter(c => c.idClient !== client.idClient));
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterClients(value, typeFilter);
  };

  const handleFilter = (event) => {
    const value = event.target.value;
    setTypeFilter(value);
    filterClients(searchTerm, value);
  };

  const filterClients = (search, type) => {
    let filtered = clients.filter(client => 
      client.nomClient.toLowerCase().includes(search.toLowerCase()) || client.email.toLowerCase().includes(search.toLowerCase())
    );
    if (type) {
      filtered = filtered.filter(client => client.type === type);
    }
    setFilteredClients(filtered);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 , marginTop : 4,}}>
              <TextField
                label="Rechercher par nom ou email"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ width: '100%', sm: '45%' }}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: 'gray', marginLeft: 1 }} />
                  ),
                }}
              />
                <TextField
                  select
                  label="Filtrer par type"
                  value={typeFilter}
                  onChange={handleFilter}
                  sx={{ width: '100%', sm: '45%' }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Tous</option>
                  <option value="Entreprise">Entreprise</option>
                  <option value="Revendeur">Revendeur</option>
                  <option value="Normal">Normal</option>
                </TextField>
              </Box>
              <ListeClients clients={filteredClients} handleMoreInfo={handleMoreInfo} handleEdit={handleEdit} handleDelete={handleDelete} />
              <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                <Pagination
                  count={Math.ceil(filteredClients.length / 5)}
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
                  Ajouter un Client
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <AjoutClients open={openModal} handleClose={handleCloseModal} handleSave={handleSave} />
    </Box>
  );
};

export default GestionClients;
