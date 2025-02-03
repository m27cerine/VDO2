import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledTextField } from "./StyledComponents";
import { createClientFn } from "../../api/clientApi";

const ClientForm = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.nom) validationErrors.nom = "Le nom est requis.";
    if (!formData.prenom) validationErrors.prenom = "Le prénom est requis.";
    if (!formData.username) validationErrors.username = "Le nom d'utilisateur est requis.";
    if (!formData.email.includes("@")) validationErrors.email = "Email invalide.";
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
      await createClientFn({
        nom: formData.nom,
        prenom: formData.prenom, // Ensure backend accepts prenom
        username: formData.username, // Add this if necessary
        email: formData.email,
        password: formData.password,
        telephone: formData.telephone,
      });
      alert("Compte créé avec succès !");
      setFormData({
        nom: "",
        prenom: "",
        username: "",
        email: "",
        telephone: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
      setErrors({});
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {/* Nom et Prénom */}
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
    </form>
  );
};

export default ClientForm;
