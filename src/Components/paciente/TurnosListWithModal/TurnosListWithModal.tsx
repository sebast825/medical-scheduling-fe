import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import { formatDateFromResponseDto, getDate, getHour, IDateFormated } from "../../../utils/formatDate";
import GetJwtContent from "../../../utils/jwtUtils";
import { fetchCancelarTurno } from "../../../services/apiService";
import { useUserInfo } from "../../../context/authContext";
import ConfirmModal from "../../modals/ConfirmModal";
//import turnosListList from "../turnosListList/turnosListList";
import { ESTADOS_TURNO } from "../../../utils/estadoTurno";
import TurnosList from "../TurnosList/TurnosList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useToastit from "../../../hooks/useToastit";
import { successMessagges } from "../../../constants/successMessages";

interface ITurnosListWithModal {
  turnosList: TurnoResponse[];
  handleDelete : (e : number)=> void;
}

function TurnosListWithModal(props: ITurnosListWithModal) {
  const { turnosList,handleDelete} = props;

  const user = useUserInfo();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [bodyConfirmModal, setBodyConfirmModal] = useState("");
  const [turnoACancelar, setTurnoACancelar] = useState<TurnoResponse>();
  

  const handleOpenModal = (turno: TurnoResponse): void => {
    setTurnoACancelar(turno);
      let formatFecha : IDateFormated = formatDateFromResponseDto(turno.fecha);
    
    const date = formatFecha.date;
    const hour = formatFecha.time;
    var body: string = `¿Estás seguro de que deseas cancelar el turno con el medico ${turno.medico}, para la fecha ${date} a las ${hour}?`;
    setBodyConfirmModal(body);
    setShowModal(true);
  };

  //una vez que se elimina el turno desde la card, lo remueve del FE
  async function removerTurnoCancelado(e: number): Promise<void> {
   if(!turnosList)return;
   handleDelete(e);
    var removeTurnoCancelado = turnosList.filter((turno) => turno.id != e);

  }
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmAction = (): void => {
    // Acción que deseas confirmar
    if (turnoACancelar) {
      cancelarTurno(turnoACancelar.id);
    }

    handleCloseModal();
  };

  const {success} = useToastit()
  async function cancelarTurno(e: number): Promise<void> {
    if(user == null || turnoACancelar == null)return;

    var cancelarTurno = await fetchCancelarTurno(user, turnoACancelar.id);
    if (cancelarTurno.estado == ESTADOS_TURNO.CANCELADO) {

        removerTurnoCancelado(turnoACancelar.id);
        success(successMessagges.turnoEliminado);
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
      
      <TurnosList turnos={turnosList} handleOpenModal={handleOpenModal} />
     
    </>
  );
}

export default TurnosListWithModal;
