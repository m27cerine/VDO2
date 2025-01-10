// Composant SearchBar
import SearchIcon from '@mui/icons-material/Search';  // Importation de l'icône de MUI

const SearchBar = () => {
  return (
    <div className="relative flex items-center">
      <div className="flex items-center border rounded-lg p-2">
        <select className="border-r px-2">
          <option>Toutes les catégories</option>
        </select>
        <input
          type="text"
          placeholder="Recherche rapide..."
          className="px-4 outline-none"
        />
        <SearchIcon className="w-5 h-5 text-gray-400" /> {/* Utilisation de l'icône Search de MUI */}
      </div>
    </div>
  );
};

export default SearchBar;
