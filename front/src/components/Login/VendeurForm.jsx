import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
  FormHelperText,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Visibility, 
  VisibilityOff,
  Delete 
} from '@mui/icons-material';
import { StyledTextField } from './StyledComponents';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import bcrypt from 'bcryptjs';
import { createVendeurFn } from '../../api/vendeurApi';
import { getAllWilayasFn } from '../../api/wilayaApi';
import { getCommunesByWilaya } from '../../api/communeApi';

const VendeurForm = () => {
  const initialFormData = {
    nom: '',
    prenom: '',
    username: '',
    email: '',
    telephone: '',
    fax: '',
    password: '',
    confirmPassword: '',
    type: '',
    specialite: '',
    registreCommerce: '',
    nif: '',
    articleImposition: '',
    adresse: '',
    wilaya: '',
    commune: '',
    acceptTerms: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [horaires, setHoraires] = useState([{ id: Date.now(), jour: '', ouverture: '', fermeture: '' }]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const { loginUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        const wilayaData = await getAllWilayasFn();
        setWilayas(Array.isArray(wilayaData) ? wilayaData : []);
      } catch (error) {
        setErrorMessage("Impossible de charger les wilayas");
      }
    };
    fetchWilayas();
  }, []);

  useEffect(() => {
    const fetchCommunes = async () => {
      if (!formData.wilaya) {
        setCommunes([]);
        return;
      }
      try {
        const communeData = await getCommunesByWilaya(formData.wilaya);
        setCommunes(Array.isArray(communeData) ? communeData : []);
      } catch (error) {
        setErrorMessage("Impossible de charger les communes");
      }
    };
    fetchCommunes();
  }, [formData.wilaya]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhoneNumber = (phone) => /^(\+213|0)(5|6|7)[0-9]{8}$/.test(phone);

  const validateHoraires = (horaires) => {
    if (horaires.length === 0) return false;
    const uniqueDays = new Set(horaires.map(h => h.jour));
    return uniqueDays.size === horaires.length && horaires.every(h => 
      h.jour && h.ouverture && h.fermeture && h.ouverture < h.fermeture
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      if (name === 'wilaya') {
        return {
          ...prev,
          [name]: value,
          commune: '' 
        };
      }
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };


  const handleHoraireChange = (index, field, value) => {
    const newHoraires = [...horaires];
    newHoraires[index] = { ...newHoraires[index], [field]: value };
    setHoraires(newHoraires);
    if (errors.horaires) {
      setErrors(prev => ({ ...prev, horaires: undefined }));
    }
  };

  const handleAddHoraire = () => {
    if (horaires.length >= 7) {
      setErrorMessage("Vous ne pouvez pas ajouter plus de 7 horaires");
      return;
    }
    setHoraires([...horaires, { id: Date.now(), jour: '', ouverture: '', fermeture: '' }]);
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.nom) validationErrors.nom = "Le nom est requis";
    if (!formData.prenom) validationErrors.prenom = "Le prénom est requis";
    if (!formData.username) validationErrors.username = "Le nom d'utilisateur est requis";
    if (!formData.email) validationErrors.email = "L'email est requis";
    else if (!validateEmail(formData.email)) validationErrors.email = "Format d'email invalide";
    if (!formData.telephone) validationErrors.telephone = "Le téléphone est requis";
    else if (!validatePhoneNumber(formData.telephone)) validationErrors.telephone = "Format de téléphone invalide";
    if (!formData.type) validationErrors.type = "Le type est requis";
    if (!formData.specialite) validationErrors.specialite = "La spécialité est requise";
    if (!formData.wilaya) validationErrors.wilaya = "La wilaya est requise";
    if (!formData.commune) validationErrors.commune = "La commune est requise";
    if (!formData.password) validationErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 8) validationErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        if (name === 'wilaya') {
          setFormData(prev => ({ ...prev, commune: '' }));
        }
    
        setErrorMessage('');  

        if (!validateHoraires(horaires)) {
          validationErrors.horaires = "Les horaires sont invalides ou incomplets. Assurez-vous que chaque jour est unique et que les heures sont valides.";
        }
        if (!formData.acceptTerms) {
          validationErrors.acceptTerms = "Vous devez accepter les termes et conditions";
        }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Préparer les données à envoyer
      const dataToSend = {
        ...formData,
        idcommune: formData.commune, 
        accept_terms: formData.acceptTerms, 
        horaires: horaires.map(({ id, ...rest }) => rest),
        password: formData.password
      };

      // Supprimer les champs qui ne correspondent pas au modèle
      delete dataToSend.commune;
      delete dataToSend.acceptTerms;
      delete dataToSend.confirmPassword;
      
      console.log("Données à envoyer:", dataToSend);
      const vendeurData = await createVendeurFn(dataToSend);
      loginUser(vendeurData);
      setSuccessMessage("Compte créé avec succès !");
      setTimeout(() => navigate("/acceuil"), 1000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erreur de connexion au serveur");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {/* Basic Information */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <StyledTextField
            required
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom *"
            error={!!errors.nom}
            helperText={errors.nom}
          />
          <StyledTextField
            required
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom *"
            error={!!errors.prenom}
            helperText={errors.prenom}
          />
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <StyledTextField
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nom d'utilisateur *"
            error={!!errors.username}
            helperText={errors.username}
          />
          <StyledTextField
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Adresse E-mail *"
            error={!!errors.email}
            helperText={errors.email}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <StyledTextField
            required
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Téléphone *"
            error={!!errors.telephone}
            helperText={errors.telephone}
          />
          <StyledTextField
            required
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            placeholder="Fax *"
            error={!!errors.telephone}
            helperText={errors.telephone}
          />
        </Box>

      {/* Mot de passe et Confirmation */}
         <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
           <StyledTextField
             required
             name="password"
             type={showPassword ? 'text' : 'password'}
             value={formData.password}
             onChange={handleChange}
             placeholder="Mot de passe *"
             error={!!errors.password}
             helperText={errors.password}
             InputProps={{
               endAdornment: (
                 <InputAdornment position="end">
                   <IconButton onClick={() => setShowPassword(!showPassword)}>
                     {showPassword ? <VisibilityOff /> : <Visibility />}
                   </IconButton>
                 </InputAdornment>
               ),
             }}
           />
           <StyledTextField
             required
             name="confirmPassword"
             type={showConfirmPassword ? 'text' : 'password'}
             value={formData.confirmPassword}
             onChange={handleChange}
             placeholder="Confirmation du mot de passe *"
             error={!!errors.confirmPassword}
             helperText={errors.confirmPassword}
             InputProps={{
               endAdornment: (
                 <InputAdornment position="end">
                   <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                   </IconButton>
                 </InputAdornment>
               ),
             }}
           />
         </Box>
 
      {/* Type and Specialite fields need to be connected to formData */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <StyledTextField
            select
            required
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type *"
            error={!!errors.type}
            helperText={errors.type}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return <em style={{ color: '#aaa' }}>Sélectionnez un type</em>;
                }
                return selected;
              },
            }}
          >
            <MenuItem value="metier1">Type 1</MenuItem>
            <MenuItem value="metier2">Type 2</MenuItem>
          </StyledTextField>
          <StyledTextField
            select
            required
            name="specialite"
            value={formData.specialite}
            onChange={handleChange}
            placeholder="Specialité *"
            error={!!errors.specialite}
            helperText={errors.specialite}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return <em style={{ color: '#aaa' }}>Sélectionnez une spécialité</em>;
                }
                return selected;
              },
            }}
          >
            <MenuItem value="specialité1">Specialité 1</MenuItem>
            <MenuItem value="specialité2">Specialité 2</MenuItem>
          </StyledTextField>
        </Box>

        {/* Business fields */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <StyledTextField
            name="nif"
            value={formData.nif}
            onChange={handleChange}
            placeholder="Numéro d'identification fiscale"
          />
          <StyledTextField
            name="articleImposition"
            value={formData.articleImposition}
            onChange={handleChange}
            placeholder="Article d'imposition"
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StyledTextField
          name="registreCommerce"
          value={formData.registreCommerce}
          onChange={handleChange}
          placeholder="N° Registre de Commerce"
        />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StyledTextField
          select
          required
          name="wilaya"
          value={formData.wilaya}
          onChange={handleChange}
          error={!!errors.wilaya}
          helperText={errors.wilaya}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected) {
                return <em style={{ color: '#aaa' }}>Sélectionnez une wilaya</em>;
              }
              const selectedWilaya = wilayas.find(w => w.idWilaya === selected);
              return selectedWilaya ? selectedWilaya.wilaya : '';
            },
          }}
        >
          {wilayas.map((wilaya) => (
            <MenuItem key={wilaya.idWilaya} value={wilaya.idWilaya}>
              {wilaya.wilaya}
            </MenuItem>
          ))}
        </StyledTextField>

        <StyledTextField
          select
          required
          name="commune"
          value={formData.commune}
          onChange={handleChange}
          error={!!errors.commune}
          helperText={errors.commune}
          disabled={!formData.wilaya}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected) {
                return <em style={{ color: '#aaa' }}>Sélectionnez une commune</em>;
              }
              const selectedCommune = communes.find(c => c.idCommune === selected);
              return selectedCommune ? selectedCommune.commune : '';
            },
          }}
        >
          {communes.map((commune) => (
            <MenuItem key={commune.idCommune} value={commune.idCommune}>
              {commune.commune}
            </MenuItem>
          ))}
        </StyledTextField>
      </Box>

        {/* Adresse */}
        <StyledTextField
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          placeholder="Adresse"
          multiline
          rows={3}
        />
        {/* Intégration de la carte Google Maps */}
        <Box sx={{ height: 200, bgcolor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Carte ici (intégrer API Google Maps)</Typography>
        </Box>

          {/* Schedule section */}
          <Typography variant="h6">Horaires d'ouverture</Typography>
        {errors.horaires && (
          <FormHelperText error>{errors.horaires}</FormHelperText>
        )}
        <Stack spacing={2}>
          {horaires.map((horaire, index) => (
            <Box 
              key={horaire.id} 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr auto' }, 
                gap: 2, 
                alignItems: 'center' 
              }}
            >
              <StyledTextField
                select
                value={horaire.jour}
                onChange={(e) => handleHoraireChange(index, 'jour', e.target.value)}
                placeholder="Jour"
              >
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
                  .filter(jour => !horaires.some((h, i) => i !== index && h.jour === jour))
                  .map(jour => (
                    <MenuItem key={jour} value={jour}>{jour}</MenuItem>
                  ))
                }
              </StyledTextField>
              <StyledTextField
                type="time"
                value={horaire.ouverture}
                onChange={(e) => handleHoraireChange(index, 'ouverture', e.target.value)}
                inputProps={{ step: 300 }}
              />
              <StyledTextField
                type="time"
                value={horaire.fermeture}
                onChange={(e) => handleHoraireChange(index, 'fermeture', e.target.value)}
                inputProps={{ step: 300 }}
              />
              <IconButton 
                color="error" 
                onClick={() => {
                  if (horaires.length > 1) {
                    setHoraires(horaires.filter((_, i) => i !== index));
                  }
                }}
                disabled={horaires.length === 1}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Stack>

        {/* Terms and submission */}
        <FormControlLabel
          control={
            <Checkbox 
              name="acceptTerms" 
              checked={formData.acceptTerms} 
              onChange={handleChange}
            />
          }
          label="J'accepte les termes et conditions"
        />
        {errors.acceptTerms && (
          <FormHelperText error>{errors.acceptTerms}</FormHelperText>
        )}
      {/* Bouton Confirmer */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#FFD700",
              color: "black",
              "&:hover": { bgcolor: "#FDB813" },
              borderRadius: "25px",
              textTransform: "none",
              boxShadow: 7,
              px: 4,
              py: 1,
            }}
          >
            Confirmer
          </Button>
        </Box>

        {errorMessage && (
          <FormHelperText error sx={{ mt: 1 }}>{errorMessage}</FormHelperText>
        )}
        {successMessage && (
          <FormHelperText sx={{ color: 'success.main', mt: 1 }}>{successMessage}</FormHelperText>
        )}
      </Stack>
    </form>
  );
};

export default VendeurForm;