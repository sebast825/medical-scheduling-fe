
import {BrowserRouter as Router, } from "react-router-dom"
import { Suspense } from 'react';
import { Spinner } from './Components/statics/Spinner';
import './App.scss';
import { UserProvider } from './context/authContext';
import Footer from './Components/General/Footer/Footer';
import AppContent from './pages/AppContent';


function App() {

 
  return (

    
    <UserProvider>

    <div className="App">
       <Router>
      {/* suspense es para usar el lazy loading
      y el fallback se le pasa un componente que muestra mientras se carga la app */}
      <Suspense fallback={<Spinner/>}>
<AppContent/>

      </Suspense>
    </Router>
       
    </div>
    </UserProvider>

  );
}

export default App;
