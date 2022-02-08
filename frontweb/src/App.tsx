import './assets/styles/custom.scss'; // estilos customizados do Bootstrap
import './App.css'; // estilos globais
import 'react-toastify/dist/ReactToastify.css';

import Routes from 'Routes';
import { useState } from 'react';
import { AuthContext, AuthContextData } from 'AuthContext';
import { ToastContainer } from 'react-toastify';

/**
 * Função principal a ser renderizada.
 */
const App = function () {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  const authContextType = { authContextData, setAuthContextData };

  return (
    <AuthContext.Provider value={authContextType}>
      <Routes />
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default App;
