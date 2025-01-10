import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import backgroundImage from "../static/backgroundLogin.png"; 

const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('client');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nomClient: '',
    adresseClient: '',
    nomAcheteur: '',
    adresse: '',
    telephone: '',
    numeroRegistreCommerce: '',
    numeroIdentificationFiscale: '',
    articleImposition: '',
    secteurActivite: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100%',  // S'assurer que le Box prend toute la hauteur de la fenêtre
      }}
    >
      <motion.div
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundColor: '#ffff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          width: '400px',
          maxWidth: '90%',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: '#2f3542', marginBottom: '20px' }}
        >
          {isLogin ? 'Connexion' : 'Créer un compte'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ marginBottom: '15px' }}
          />
          {!isLogin && (
            <>
              <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                <InputLabel>Type d'utilisateur</InputLabel>
                <Select
                  value={userType}
                  onChange={handleUserTypeChange}
                  label="Type d'utilisateur"
                >
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="entreprise">Entreprise</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={userType === 'client' ? 'Nom' : 'Nom de l\'entreprise'}
                name={userType === 'client' ? 'nomClient' : 'nomAcheteur'}
                value={userType === 'client' ? formData.nomClient : formData.nomAcheteur}
                onChange={handleChange}
                sx={{ marginBottom: '15px' }}
              />
              <TextField
                fullWidth
                label={userType === 'client' ? 'Adresse' : 'Adresse de l\'entreprise'}
                name={userType === 'client' ? 'adresseClient' : 'adresse'}
                value={userType === 'client' ? formData.adresseClient : formData.adresse}
                onChange={handleChange}
                sx={{ marginBottom: '15px' }}
              />
              {userType !== 'client' && (
                <>
                  <TextField
                    fullWidth
                    label="Numéro de téléphone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    sx={{ marginBottom: '15px' }}
                  />
                  <TextField
                    fullWidth
                    label="Numéro du registre de commerce"
                    name="numeroRegistreCommerce"
                    value={formData.numeroRegistreCommerce}
                    onChange={handleChange}
                    sx={{ marginBottom: '15px' }}
                  />
                  <TextField
                    fullWidth
                    label="Numéro d'identification fiscale"
                    name="numeroIdentificationFiscale"
                    value={formData.numeroIdentificationFiscale}
                    onChange={handleChange}
                    sx={{ marginBottom: '15px' }}
                  />
                  <TextField
                    fullWidth
                    label="Article d'imposition"
                    name="articleImposition"
                    value={formData.articleImposition}
                    onChange={handleChange}
                    sx={{ marginBottom: '15px' }}
                  />
                  {userType === 'entreprise' && (
                    <TextField
                      fullWidth
                      label="Secteur d'activité"
                      name="secteurActivite"
                      value={formData.secteurActivite}
                      onChange={handleChange}
                      sx={{ marginBottom: '15px' }}
                    />
                  )}
                </>
              )}
            </>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              backgroundColor: '#ffcc00',
              color: '#2f3542',
              '&:hover': { backgroundColor: '#e6b800' },
            }}
          >
            {isLogin ? 'Se connecter' : 'Créer le compte'}
          </Button>
        </form>
        <Button
          fullWidth
          onClick={() => setIsLogin(!isLogin)}
          sx={{
            marginTop: '15px',
            color: '#ffcc00',
            textDecoration: 'underline',
            '&:hover': { color: '#e6b800' },
          }}
        >
          {isLogin ? 'Créer un compte' : 'Se connecter'}
        </Button>
      </motion.div>
    </Box>
  );
};

export default Authentification;
