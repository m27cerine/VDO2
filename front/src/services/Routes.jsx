import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Dashboard from "../pages/Dashboard/Dashboard";
import Accueil from "../pages/Acceuil/Acceuil";
import GestionPieces from "../pages/GestionPieces/GestionPieces";
import GestionClients from "../pages/GestionClients/GestionClients";
import ParametresVehicules from '../pages/Paramétres/ParametresVehicules';
import Authentification from '../pages/Authentification';
const RoutesPages = () => {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gestion-pieces" element={<GestionPieces />} />
        <Route path="/gestion-clients" element={<GestionClients />} />
        <Route path="/parametres" element={<ParametresVehicules />} />
        <Route path="/authentification" element={<Authentification />} />
      </Routes>
    </div>
  );
}

export default RoutesPages;
