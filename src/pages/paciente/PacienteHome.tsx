import { useEffect, useState } from "react";
import Opening from "../../Components/Opening/Opening";
import { fetchTurnosPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { useUserContext } from "../../context/authContext";
import GetJwtContent
 from "../../utils/jwtUtils";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import CardPaciente from "../../Components/CardPaciente/CardPaciente";

function PacienteHome() {
   const user = useUserContext();
  const [error , setError] = useState<ErrorTypeAny>(null);
  const [turnos, setTurnos] = useState<TurnoResponse[]>([]);
  useEffect(() => {
    const getPacinteTurnos = async () => {
      console.log("logasdasdo")

      try {
         var params: any = GetJwtContent(user);
        const response : TurnoResponse[] = await fetchTurnosPaciente(user,params.PersonaId);
         setTurnos(response);
      } catch (err: any) {
         if(err.response.status == 401){
            setError(err.response.data.message || "Error desconocido");

         }else{
            setError("loguiate capo")
            console.log(err);
         }
  
      }
    };
    getPacinteTurnos();

  }, []);
  return (
    <div>
      <Opening title="asdasd" subTitle="sanders" />

      <h2>Mis Turnos</h2>
      <div>
       {turnos.map((turno : TurnoResponse)=> (

            <CardPaciente nombre={turno.medico} especialidad={turno.especialidad} fecha={(turno.fecha).toString()}/>
         ))}
      </div>
      <div>
         
     
         {error && <p className="text-danger">{error}</p>}</div>
    </div>
  );
}

export default PacienteHome;
