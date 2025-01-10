// Composant Header
import React from 'react';
import SearchBar from './searchBar';

const Header = () => {
    return (
      <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
        {/* <Logo /> */}
        <SearchBar />
        </div>
        <nav className="flex items-center gap-4">
        {/*<HeaderLinks />
        <UserMenu />
        <CartButton />*/}
        </nav>
      </div>
      </header>
    );
  };

  export default Header;