import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import NavBar from './components/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <NavBar />
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
