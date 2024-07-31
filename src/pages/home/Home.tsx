import { Button } from "react-bootstrap";
 import FillExample from "../../Components/Nav Bar/NavBar";
import Opening from "../../Components/Opening/Opening";
import { fetchPacientes } from "../../services/apiService";
import { useUserContext,useUserToggleContext } from "../../context/authContext";

function Home() {
  //console.log(fetchPacientes())

  const user = useUserContext();
  const cambiaLogin = useUserToggleContext()
  return (
    <div>

       <FillExample /> 
      <Opening />
      {user && <p>Hola {user}</p>}
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-6 gap-2 d-grid">
            <Button variant="primary" onClick={cambiaLogin} size="lg" className=" w-100">
              Ingresar
            </Button>
            <Button variant="secondary" size="lg" className="w-100">
              Nuestros Médicos
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
