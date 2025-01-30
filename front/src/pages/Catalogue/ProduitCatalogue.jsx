const ListeProduitSousCategorie = () => {
    const location = useLocation();
    const vehicleInfo = location.state || {};
  
    return (
      <Layout>
        {/* ... reste du code ... */}
        <Typography variant="caption" color="textSecondary">
          {vehicleInfo.nomType} {vehicleInfo.nomMarque} 
          {vehicleInfo.nomModele} {vehicleInfo.nomMotorisation}
        </Typography>
        {/* ... reste du code ... */}
      </Layout>
    );
  };