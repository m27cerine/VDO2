import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Paper,
  styled,
} from '@mui/material';
import Layout from '../LayoutC/Layout';
import ClientForm from './ClientForm';
import ProfessionnelForm from './ProfessionnelForm';
import VendeurForm from './VendeurForm';
import { StyledButton } from './StyledComponents';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const SignUpPage = () => {
  const [userType, setUserType] = useState('client');

  return (
    <Layout>
      <StyledContainer maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 0, maxWidth: 900, mx: 'auto' }}>
          <Stack sx={{ width: 200, pr: 0 }}>
            <StyledButton
              selected={userType === 'client'}
              onClick={() => setUserType('client')}
              disableRipple
            >
              Client
            </StyledButton>
            <StyledButton
              selected={userType === 'professionnel'}
              onClick={() => setUserType('professionnel')}
              disableRipple
            >
              Professionnel
            </StyledButton>
            <StyledButton
              selected={userType === 'vendeur'}
              onClick={() => setUserType('vendeur')}
              disableRipple
            >
              Vendeur
            </StyledButton>
          </Stack>

          <Paper 
            elevation={0} 
            sx={{ 
              flex: 1, 
              p: 3, 
              bgcolor: '#FFFFFF',
              borderRadius: '0 8px 8px 0',
              ml: '-1px',
              border: '1px solid #e0e0e0',
              boxShadow: 'none'
            }}
          >
            {userType === 'client' && <ClientForm />}
            {userType === 'professionnel' && <ProfessionnelForm />}
            {userType === 'vendeur' && <VendeurForm />}
          </Paper>
        </Box>
      </StyledContainer>
    </Layout>
  );
};

export default SignUpPage;