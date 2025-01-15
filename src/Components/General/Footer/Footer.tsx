import LineTitle from "../LineTitle/LineTitle";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <div className="footer text-center d-flex gap-3  flex-column">
      <div>
        <img src="/images/logoWhite.png" style={{ height: "60px" }}></img>
      </div>

      <div
        className=" d-flex align-self-center flex-column "
        style={{ maxWidth: "1100px" }}
      >
        <p>
          Este sitio web es una demostración de una aplicación de gestión de
          turnos médicos. El acceso a este sitio es exclusivo para fines de
          demostración y evaluación. Los datos presentados en este sitio son
          ficticios y se utilizan únicamente con fines demostrativos.
        </p>
        <p>
          Importante: Este sitio no tiene ninguna relación con sistemas reales
          de gestión de turnos médicos ni con ninguna entidad médica o
          profesional. Los datos de pacientes, médicos y turnos son ejemplos
          generados para ilustrar el funcionamiento de la aplicación.
        </p>
      </div>
      <LineTitle />

      <div>
        <h5 className="firma ">
          Desarrollado por{" "}
          <span style={{ fontStyle: "italic", fontFamily: "serif" }}>
            Sebastián Molina
          </span>
        </h5>

        <h6>
          <div className="p-2">
            <a
              href="https://www.linkedin.com/in/sebastian-molina97/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} className="icon" />{" "}
            </a>
          </div>

       
        </h6>
      </div>
    </div>
  );
}

export default Footer;
