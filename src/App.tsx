import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router } from "react-router-dom"
import { Suspense } from 'react';
import { Spinner } from './Components/statics/Spinner';
import AppRouter from './Router';
import './App.scss';
import { UserProvider } from './context/authContext';
import FillExample from './Components/Nav Bar/NavBar';
function App() {
  return (
    <UserProvider>

    <div className="App">
       <Router>
      {/* suspense es para usar el lazy loading
      y el fallback se le pasa un componente que muestra mientras se carga la app */}
      <Suspense fallback={<Spinner/>}>
      <FillExample /> 

        <AppRouter/>
      </Suspense>
    </Router>

    </div>
    </UserProvider>

  );
}

export default App;
