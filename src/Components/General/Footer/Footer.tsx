import "./Footer.scss";

function Footer() {

  return (
    <div className="footer text-center">
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
      <div className="pt-4 ">
        <h6>
          Desarrollado por Sebastián Molina
        
        </h6>

        <h6>
        <a
            href="https://www.linkedin.com/in/sebastian-molina97/"
            className="link"
            target="_blank"
          >
            Contacto
          </a>

        </h6>
      </div>
    </div>
  );
}

export default Footer;
