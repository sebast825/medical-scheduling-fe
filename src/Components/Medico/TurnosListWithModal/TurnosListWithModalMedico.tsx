import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import { getDate, getHour } from "../../../utils/formatDate";
import GetJwtContent from "../../../utils/jwtUtils";
import { fetchCancelarTurno } from "../../../services/apiService";
import { useUserInfo } from "../../../context/authContext";
import ConfirmModal from "../../modals/ConfirmModal";
import { ESTADOS_TURNO } from "../../../utils/estadoTurno";


interface ITurnosListWithModalMedico {
  turnosList: TurnoResponse[];
}

function TurnosListWithModalMedico(props: ITurnosListWithModalMedico) {
  const { turnosList } = props;

  const user = useUserInfo();

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
      removerTurnoCancelado(turnoACancelar.id);
    }

    handleCloseModal();
  };

  async function cancelarTurno(e: number): Promise<void> {

    if(user == null)return;

    var params: any = GetJwtContent(user);
    var cancelarTurno = await fetchCancelarTurno(user, e);
    if (cancelarTurno.estado == ESTADOS_TURNO.CANCELADO) {
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
      
     
    </>
  );
}

export default TurnosListWithModalMedico;


/*     <TurnosList turnos={turnos} handleOpenModal={handleOpenModal} />
 */