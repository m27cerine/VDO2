import { Box, Grid, IconButton, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import ProductCard from './ProductCard';

const ProductGrid = ({ title, products, type }) => (
  <Box sx={{ my: 4 }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 2
    }}>
      <Typography variant="h6" fontWeight="bold">{title}</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton size="small" sx={{ border: 1, borderColor: 'grey.300' }}>
          <ArrowBackIosNew sx={{ fontSize: '0.9rem' }} />
        </IconButton>
        <IconButton size="small" sx={{ border: 1, borderColor: 'grey.300' }}>
          <ArrowForwardIos sx={{ fontSize: '0.9rem' }} />
        </IconButton>
      </Box>
    </Box>
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={type === 'flash' ? 12 : 6} md={type === 'flash' ? 6 : 4} lg={type === 'flash' ? 3 : 3} key={product.id}>
          <ProductCard type={type} product={product} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
export default ProductGrid;