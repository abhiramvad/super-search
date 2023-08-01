// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ResultsView from './components/ResultsView';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon for light theme
import NightsStayIcon from '@mui/icons-material/NightsStay'; // Moon icon for dark theme
import { Typography } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy'; // Clipboard icon

const App: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const theme = createTheme({
    palette: {
      mode: darkTheme ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const handleCopyExampleToClipboard = () => {
    const exampleText = "What is a computer?";
    navigator.clipboard.writeText(exampleText)
        .catch((error) => {
          console.error('Failed to copy example to clipboard:', error);
        });
  };

  const handleSearchResults = (data: any[]) => {
    setSearchResults(data);
  };

  return (
      <ThemeProvider theme={theme}>
        <div className={`App ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
          <div className="title-container">
            <h1>SuperSearch</h1>
            <p>
              Ask in natural language
            </p>
            <span style={{marginRight:"10px"}}>Example: "What is a computer?"</span>
            <FileCopyIcon style={{ cursor: 'pointer' }} onClick={() => handleCopyExampleToClipboard()} />
          </div>
          <div className="theme-buttons">
            <Button
                onClick={handleThemeChange}
                variant="outlined"
                startIcon={<Brightness7Icon />}
                className={darkTheme ? '' : 'Mui-active'}
            >
            </Button>
            <Button
                onClick={handleThemeChange}
                variant="outlined"
                startIcon={<NightsStayIcon />}
                className={darkTheme ? 'Mui-active' : ''}
            >
            </Button>
          </div>
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <div className="search-bar">
              <SearchBar onSearchResults={handleSearchResults}/>
            </div>
            <Box mt={2}>
              {searchResults.length > 0 ? (
                  <ResultsView data={searchResults} />
              ) : (
                  <Typography variant="body1">No search results found.</Typography>
              )}
            </Box>
          </Box>
        </div>
      </ThemeProvider>
  );
};

export default App;
