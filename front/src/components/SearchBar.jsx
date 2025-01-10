import SearchIcon from '@mui/icons-material/Search'; 
import { Box } from '@mui/system';

const SearchBar = () => {
  return (
    <Box sx={{ width: '400px' ,height:'54px'}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '6px',
          width: '100%',
          height:'100%',
          border: '1px solid #ddd',
        }}
      >
        <input
          type="text"
          placeholder="Recherche rapide..."
          style={{
            border: 'none',
            outline: 'none',
            flexGrow: 1,
            marginLeft: '10px',
          }}
        />
        <SearchIcon sx={{ color: '#999', width: 40, height: 40 }} />
      </div>
    </Box>
  );
};

export default SearchBar;
