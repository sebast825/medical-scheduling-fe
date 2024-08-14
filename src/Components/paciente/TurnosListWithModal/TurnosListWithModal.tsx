import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import { getDate, getHour } from "../../../utils/formatDate";
import GetJwtContent from "../../../utils/jwtUtils";
import { fetchCancelarTurno } from "../../../services/apiService";
import { useUserContext } from "../../../context/authContext";
import ConfirmModal from "../../modals/ConfirmModal";
import CardPaciente from "../CardPaciente/CardPaciente";
import TurnosList from "../TurnosList/TurnosList";
import { ESTADOS_TURNO } from "../../../utils/estadoTurno";


interface ITurnosListWithModal {
  turnosList: TurnoResponse[];
}

function TurnosListWithModal(props: ITurnosListWithModal) {
  const { turnosList } = props;

  const user = useUserContext();

  const [turnos, setTurnos] = useState<TurnoResponse[]>(turnosList);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bodyConfirmModal, setBodyConfirmModal] = useState("");
  const [turnoACancelar, setTurnoACancelar] = useState<TurnoResponse>();

  useEffect(() => {
    setTurnos(turnosList);
  }, [turnosList]);


  const handleOpenModal = (turno: TurnoResponse): void => {
    setTurnoACancelar(turno);

    const date = getDate(turno.fecha);
    const hour = getHour(turno.fecha);
    var body: string = `¿Estás seguro de que deseas cancelar el turno con el medico ${turno.medico}, para la fecha ${date} a las ${hour}?`;
    setBodyConfirmModal(body);
    setShowModal(true);
  };

  //una vez que se elimina el turno desde la card, lo remueve del FE
  async function removerTurnoCancelado(e: number): Promise<void> {
   if(!turnos)return;
    var removeTurnoCancelado = turnos.filter((turno) => turno.id != e);
    setTurnos(removeTurnoCancelado);
  }
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmAction = (): void => {
    // Acción que deseas confirmar
    if (turnoACancelar) {
      cancelarTurno(turnoACancelar.id);
      console.log("Acción confirmada");
    }

    handleCloseModal();
  };

  async function cancelarTurno(e: number): Promise<void> {
    var params: any = GetJwtContent(user);
    var cancelarTurno = await fetchCancelarTurno(user, e, params.PersonaId);
    if (cancelarTurno.estado == ESTADOS_TURNO.CANCELADO) {
      console.log("turno cancelado");
      if (turnoACancelar) {
        removerTurnoCancelado(turnoACancelar.id);
      }
    }
  }

  return (
    <>
      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmAction}
        body={bodyConfirmModal}
      />
      
      <TurnosList turnos={turnos} handleOpenModal={handleOpenModal} />
     
    </>
  );
}

export default TurnosListWithModal;
