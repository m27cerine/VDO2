import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Dashboard from "../pages/Dashboard/Dashboard";
import AccueilTest from "../pages/AcceuilTest/Acceuil";
import GestionPieces from "../pages/GestionPieces/GestionPieces";
import GestionClients from "../pages/GestionClients/GestionClients";
import ParametresVehicules from '../pages/Paramétres/ParametresVehicules';
import Authentification from '../pages/LoginPage';
import App from '../pages/Acceuil/Acceuil';
import Footer from '../components/LayoutC/Footer';
import Header from '../components/LayoutC/Header';
import Layout from '../components/LayoutC/Layout';
import Panier from '../pages/Panier';
import LoginPage from '../pages/LoginPage';
import SignUp from '../components/Login/SignUp';

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

      </Routes>
    </div>
  );
}

export default RoutesPages;
