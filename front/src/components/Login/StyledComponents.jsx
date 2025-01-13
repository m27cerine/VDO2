import { styled, TextField, Button } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: '#e0e0e0',
      borderRadius: '25px',
    },
    '&:hover fieldset': {
      borderColor: '#e0e0e0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e0e0e0',
    },
  },
}));

export const StyledButton = styled(Button)(({ theme, selected }) => ({
  width: '100%',
  backgroundColor: selected ? '#fff' : '#FFD700',
  color: 'black',
  justifyContent: 'flex-start',
  padding: theme.spacing(1.5, 3),
  marginBottom: theme.spacing(1),
  borderRadius: selected ? '8px 0 0 8px' : '8px',
  textTransform: 'none',
  boxShadow: 'none',
  border: selected ? '1px solid #e0e0e0' : 'none',
  borderRight: selected ? 'none' : 'none',
  '&:hover': {
    backgroundColor: selected ? '#fff' : '#FDB813',
    boxShadow: 'none',
  },
}));