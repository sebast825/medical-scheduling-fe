import { useEffect, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import { getDisponibilidadMedicos } from "../../services/apiService";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";
import agruparObjetosPorClave from "../../utils/AgruparObjetosPorClave";

function ListaHorariosMedicos() {
  const user = useUserInfo();
  const [horariosMedicos, setHorariosMedicos] = useState<
    Record<string, DisponibilidadMedico[]>
  >({});
  const [buscarItem, setbuscarItem] = useState<string>("");
  const [horariosMedicosFiltrados, setHorariosMedicosFiltrados] = useState<
    [string, DisponibilidadMedico[]][]
  >([]);

  useEffect(() => {
    const executeAsyncTask = async () => {
      await getMedicos();
    };
    executeAsyncTask();
  }, []);

  //filtra los medicos
  useEffect(() => {
    const regEx = new RegExp(`^${buscarItem}`, "i");
    const filteredItems = Object.entries(horariosMedicos).filter(
      ([medico, horarios]) => regEx.test(medico)
    );
    setHorariosMedicosFiltrados(filteredItems);
  }, [buscarItem, horariosMedicos]);



  async function getMedicos() {
    if (user != null) {
      var horariosAtencionMedicos: DisponibilidadMedico[] =
        await getDisponibilidadMedicos(user);
      console.log(horariosAtencionMedicos);

      var agruparHorariosPorMedico = await agruparObjetosPorClave(
        horariosAtencionMedicos,
        "medico"
      );

      setHorariosMedicos(agruparHorariosPorMedico);
    }
  }

  function iterarHorarios(grupo: Record<string, DisponibilidadMedico[]>) {
    // `Object.entries` devuelve un array de pares [clave, valor]
    Object.entries(grupo).forEach(([medico, horarios]) => {
      console.log(medico);
      horarios.forEach((horario) => {
        console.log(horario);
      });
    });
  }
  
  function updateRegEx(e: any) {
    setbuscarItem(e.target.value);
  }

  return (
    <div className="container d-flex  flex-column justify-content-center gap-3 ">
      <div className="row m-1">
        <input
          className="form-control  input-con-lupa"
          placeholder="Buscar por especialidad o médico"
          type="text"
          value={buscarItem}
          onChange={(e) => updateRegEx(e)}
          //  style={{ width: "350px", minWidth: "300px" }}
        />
      </div>

      <div className=" d-flex flex-column flex-lg-row justify-content-center gap-3">
        {horariosMedicosFiltrados.map(([medico, horarios]) => (
          <div className="col-12 col-lg-3  mb-3" key={medico}>
            <div className="card">
              <div className="card-header text-center">
                <h5>{medico}</h5>
              </div>
              <div className="card-body ps-5 pe-5 ">
                {horarios.map((horario, index) => (
                  <div className="row mb-2" key={index}>
                    <div className=" col-6 ">
                      <strong>{horario.diaSemana}</strong>
                    </div>
                    <div className=" col-6 text-center">
                      <span>
                        {horario.startTime} - {horario.endTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ListaHorariosMedicos;
