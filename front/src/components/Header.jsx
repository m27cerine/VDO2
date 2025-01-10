import React from 'react';
import { Box, IconButton, Typography, MenuItem, Select, Button } from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import SearchBar from './searchBar';  
import { Menu } from '@mui/icons-material';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '5px', borderRadius: 2, marginLeft: 'auto', flexWrap: 'wrap', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginRight: { xs: '0', sm: '40%' }, width: { xs: '100%', sm: 'auto' } }}>
            <img src="src/static/exemple-Logo.png" alt="Company Logo" style={{ height: '90px' }} />
          </Box>
          <Box sx={{ display: 'flex', backgroundColor: 'black', borderRadius: 15, alignItems: 'center', gap: 3, justifyContent: 'flex-start', padding: '7px', paddingLeft: '20px', paddingRight: '20px', flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
            <Button variant="text" sx={{ color: 'white', marginLeft: '20px' }}>Acceuil</Button>
            <Button variant="text" sx={{ color: 'white' }}>Offres Speciales</Button>
            <Button variant="text" sx={{ color: 'white' }}>A Propos</Button>
            <Button variant="text" sx={{ color: 'white', marginRight: '10px' }}>Contact</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginLeft: '40px', flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
            <IconButton sx={{ color: 'white', backgroundColor: 'black', borderRadius: 10, padding: '15px' }}>
              <Person />
            </IconButton>
            <IconButton sx={{ color: 'white', backgroundColor: 'black', borderRadius: 10, padding: '15px' ,marginRight:'10px'}}>
              <ShoppingCart />
            </IconButton>
          </Box>
        </Box>
      </div>
    </header>
  );
};

export default Header;
