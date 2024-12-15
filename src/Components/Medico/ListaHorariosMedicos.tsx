import { useEffect, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import { getDisponibilidadMedicos } from "../../services/apiService";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";
import {
  agruparObjetosPorClave,
} from "../../utils/AgruparObjetosPorClave";

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
      ([key, horarios]) => {
        let splitKey = splitKeyNombreEspecialidad(key);
        return regEx.test(splitKey.nombre) || regEx.test(splitKey.especialidad);
      }
    );
    setHorariosMedicosFiltrados(filteredItems);
  }, [buscarItem, horariosMedicos]);

  async function getMedicos() {
    if (user != null) {
      var horariosAtencionMedicos: DisponibilidadMedico[] =
        await getDisponibilidadMedicos(user);

      var agruparHorariosPorMedico = await agruparObjetosPorClave(
        horariosAtencionMedicos,
        "medico",
        "especialidad"
      );

      setHorariosMedicos(agruparHorariosPorMedico);
    }
  }

  function updateRegEx(e: any) {
    setbuscarItem(e.target.value);
  }
  function splitKeyNombreEspecialidad(key: string): {
    nombre: string;
    especialidad: string;
  } {
    var nombreEspecialidad: string[] = key.split("-");

    var splitKey = {
      nombre: nombreEspecialidad[0],
      especialidad: nombreEspecialidad[1],
    };
    return splitKey;
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
        {horariosMedicosFiltrados.map(([key, horarios]) => (
          <div className="col-12 col-lg-3  mb-3" key={key}>
            <div className="card">
              <div className="card-header text-center">
                <h5>{splitKeyNombreEspecialidad(key).nombre}</h5>
                <h6>{splitKeyNombreEspecialidad(key).especialidad}</h6>
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
