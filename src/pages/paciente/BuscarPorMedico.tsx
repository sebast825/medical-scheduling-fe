import { useEffect, useState } from "react";
import { useUserContext } from "../../context/authContext";
import { fetchMedicos, fetchTurnosDisponiblesByMedico } from "../../services/apiService";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import List from "../../Components/List/List";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";

function BuscarPorMedico() {
  const user = useUserContext();
  const [medicos, setMedicos] = useState<IMedicoResponse[]>();
  const [error, setError] = useState<ErrorTypeAny>(null);

  const getMedicos = async () => {
    try {
      const response: IMedicoResponse[] = await fetchMedicos();

      setMedicos(response);
    } catch (err: any) {
      console.log(err);

      setError("Error desconocido");
    }
  };
  useEffect(() => {
    getMedicos();
  }, []);


  const getTurnosDisponiblesByMedico = async (id:string) => {
    try {
      const response: TurnoHorarioDisponibleResponseDTO[]= await fetchTurnosDisponiblesByMedico(user, id)
     console.log(response)
     return response;
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message || "Error desconocido");
      } else {
        setError("Error desconocido");
      }
    }
  };

  function showDiasDisponibles(e: number) {
    
    getTurnosDisponiblesByMedico(e.toString());
  }
  const filterMedicos =
    medicos?.map((medico) => {
      return { nombre: medico.nombre + " " + medico.apellido, id: medico.id };
    }) || [];
  return (
    <div>
      <h2>Buscar Medico</h2>
      <List listItems={filterMedicos} handleSelect={showDiasDisponibles} />
      <div>{error && <p className="text-danger">{error}</p>}</div>
    </div>
  );
}

export default BuscarPorMedico;
