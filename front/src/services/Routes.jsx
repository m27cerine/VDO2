import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Dashboard from "../pages/Dashboard/Dashboard";
import AccueilTest from "../pages/AcceuilTest/Acceuil";
import GestionPieces from "../pages/GestionPieces/GestionPieces";
import GestionClients from "../pages/GestionClients/GestionClients";
import ParametresVehicules from '../pages/Paramétres/ParametresVehicules';
import Authentification from '../pages/Authentification';
import App from '../pages/Acceuil/Acceuil';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RoutesPages = () => {
  return (
    <div className="page">
      <Routes>
        {/* Routes de l'admin */}
        <Route path="/" element={<AccueilTest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gestion-pieces" element={<GestionPieces />} />
        <Route path="/gestion-clients" element={<GestionClients />} />
        <Route path="/parametres" element={<ParametresVehicules />} />
        <Route path="/authentification" element={<Authentification />} />
        {/* Routes du client */}
        <Route path="Acceuil" element={<App />} />
        {/* Routes pour tester */}
        <Route path="Header" element={<Header />} />
        <Route path="Footer" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default RoutesPages;
