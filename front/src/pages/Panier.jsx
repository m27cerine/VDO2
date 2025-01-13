import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Layout from '../components/LayoutC/Layout';
import photo2 from '../static/png-clipart-cars-logo-brands-cars-logo-brands.png';

const Panier = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '200 Pc Socket and Ratchet Spanner Set',
      price: 12850,
      quantity: 1,
      image: photo2,
    },
    {
      id: 2,
      name: 'Disque de freinage rouge',
      price: 44000,
      quantity: 2,
      image: photo2,
    },
  ]);

  const handleQuantityChange = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  return (
    <Layout>
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4 }}>
            {/* Breadcrumb */}
            <Typography sx={{ mb: 3, color: 'text.secondary', fontSize: '0.9rem' }}>
              Accueil / Panier
            </Typography>

            {/* Cart Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produit</TableCell>
                    <TableCell>Prix</TableCell>
                    <TableCell>Quantité</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{ width: 50, height: 50, objectFit: 'contain' }}
                          />
                          <Typography>{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.price.toLocaleString()} DA</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {(item.price * item.quantity).toLocaleString()} DA
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          size="small"
                          sx={{ color: 'text.secondary' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Coupon Section */}
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 2,
              }}
            >
              <TextField
                label="Code Coupon"
                variant="outlined"
                size="small"
                sx={{ width: '60%' }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FFB800',
                  color: 'black',
                  '&:hover': { backgroundColor: '#e0a911' },
                }}
              >
                Appliquer
              </Button>
            </Box>

            {/* Totals Section */}
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Total HT</Typography>
                <Typography>{calculateTotal().toLocaleString()} DA</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Total TVA</Typography>
                <Typography>
                  {(calculateTotal() * 0.19).toLocaleString()} DA
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Total TTC</Typography>
                <Typography>
                  {(calculateTotal() * 1.19).toLocaleString()} DA
                </Typography>
              </Box>
            </Box>

            {/* Validate Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FFB800',
                  color: 'black',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 4,
                  '&:hover': { backgroundColor: '#e0a911' },
                }}
              >
                Valider ma commande
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default Panier;
