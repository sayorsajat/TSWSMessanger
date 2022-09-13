import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import NavBar from './components/NavBar';

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <NavBar />
      </ThemeProvider>
    </div>
  );
}

export default App;
