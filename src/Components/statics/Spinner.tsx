import "./Spinner.scss";

export function Spinner() {
  return (
    <div className="contenedor d-flex justify-content-center align-items-center flex-column">
      <div className=" spinner-wrapper">

      <img src="/images/logoWhite.png" className="spinner-bounce  " alt="Logo" style={{ height: "100px" }} />

      </div>

      <h2 className="text title">Clinica Horizonte</h2>
      <h4 className="text subTitle">Cargando</h4>
    </div>
  );
}
