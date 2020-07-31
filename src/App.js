import React from 'react';
import './App.css';
import UserForm from './components/UserForm';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({});

function App() {
  const [isAdmin, setIsAdmin] = React.useState(true);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserForm isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      </ThemeProvider>
    </div>
  );
}

export default App;
