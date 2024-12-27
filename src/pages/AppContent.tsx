import { useLocation } from "react-router-dom";
import Footer from "../Components/General/Footer/Footer";
import AppRouter from "../routes/Router";
import NavBar from "../Components/General/Nav Bar/NavBar";

// Componente principal con verificación de ruta
function AppContent() {
   
  const location = useLocation();
  const hiddenRoutes = ["/login", "/register"];

  const hideFooter = hiddenRoutes.includes(location.pathname);

  return (
    <>
      <NavBar />
      <AppRouter />
      {!hideFooter && <Footer />}
    </>
  );
}

export default AppContent;
