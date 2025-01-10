import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Box,
  Container,
  Button,
  Tabs,
  Tab,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination
} from '@mui/material';
import Sidebar from '../../components/Layout/Sidebar';
import Header from '../../components/Layout/Header';
import AjoutType from './AjoutType';
import AjoutMarque from './AjoutMarque';
import AjoutModele from './AjoutModele';
import AjoutMotorisation from './AjoutMotorisation';
import AjoutCategorie from './AjoutCategorie';
import AjoutSousCategorie from './AjoutSousCategorie';

const DataTable = ({ data, columns, onEdit, onDelete }) => (
  <TableContainer
    component={Paper}
    sx={{
      marginTop: 4,
      border: '2px solid #ffcc00',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      overflow: 'hidden'
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <TableCell key={index}>
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                {column.header}
              </Typography>
            </TableCell>
          ))}
          <TableCell align="center">
            <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold' }}>
              Actions
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={index}
            sx={{
              backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>{row[column.field]}</TableCell>
            ))}
            <TableCell align="center">
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => onEdit(row)}
                  sx={{ marginRight: 1 }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => onDelete(row)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const ParametresVehicules = () => {
  const [activeTab, setActiveTab] = useState("types");
  const [openModal, setOpenModal] = useState(false);
  
  const [types, setTypes] = useState([
    { id: 1, nom: 'Touristique', description: 'Véhicules de tourisme' },
    { id: 2, nom: 'Camion', description: 'Poids lourds' },
  ]);

  const [marques, setMarques] = useState([
    { id: 1, nom: 'Toyota', pays: 'Japon' },
    { id: 2, nom: 'Honda', pays: 'Japon' },
  ]);

  const [modeles, setModeles] = useState([
    { id: 1, nom: 'Corolla', marque: 'Toyota', type: 'Touristique', annee: '2020' },
    { id: 2, nom: 'Civic', marque: 'Honda', type: 'Touristique', annee: '2021' },
  ]);

  const [motorisations, setMotorisations] = useState([
    { id: 1, type: 'Essence', puissance: '110ch', modele: 'Corolla' },
    { id: 2, type: 'Diesel', puissance: '150ch', modele: 'Civic' },
  ]);

 const [categories, setCategories] = useState([
    { id: 1, nom: 'Moteur' },
    { id: 2, nom: 'Carrosserie' },
  ]);

  const [sousCategories, setSousCategories] = useState([
    { id: 1, nom: 'Pare-chocs', categorie: 'Carrosserie' },
    { id: 2, nom: 'Moteur', categorie: 'Moteur' },
  ]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSave = (newItem) => {
    switch (activeTab) {
      case 'types':
        setTypes([...types, { ...newItem, id: types.length + 1 }]);
        break;
      case 'marques':
        setMarques([...marques, { ...newItem, id: marques.length + 1 }]);
        break;
      case 'modeles':
        setModeles([...modeles, { ...newItem, id: modeles.length + 1 }]);
        break;
      case 'motorisations':
        setMotorisations([...motorisations, { ...newItem, id: motorisations.length + 1 }]);
        break;
      case 'categories':
        setCategories([...categories, { ...newItem, id: categories.length + 1 }]);
        break;
      case 'sousCategories':
        setSousCategories([...sousCategories, { ...newItem, id: sousCategories.length + 1 }]);
        break;
      default:
        break;
    }
    handleCloseModal();
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const getModalComponent = () => {
    switch (activeTab) {
      case 'types':
        return <AjoutType open={openModal} handleClose={handleCloseModal} handleSave={handleSave} />;
      case 'marques':
        return <AjoutMarque open={openModal} handleClose={handleCloseModal} handleSave={handleSave} />;
      case 'modeles':
        return <AjoutModele 
          open={openModal} 
          handleClose={handleCloseModal} 
          handleSave={handleSave} 
          types={types} 
          marques={marques} 
        />;
      case 'motorisations':
        return <AjoutMotorisation 
          open={openModal} 
          handleClose={handleCloseModal} 
          handleSave={handleSave} 
          modeles={modeles} 
        />;
      case 'categories':
        return <AjoutCategorie open={openModal} handleClose={handleCloseModal} handleSave={handleSave} />;
      case 'sousCategories':
        return <AjoutSousCategorie 
          open={openModal} 
          handleClose={handleCloseModal} 
          handleSave={handleSave} 
          categories={categories} 
        />;
      default:
        return null;
    }
  };

  const renderSection = (data, columns) => (
    <Box>
      <DataTable
        data={data.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
        columns={columns}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handlePaginationChange}
          color="primary"
        />
      </Box>
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            background: 'linear-gradient(45deg, #ffcc00, #ffbb33)',
            color: '#000',
            padding: '8px 24px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #ffbb33, #ffcc00)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </Box>
    </Box>
  );

  const getCurrentData = () => {
    switch (activeTab) {
      case 'types':
        return {
          data: types,
          columns: [
            { field: 'nom', header: 'Nom' },
            { field: 'description', header: 'Description' }
          ]
        };
      case 'marques':
        return {
          data: marques,
          columns: [
            { field: 'nom', header: 'Nom' },
            { field: 'pays', header: 'Pays d\'origine' }
          ]
        };
      case 'modeles':
        return {
          data: modeles,
          columns: [
            { field: 'nom', header: 'Nom' },
            { field: 'marque', header: 'Marque' },
            { field: 'type', header: 'Type' },
            { field: 'annee', header: 'Année' }
          ]
        };
      case 'motorisations':
        return {
          data: motorisations,
          columns: [
            { field: 'type', header: 'Type' },
            { field: 'puissance', header: 'Puissance' },
            { field: 'modele', header: 'Modèle' }
          ]
        };
      case 'categories':
        return {
          data: categories,
          columns: [
            { field: 'nom', header: 'Nom' }
          ]
        };
      case 'sousCategories':
        return {
          data: sousCategories,
          columns: [
            { field: 'nom', header: 'Nom' },
            { field: 'categorie', header: 'Catégorie' }
          ]
        };
      default:
        return { data: [], columns: [] };
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Container maxWidth="lg">
          <Paper sx={{ 
            backgroundColor: '#2f3542', 
            padding: 2, 
            marginBottom: 4,
            borderRadius: '8px',
            marginTop: 4,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)} 
              centered
              sx={{
                '& .MuiTab-root': {
                  color: 'white',
                  '&.Mui-selected': {
                    color: '#ffcc00',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ffcc00',
                },
              }}
            >
              <Tab label="Types" value="types" />
              <Tab label="Marques" value="marques" />
              <Tab label="Modèles" value="modeles" />
              <Tab label="Motorisations" value="motorisations" />
              <Tab label="Categories" value="categories" />
              <Tab label="Sous-Categories" value="sousCategories" />
            </Tabs>
          </Paper>

          {renderSection(getCurrentData().data, getCurrentData().columns)}
          {getModalComponent()}
        </Container>
      </Box>
    </Box>
  );
};

export default ParametresVehicules;