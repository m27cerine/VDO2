import React from 'react';
import { Pie, Bar, Line, PolarArea } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
} from 'chart.js';
import { Box, Paper, Typography, useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale
);

const Graphique = ({ data, options, type, title }) => {
  const theme = useTheme();

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      case 'polarArea':
        return <PolarArea data={data} options={options} />;
      default:
        return <Typography color="error">Graphique non défini</Typography>;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 4,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        borderLeft: `5px solid #FFA502`, 
      }}
    >
      {/* Titre du graphique */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: theme.palette.text.primary, 
          borderBottom: `2px solid #FFA502`,
          paddingBottom: 1,
          marginBottom: 2,
        }}
      >
        {title}
      </Typography>

      {/* Zone du graphique avec centrage */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          width: '100%',
        }}
      >
        {renderChart()}
      </Box>
    </Paper>
  );
};

export default Graphique;
