import React, { useState } from "react";
import bcrypt from "bcryptjs";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  InputAdornment,
  IconButton,
  Alert,  // Ajout du composant Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledTextField } from "./StyledComponents";
import { createClientFn } from "../../api/clientApi";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ClientForm = () => {
  const { loginUser } = useUserContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Nouveau state pour le message d'erreur global

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Effacer les erreurs quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    // Effacer le message d'erreur global
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Réinitialiser les messages
    setErrorMessage("");
    setSuccessMessage("");
    
    let validationErrors = {};
    if (!formData.nom) validationErrors.nom = "Le nom est requis.";
    if (!formData.prenom) validationErrors.prenom = "Le prénom est requis.";
    if (!formData.username) validationErrors.username = "Le nom d'utilisateur est requis.";
    if (!formData.email.includes("@")) validationErrors.email = "Email invalide.";
    if (!formData.telephone) validationErrors.telephone = "Le téléphone est requis.";
    if (formData.password.length < 6) validationErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    if (!formData.acceptTerms)
      validationErrors.acceptTerms = "Vous devez accepter les termes et conditions.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const clientData = await createClientFn({ ...formData, password: hashedPassword });
      
      loginUser(clientData);
      setSuccessMessage("Compte créé avec succès !");
      
      setTimeout(() => {
        navigate("/acceuil");
      }, 1000);
      
    } catch (error) {
      console.error("Erreur lors de la création du client :", error);
      
      if (error.response?.status === 409) {
        setErrors(prev => ({
          ...prev,
          username: "Ce nom d'utilisateur est déjà utilisé"
        }));
        setErrorMessage("Ce nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre.");
      } else {
        setErrorMessage("Une erreur est survenue lors de la création du compte. Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {/* Affichage des messages d'erreur et de succès */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Le reste de votre formulaire reste identique */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <StyledTextField
            required
            placeholder="Nom *"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            error={!!errors.nom}
            helperText={errors.nom}
            fullWidth
          />
          <StyledTextField
            required
            placeholder="Prénom *"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            error={!!errors.prenom}
            helperText={errors.prenom}
            fullWidth
          />
        </Box>

        {/* Nom d'utilisateur et Email */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <StyledTextField
            required
            placeholder="Nom d'utilisateur *"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
          />
          <StyledTextField
            required
            placeholder="Adresse E-mail *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
        </Box>

        {/* Téléphone */}
        <StyledTextField
          required
          placeholder="Téléphone *"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          error={!!errors.telephone}
          helperText={errors.telephone}
          fullWidth
        />

        {/* Mot de passe et Confirmation */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <StyledTextField
            required
            placeholder="Mot de passe *"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
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
            placeholder="Confirmation du mot de passe *"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
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
        </Box>

        {/* Case à cocher */}
        <FormControlLabel
          control={
            <Checkbox
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
          }
          label="J'accepte les termes et conditions d'utilisation de la plateforme"
          sx={{ color: "text.secondary" }}
        />
        {errors.acceptTerms && (
          <Box sx={{ color: "error.main", fontSize: "0.875rem" }}>
            {errors.acceptTerms}
          </Box>
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
      </Stack>

      {/* Affichage du message de succès */}
      {successMessage && (
        <Box sx={{ mt: 2, color: "green" }}>
          <p>{successMessage}</p>
        </Box>
      )}
    </form>
  );
};

export default ClientForm;
