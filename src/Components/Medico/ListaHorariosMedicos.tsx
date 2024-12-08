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

  useEffect(() => {
    const executeAsyncTask = async () => {
      await getMedicos();
    };
    executeAsyncTask();
  }, []);

  async function getMedicos() {
    if (user != null) {
      var horariosAtencionMedicos: DisponibilidadMedico[] =
        await getDisponibilidadMedicos(user);

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

  return (
<div className="container">
  <div className="row">
    {Object.entries(horariosMedicos).map(([medico, horarios]) => (
      <div className="col-12 col-md-4 mb-3" key={medico}>
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
                  <span>{horario.startTime} - {horario.endTime}</span>
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
