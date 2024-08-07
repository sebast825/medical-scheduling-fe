import { Button } from "react-bootstrap";
 import FillExample from "../Components/Nav Bar/NavBar";
import Opening from "../Components/Opening/Opening";
import { fetchPacientes } from "../services/apiService";
import { useUserContext,useUserToggleContext,usePersonaInfoContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
function Home() {

  const {personaInfo} = usePersonaInfoContext()
  const cambiaLogin = useUserToggleContext()
  const navigate = useNavigate();

  const RedirectListadoMedicos = ()=>
  {
    navigate("/nuestrosMedicos")
  } 
  const RedirectLogin = ()=>
    {
      navigate("/login")
    } 
  return (
    <div>

       {/* <FillExample />  */}
      <Opening />
      {personaInfo && <p>Hola {personaInfo.nombre}</p>}
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-6 gap-2 d-grid">
            <Button variant="primary" onClick={RedirectLogin} size="lg" className=" w-100">
              Ingresar
            </Button>
            <Button variant="secondary" onClick={RedirectListadoMedicos} size="lg" className="w-100">
              Nuestros Médicos
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
