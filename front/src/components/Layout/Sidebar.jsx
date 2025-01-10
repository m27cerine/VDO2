import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import Logo from "../../static/exemple-Logo.png";

const drawerWidth = 250;

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setActiveItem(path || 'accueil');
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClick = (item) => {
    if (item === "deconnexion") {
      setOpenLogoutDialog(true); 
    } else {
      setActiveItem(item);
    }
  };

  const handleLogout = () => {
    setOpenLogoutDialog(false);
    //ajout des tokens apres 
    console.log("Utilisateur déconnecté");
    navigate("/"); 
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleSidebar}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          backgroundColor: "#333",
          color: "white",
          zIndex: 1301,
          "&:hover": { backgroundColor: "#007BFF" },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: "width 0.3s ease",
            backgroundImage: "linear-gradient(180deg, #ffcc00 0%, #FF7F00 100%)",
            color: "white",
          },
        }}
        role="navigation"
        aria-labelledby="sidebar-menu"
      >
        <Toolbar />
        <Box sx={{ padding: "10px", textAlign: "center" }}>
          <img
            src={Logo}
            alt="Logo Pièces Détachées"
            style={{ width: "80px", marginBottom: "10px" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AutoParts Management
          </Typography>
        </Box>

        <List>
          {[
            { to: "/dashboard", icon: <HomeIcon />, label: "Accueil", key: "accueil" },
            { to: "/gestion-pieces", icon: <InventoryIcon />, label: "Gestion des Pièces", key: "gestion-pieces" },
            { to: "/gestion-clients", icon: <PeopleIcon />, label: "Clients & Acheteurs", key: "clients" },
            { to: "/parametres", icon: <SettingsIcon />, label: "Paramètres", key: "parametres" },
            { to: "#", icon: <ExitToAppIcon />, label: "Déconnexion", key: "deconnexion" },
          ].map(({ to, icon, label, key }) => (
            <ListItemButton
              key={key}
              selected={activeItem === key}
              onClick={() => handleClick(key)}
              component={key !== "deconnexion" ? NavLink : "div"}
              to={key !== "deconnexion" ? to : undefined}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.5s ease",
          marginLeft: isSidebarOpen ? `${drawerWidth}px` : "0",
          padding: 0,
        }}
      >
        <Toolbar />
      </Box>

      {/* Boîte de dialogue pour la déconnexion */}
      <Dialog open={openLogoutDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmer la déconnexion</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir vous déconnecter ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleLogout} color="secondary">
            Déconnexion
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
