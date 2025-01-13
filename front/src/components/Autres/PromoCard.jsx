import { Box, Button, Typography } from '@mui/material';

const PromoCard = ({ bgImage, title, subtitle, buttonText, darkOverlay }) => (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        overflow: 'hidden',
        height: 200,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': darkOverlay ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)'
        } : {}
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 20,
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 1
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>{title}</Typography>
        <Typography sx={{ mb: 2 }}>{subtitle}</Typography>
        <Button 
          variant="contained"
          sx={{
            backgroundColor: '#fabd15',
            color: 'black',
            '&:hover': { backgroundColor: '#e0a911' }
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
  export default PromoCard;