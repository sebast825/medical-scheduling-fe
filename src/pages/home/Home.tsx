import { Button } from "react-bootstrap";
 import FillExample from "../../Components/Nav Bar/NavBar";
import Opening from "../../Components/Opening/Opening";

function Home() {
  return (
    <div>

       <FillExample /> 
      <Opening />
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-6 gap-2 d-grid">
            <Button variant="primary" size="lg" className=" w-100">
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
