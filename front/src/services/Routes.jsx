import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Dashboard from "../pages/Dashboard/Dashboard";
import AccueilTest from "../pages/AcceuilTest/Acceuil";
import GestionPieces from "../pages/GestionPieces/GestionPieces";
import GestionClients from "../pages/GestionClients/GestionClients";
import ParametresVehicules from '../pages/Paramétres/ParametresVehicules';
import App from '../pages/Acceuil/Acceuil';
import Panier from '../pages/Panier';
import LoginPage from '../pages/LoginPage';
import SignUp from '../components/Login/SignUp';
import PartenairesListe from '../pages/PartenairesListe';
import Catalogue from '../pages/Catalogue';
import Offres from '../pages/Offres';
import ProduitPage from '../pages/ProduitPage';

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

        {/* Routes du client */}
        <Route path="Acceuil" element={<App />} />
        <Route path="Panier" element={<Panier />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/PartenairesListe" element={<PartenairesListe />} />
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/Offres" element={<Offres />} />
        <Route path="/ProduitPage" element = {<ProduitPage />} />

      </Routes>
    </div>
  );
}

export default RoutesPages;
