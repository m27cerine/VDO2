import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA502', // couleur principale (orange)
    },
    secondary: {
      main: '#2F3542', // couleur secondaire (bleu foncé)
    },
    text: {
      primary: '#FFFFFF', // couleur du texte blanc
    },
    background: {
      default: '#F4F6F8', // fond clair
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // police par défaut
  },
});

export default theme;
