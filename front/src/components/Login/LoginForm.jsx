import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getClientByEmailFn } from '../../api/clientApi';
import { getProfessionnelByEmailFn } from '../../api/professionnelApi';
import { getVendeurByEmailFn } from '../../api/vendeurApi';
import { useUserContext } from '../../context/UserContext';

const LoginForm = () => {
  // On extrait setUser depuis le contexte pour mettre à jour l'utilisateur connecté
  const { loginUser } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fonction qui vérifie l'existence de l'utilisateur dans la table client
  const checkUserType = async () => {
    try {
      let client;
      try {
        client = await getClientByEmailFn(email, password);
        if (client && client.id_client) {
          loginUser({ id: client.id_client, type: 'client' });
          navigate('/acceuil');
          return;
        }
      } catch (err) {let professionnel;
        try {
          professionnel = await getProfessionnelByEmailFn(email, password);
          if (professionnel && professionnel.id_professionnel) {
            loginUser({ id: professionnel.id_professionnel, type: 'professionnel' });
            navigate('/acceuil');
            return;
          }
        } catch (err) { let vendeur;
          try {
            vendeur = await getVendeurByEmailFn(email, password);
            if (vendeur && vendeur.id_vendeur) {
              loginUser({ id: vendeur.id_vendeur, type: 'vendeur' });
              navigate('/acceuil');
              return;
            }
          } catch (err) {
            if (err.kind !== 'not_found') throw err;
          }
        }
    
      }
  
      
     
  
      setError('Identifiants incorrects. Veuillez vérifier votre email et mot de passe.');
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Erreur serveur. Veuillez réessayer plus tard.');
    }
  };

const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    checkUserType();
};

  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', height: '80vh', borderRadius: 2, marginTop: 5 }}
    >
      {/* Left Side - Login Form */}
      <Box
        sx={{
          border: 1,
          borderColor: 'grey.300',
          borderRadius: 2,
          width: '50%',
          height: '70%',
          flex: 1,
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="left" marginBottom={3}>
          Se Connecter
        </Typography>
        <form onSubmit={handleFormSubmit}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Adresse Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Mot de Passe"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Se souvenir de moi"
            sx={{ marginTop: 1 }}
          />

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              marginTop: 3,
              width: '50%',
              marginLeft: '50%',
              padding: 2,
              borderRadius: 2,
              backgroundColor: '#FFB800',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#e0a911' },
              boxShadow: 7,
            }}
          >
            CONNEXION
          </Button>

          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      </Box>

      {/* Right Side - New User and Password Recovery */}
      <Box
        sx={{
          border: 1,
          borderColor: 'grey.300',
          borderRadius: 2,
          width: '50%',
          height: '70%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        {/* Nouveau sur le site ? */}
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" fontWeight="bold" textAlign="left">
            Nouveau sur le site ?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="left"
            sx={{ marginBottom: 2 }}
          >
            S'inscrire gratuitement
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              width: '50%',
              padding: 2,
              borderRadius: 2,
              backgroundColor: '#FFB800',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#e0a911' },
              boxShadow: 7,
            }}
            onClick={() => navigate('/SignUp')}
          >
            S'INSCRIRE
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Mot de passe perdu ? */}
        <Box sx={{ padding: 2, marginTop: 0 }}>
          <Typography variant="h6" fontWeight="bold" textAlign="left">
            Mot de passe perdu ?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="left"
            sx={{ marginBottom: 2 }}
          >
            Récupérer mon compte
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              width: '50%',
              padding: 2,
              borderRadius: 2,
              backgroundColor: '#FFB800',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#e0a911' },
              boxShadow: 7,
            }}
          >
            RÉCUPÉRER
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
