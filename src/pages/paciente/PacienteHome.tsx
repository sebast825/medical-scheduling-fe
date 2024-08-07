import { useEffect, useState } from "react";
import Opening from "../../Components/Opening/Opening";
import { fetchTurnosPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { useUserContext } from "../../context/authContext";
import GetJwtContent from "../../utils/jwtUtils";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import CardPaciente from "../../Components/CardPaciente/CardPaciente";
import { useRedirectToLogin } from "../../routes/navigation";
import { usePersonaInfoContext } from "../../context/authContext";

function PacienteHome() {
  const user = useUserContext();
  const [error, setError] = useState<ErrorTypeAny>(null);
  const [turnos, setTurnos] = useState<TurnoResponse[]>([]);
  const { personaInfo } = usePersonaInfoContext();

  const redirectToLogin = useRedirectToLogin();

  useEffect(() => {
    user == null ? redirectToLogin() : getPacinteTurnos();
  }, []);

  const getPacinteTurnos = async () => {
    try {
      var params: any = GetJwtContent(user);
      const response: TurnoResponse[] = await fetchTurnosPaciente(
        user,
        params.PersonaId
      );
      setTurnos(response);
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message || "Error desconocido");
      } else {
        setError("Error desconocido");
      }
    }
  };

  return (
    <div>
      <Opening title={`Bienvenido ${personaInfo.nombre}`} />

      <h2>Mis Turnos</h2>
      <div>
        {turnos.map((turno: TurnoResponse) => (
          <CardPaciente
            nombre={turno.medico}
            especialidad={turno.especialidad}
            fecha={turno.fecha.toString()}
          />
        ))}
      </div>
      <div>{error && <p className="text-danger">{error}</p>}</div>
    </div>
  );
}

export default PacienteHome;
