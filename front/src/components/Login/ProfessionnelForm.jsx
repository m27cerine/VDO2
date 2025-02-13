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
import { Visibility, VisibilityOff, Delete, Add } from '@mui/icons-material';
import { StyledTextField } from './StyledComponents';
import { getAllWilayasFn } from '../../api/wilayaApi';
import { getCommunesByWilaya } from '../../api/communeApi';
import bcrypt from 'bcryptjs';
import { createProfessionnelFn } from '../../api/professionnelApi';
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";

const ProfessionnelForm = () => {
  const initialFormData = {
    nom: '',
    prenom: '',
    username: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    metier: '',
    registreCommerce: '',
    identificationFiscale: '',
    articleImposition: '',
    wilaya: '',
    commune: '',
    adresse: '',
    inscritAnnuaire: false,
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
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [selectedPosition, setSelectedPosition] = useState(null);
  const { loginUser } = useUserContext();
  const navigate = useNavigate();

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateHoraires = (horaires) => {
    if (horaires.length === 0) return false;
    
    const uniqueDays = new Set(horaires.map(h => h.jour));
    if (uniqueDays.size !== horaires.length) return false;

    return horaires.every(horaire => {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!horaire.jour || !horaire.ouverture || !horaire.fermeture) return false;
      
      if (!timeRegex.test(horaire.ouverture) || !timeRegex.test(horaire.fermeture)) return false;
      
      const [openHour, openMin] = horaire.ouverture.split(':').map(Number);
      const [closeHour, closeMin] = horaire.fermeture.split(':').map(Number);
      const openTime = openHour * 60 + openMin;
      const closeTime = closeHour * 60 + closeMin;
      
      return closeTime > openTime;
    });
  };

  const handleAddressChange = async (address) => {
    if (!address) {
      setCoordinates({ lat: null, lng: null });
      setSelectedPosition(null);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const newCoordinates = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
        setCoordinates(newCoordinates);
        setSelectedPosition(newCoordinates);
      }
    } catch (error) {
      console.error("Erreur lors de la géolocalisation :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setErrors(prev => {
        const { password, confirmPassword, ...rest } = prev;
        return rest;
      });
    } else if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === 'wilaya') {
      setFormData(prev => ({ ...prev, commune: '' }));
    }

    if (name === 'adresse') {
      handleAddressChange(value);
    }

    setErrorMessage('');
  };

  const handleAddHoraire = () => {
    if (horaires.length >= 7) {
      setErrorMessage("Vous ne pouvez pas ajouter plus de 7 horaires");
      return;
    }
    setHoraires(prev => [...prev, { id: Date.now(), jour: '', ouverture: '', fermeture: '' }]);
  };

  const handleHoraireChange = (index, field, value) => {
    const updatedHoraires = [...horaires];
    updatedHoraires[index][field] = value;
    setHoraires(updatedHoraires);
    
    if (errors.horaires) {
      setErrors(prev => {
        const { horaires, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    const requiredFields = ['nom', 'prenom', 'username', 'email', 'telephone', 'password', 'metier', 'wilaya', 'commune'];
  
    requiredFields.forEach(field => {
      if (!formData[field]?.toString().trim()) {
        validationErrors[field] = `Le champ ${field} est requis`;
      }
    });
  
    if (formData.email && !validateEmail(formData.email)) {
      validationErrors.email = "Format d'email invalide";
    }
  
    if (formData.telephone && !validatePhoneNumber(formData.telephone)) {
      validationErrors.telephone = "Format de téléphone invalide (format attendu: 05/06/07XXXXXXXX ou +2135/6/7XXXXXXXX)";
    }
  
    if (formData.password) {
      if (formData.password.length < 8) {
        validationErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        validationErrors.password = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
      }
    }
  
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
  
    if (!validateHoraires(horaires)) {
      validationErrors.horaires = "Les horaires sont invalides ou incomplets";
    }
  
    if (!formData.acceptTerms) {
      validationErrors.acceptTerms = "Vous devez accepter les termes et conditions";
    }
  
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
  
    setErrorMessage('');
    setSuccessMessage('');
    setErrors({});
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setErrorMessage("Veuillez corriger les erreurs dans le formulaire");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
    
      const dataToSend = {
        nom: formData.nom,
        prenom: formData.prenom,
        username: formData.username,
        email: formData.email,
        telephone: formData.telephone,
        password: hashedPassword,
        metier: formData.metier,
        registre_commerce: formData.registreCommerce,
        identification_fiscale: formData.identificationFiscale,
        article_imposition: formData.articleImposition,
        adresse: formData.adresse,      
        accept_terms: formData.acceptTerms,
        inscrit_annuaire: formData.inscritAnnuaire,
        idCommune: formData.commune,
        horaires: horaires.filter(h => h.jour && h.ouverture && h.fermeture),
        coordinates
      };
    
      const professionnelData = await createProfessionnelFn(dataToSend);
      loginUser(professionnelData);
      setSuccessMessage("Compte créé avec succès !");
      
      setTimeout(() => {
        navigate("/acceuil");
      }, 1000);
    
    } catch (error) {
      const errorData = error.response?.data;
      
      if (errorData?.kind === "username_exists") {
        setErrors(prev => ({ ...prev, username: "Ce nom d'utilisateur est déjà utilisé" }));
        setErrorMessage("Ce nom d'utilisateur est déjà utilisé");
      } else if (errorData?.kind === "email_exists") {
        setErrors(prev => ({ ...prev, email: "Cette adresse e-mail est déjà utilisée" }));
        setErrorMessage("Cette adresse e-mail est déjà utilisée");
      } else {
        setErrorMessage("Une erreur est survenue lors de la création du compte");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        const wilayaData = await getAllWilayasFn();
        if (Array.isArray(wilayaData)) {
          setWilayas(wilayaData);
        }
      } catch (error) {
        setErrorMessage("Impossible de charger les wilayas");
        setWilayas([]);
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
        if (Array.isArray(communeData)) {
          setCommunes(communeData);
        }
      } catch (error) {
        setErrorMessage("Impossible de charger les communes");
        setCommunes([]);
      }
    };
  
    fetchCommunes();
  }, [formData.wilaya]);

const mapRef = useRef(null); // Référence pour stocker la carte
const markerRef = useRef(null); // Référence pour stocker le marqueur

useEffect(() => {
  if (!mapRef.current && selectedPosition) {
    // Initialisation unique de la carte
    mapRef.current = L.map("map").setView([selectedPosition.lat, selectedPosition.lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Ajout du marqueur initial
    markerRef.current = L.marker([selectedPosition.lat, selectedPosition.lng])
      .addTo(mapRef.current)
      .bindPopup(formData.adresse || "Emplacement sélectionné")
      .openPopup();
  }

  if (mapRef.current && markerRef.current && selectedPosition) {
    // Mise à jour du marqueur
    markerRef.current.setLatLng([selectedPosition.lat, selectedPosition.lng]);
    markerRef.current.setPopupContent(formData.adresse || "Emplacement sélectionné").openPopup();
    mapRef.current.setView([selectedPosition.lat, selectedPosition.lng], 13);
  }
}, [selectedPosition]); // Exécuter uniquement lorsque `selectedPosition` change


  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {/* Informations de base */}
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
          <FormControlLabel
            control={
              <Checkbox
              name="inscritAnnuaire"
              checked={formData.inscritAnnuaire}
              onChange={(e) => setFormData({ ...formData, inscritAnnuaire: e.target.checked })}
              />
            }
            label="M'inscrire dans l'annuaire"
          />
        </Box>

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

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <StyledTextField
            select
            required
            name="metier"
            value={formData.metier}
            onChange={handleChange}
            error={!!errors.metier}
            helperText={errors.metier}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return <em style={{ color: '#aaa' }}>Sélectionnez un métier *</em>;
                }
                return selected;
              },
            }}
          >
            <MenuItem value="metier1">Métier 1</MenuItem>
            <MenuItem value="metier2">Métier 2</MenuItem>
          </StyledTextField>

          <StyledTextField
            name="registreCommerce"
            value={formData.registreCommerce}
            onChange={handleChange}
            placeholder="N° du registre de commerce"
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <StyledTextField
            name="identificationFiscale"
            value={formData.identificationFiscale}
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

        {/* Wilaya et Commune */}
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
                return selected;
              },
            }}
          >
            {Array.isArray(wilayas) &&
              wilayas.map((wilaya) => (
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
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return <em style={{ color: '#aaa' }}>Sélectionnez une commune</em>;
                }
                return selected;
              },
            }}
          >
            {Array.isArray(communes) &&
              communes.map((commune) => (
                <MenuItem key={commune.idCommune} value={commune.idCommune}>
                  {commune.commune}
                </MenuItem>
              ))}
          </StyledTextField>
        </Box>

           {/* Section adresse avec carte */}
           <StyledTextField
          fullWidth
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          placeholder="Adresse complète"
          multiline
          rows={2}
        />
        
        {/* Map will be shown automatically when address is entered */}
        {selectedPosition && (
          <Box 
            id="map" 
            sx={{ 
              width: '100%', 
              height: '400px', 
              mt: 2,
              border: '1px solid #ccc',
              borderRadius: '4px'
            }} 
          />
        )}

        {/* Section des horaires */}
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
                value={horaire.ouverture}
                onChange={(e) => handleHoraireChange(index, 'ouverture', e.target.value)}
                placeholder="De (HH:MM)"
                inputProps={{ pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$" }}
              />
              <StyledTextField
                value={horaire.fermeture}
                onChange={(e) => handleHoraireChange(index, 'fermeture', e.target.value)}
                placeholder="À (HH:MM)"
                inputProps={{ pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$" }}
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
        
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddHoraire}
          disabled={horaires.length >= 7}
        >
          Ajouter un horaire
        </Button>

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

export default ProfessionnelForm;
