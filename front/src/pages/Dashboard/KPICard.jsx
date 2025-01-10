import React from "react";
import { Box, Paper, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";

const CardContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  borderLeft: "5px solid #FFA502",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down('sm')]: {
    padding: "15px",
  },
}));

const IconContainer = styled(Avatar)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffcc00, #FFB347)",
  color: "white",
  marginRight: "20px",
  boxShadow: "0 5px 15px rgba(255, 165, 2, 0.3)",
  width: "60px",
  height: "60px",
  [theme.breakpoints.down('sm')]: {
    width: "50px",
    height: "50px",
  },
}));

const ValueText = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "black",
  [theme.breakpoints.down('sm')]: {
    fontSize: "1.5rem",
  },
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "black",
  [theme.breakpoints.down('sm')]: {
    fontSize: "1rem",
  },
}));

const GrowthText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "green",
  fontWeight: "bold",
  [theme.breakpoints.down('sm')]: {
    fontSize: "0.9rem",
  },
}));

const KPICard = ({ icon: Icon, title, value, growth }) => {
  return (
    <CardContainer>
      <IconContainer>
        <Icon fontSize="large" />
      </IconContainer>
      <Box>
        <TitleText variant="h6" gutterBottom>
          {title}
        </TitleText>
        <ValueText>{value}</ValueText>
        <GrowthText variant="body2">{growth}</GrowthText>
      </Box>
    </CardContainer>
  );
};

export default KPICard;
