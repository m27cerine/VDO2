import React from "react";
import { Box, Typography,useTheme } from "@mui/material";
import { useLocation } from "react-router-dom"; 

const Header = () => {
  const theme = useTheme();
  const location = useLocation(); 
  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Tableau de Bord - Accueil";
      case "/gestion-pieces":
        return "Tableau de Bord - Gestion des Pièces Détachées";
        case "/gestion-clients":
          return "Tableau de Bord - Gestion des Clients";
          case "/parametres":
            return "Tableau de Bord - Paramètres";
      default:
        return "Tableau de Bord";
    }
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderBottom: `2px solid #FFA502`,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", md: "1.8rem" },
          color: theme.palette.text.primary,
        }}
      >
        {getTitle()}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
      </Box>
    </Box>
  );
};

export default Header;
