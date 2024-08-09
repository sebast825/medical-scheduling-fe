import { useEffect, useState } from "react";
import Opening from "../../Components/Opening/Opening";
import {
  fetchTurnosPaciente,
  fetchCancelarTurno,
} from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { useUserContext } from "../../context/authContext";
import GetJwtContent from "../../utils/jwtUtils";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import CardPaciente from "../../Components/CardPaciente/CardPaciente";
import { useRedirectToLogin } from "../../routes/navigation";
import { usePersonaInfoContext } from "../../context/authContext";
import ConfirmModal from "../../Components/modals/ConfirmModal";
import {formatDate,getDate,getHour} from "../../utils/formatDate";

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

  //una vez que se elimina el turno desde la card, lo remueve del FE
  async function removerTurnoCancelado(e: number): Promise<void> {
    var removeTurnoCancelado = turnos.filter((turno) => turno.id != e);
    setTurnos(removeTurnoCancelado);
  }

  const [showModal, setShowModal] = useState<boolean>(false);
  const [bodyConfirmModal, setBodyConfirmModal] = useState("");
  const [turnoACancelar, setTurnoACancelar] = useState<TurnoResponse>();

  const handleOpenModal = (turno: TurnoResponse): void => {
    setTurnoACancelar(turno)
    const fechaDividida = turno.fecha.split(" ");
    const date = getDate(turno.fecha);
    const hour = getHour(turno.fecha);
    var body: string = `¿Estás seguro de que deseas cancelar el turno con el medico ${turno.medico}, para la fecha ${date} a las ${hour}?`;
    setBodyConfirmModal(body);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleConfirmAction = (): void => {
    // Acción que deseas confirmar
    if(turnoACancelar){
      cancelarTurno(turnoACancelar.id);
      console.log("Acción confirmada");
    }
    
    
    handleCloseModal();
  };

  async function cancelarTurno(e: number): Promise<void> {
    var params: any = GetJwtContent(user);
    var cancelarTurno = await fetchCancelarTurno(user, e, params.PersonaId);
    if (cancelarTurno.estado == "Cancelada") {
      console.log("turno cancelado");
      if(turnoACancelar){
        removerTurnoCancelado(turnoACancelar.id)

      }
    }
  }

  return (
    <div>
      <Opening title={`Bienvenido ${personaInfo.nombre}`} />
      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={ handleConfirmAction}
        body={bodyConfirmModal}
      />
      <h2>Mis Turnos</h2>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        {turnos.map((turno: TurnoResponse) => (
          <CardPaciente
            key={turno.id}
            turno={turno}
            btnEvent={() => handleOpenModal(turno)}
          />
        ))}
      </div>
      <div>{error && <p className="text-danger">{error}</p>}</div>
    </div>
  );
}

export default PacienteHome;
