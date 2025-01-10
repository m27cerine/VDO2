import React, { useState} from 'react';
import { Box, Grid, Container, Paper, Typography } from '@mui/material';
import Sidebar from '../../components/Layout/Sidebar';
import Header from '../../components/Layout/Header';
import Graphique from './Graphique';
import KPICard from './KPICard';
import { ShoppingCart, People, AttachMoney } from '@mui/icons-material';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pieData = {
    labels: ['Catégorie A', 'Catégorie B', 'Catégorie C'],
    datasets: [
      {
        label: 'Répartition des Pièces',
        data: [300, 50, 100],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
      },
    ],
  };

  const barData = {
    labels: ['Motorisation A', 'Motorisation B', 'Motorisation C'],
    datasets: [
      {
        label: 'Stock par Motorisation',
        data: [150, 120, 80],
        backgroundColor: '#F7B32D',
        borderColor: '#FF6B35',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Ventes Mensuelles',
        data: [50, 60, 80, 90, 100, 120],
        borderColor: '#00C1D4',
        backgroundColor: '#00C1D4',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Pour ajuster la mise à jour du contenu principal en fonction de l'état de la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', transition: 'margin-left 0.3s ease' }}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isSidebarOpen ? '250px' : '0', // Ajuste le margin à l'ouverture de la sidebar
          transition: 'margin-left 0.3s ease', // Animation fluide lors du changement de largeur
        }}
      >
        <Header />
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <KPICard
                icon={ShoppingCart}
                title="Ventes Totales"
                value="1,234"
                growth="+12% ce mois-ci"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <KPICard
                icon={People}
                title="Nouveaux Clients"
                value="567"
                growth="+8% ce mois-ci"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <KPICard
                icon={AttachMoney}
                title="Revenu Total"
                value="€12,345"
                growth="+15% ce mois-ci"
              />
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: 400, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Répartition des Pièces par Catégorie
                </Typography>
                <Box sx={{ height: '100%' }}>
                  <Graphique data={pieData} options={options} type="pie" />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: 400, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Stock par Motorisation
                </Typography>
                <Box sx={{ height: '100%' }}>
                  <Graphique data={barData} options={options} type="bar" />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, height: 400, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Ventes Mensuelles
                </Typography>
                <Box sx={{ height: '100%' }}>
                  <Graphique data={lineData} options={options} type="line" />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
