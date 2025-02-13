import React from 'react';
import {
  Box,
  Typography,
  IconButton,
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
import { useCartContext } from '../context/CartContext';

const Panier = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCartContext();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.prix || 0) * (item.quantity || 1), 0);
  };

  return (
    <Layout>
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography sx={{ mb: 3, color: 'text.secondary', fontSize: '0.9rem' }}>
              Accueil / Panier
            </Typography>

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
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              component="img"
                              src={item.image || 'https://via.placeholder.com/50'}
                              alt={item.nom_piece || 'Produit'}
                              sx={{ width: 50, height: 50, objectFit: 'contain' }}
                            />
                            <Typography>{item.nom_piece || 'Produit'}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {item.prix ? `${item.prix.toLocaleString()} DA` : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => item.quantity > 1 && updateQuantity(item.id, -1)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{item.quantity || 1}</Typography>
                            <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}>
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {item.prix
                            ? `${(item.prix * (item.quantity || 1)).toLocaleString()} DA`
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => removeFromCart(item.id)}
                            size="small"
                            sx={{ color: 'text.secondary' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="h6">Votre panier est vide</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Total TTC</Typography>
                <Typography>
                  {(calculateTotal() * 1.19).toLocaleString()} DA
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" sx={{ backgroundColor: '#FFB800', color: 'black' }}>
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
