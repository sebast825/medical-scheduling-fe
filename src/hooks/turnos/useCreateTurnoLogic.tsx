import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePacienteContext, useUserInfo } from "../../context/authContext";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { getDate } from "../../utils/formatDate";
import GetJwtContent from "../../utils/jwtUtils";
import useIsPaciente from "../roles/useIsPaciente";
import useIsSecretario from "../roles/useIsSecretario";
import useModal from "../useModal";
import useRedirects from "../useRedicrects";
import useGetTurnos from "./useGetTurnos";
import useMedicosCacheQuery from "../medicos/useMedicosCacheQuery";
import useTurnosPacienteCacheQuery from "./useTurnosPacienteCacheQuery";
import { spinnerMessages } from "../../constants/spinnerMessages";
import useToastit from "../useToastit";
import { handleHttpError } from "../../utils/errorHandler";

function useCreateTurnoLogic(filterBy: string) {
  /*
    0- getMedicos trae un listado con todos los medicos
    2- al seleccionar el medico hace un pedido a getTurnosDisponiblesByMedico y trae sus turnos disponibles  
    2-  se activa useffect[turnosDisponibles] y llama a filtrarTurnos (se puede psar a componente filtrarTurnos)
    3- filtrarTurnos indica los dias disponibles que el medico puede tomar turnos
    4- handleDiaSelect busca  los horarios disponibles para la fecha seleccionada // checkiar si hace falta convertirlo
    5 - se activa useffect[showTurnosDisponibles], muestra el listado de horarios
    6 - handleHorarioSelect -> llama al hook para crear un turno
  */

  const user = useUserInfo();
  const [componenteActivo, setComponenteActivo] = useState<string>(filterBy); // 'componente1', 'componente2', 'componente3'
  const [showTurnosDisponibles, setShowTurnosDisponiblesHorarios] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
  const [medicoSelect, setMedicoSelect] = useState<IMedicoResponse>();
  const [createTurnoRequest, setCreateTurnoRequest] =
    useState<ITurnoCreateRequestDTO>({
      MedicoId: 0,
      PacienteId: 0,
      Fecha: "",
    });
  const [titleOening, setTitleOening] = useState<string>("");
  const [subtitleOening, setSubtitleOening] = useState<string>("");
  const { pacienteInfo } = usePacienteContext();
  const [msgeSpinner, setMsgeSpinner] = useState<string>("");

  const navigate = useNavigate();
  const { redirectToSecretarioHome, redirectToPacienteHome } = useRedirects();
  const { medicos, isLoading } = useMedicosCacheQuery();
  const { showModal, toggleModal, closeModal } = useModal();
  const isSecretario = useIsSecretario();
  const isPaciente = useIsPaciente();
  const { addTurnoCache } = useTurnosPacienteCacheQuery(pacienteInfo?.id.toString());
  const {
    getTurnosDisponiblesByMedico,
    crearTurno,
    turnosDisponibles,
    getTurnosDisponiblesByEspecialidad,
  } = useGetTurnos();
  const [loadingDisponibilidades, setLoadingDisponibilidades] =
    useState<boolean>(false);
  const { error, success } = useToastit();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  //en caso que se cambie de filtro, como la url se mantiene hay que volver a renderizarlo, si no se manetiene el mismo componente
  useEffect(() => {
    setComponenteActivo(filterBy);
  }, [filterBy]);

  useEffect(() => {

    setSubtitleOening("");
    switch (componenteActivo) {
      case "0":
        setMsgeSpinner(spinnerMessages.cargarMedicos);
        setTitleOening("Seleccionar Medico");
        break;
      case "1":
        setMsgeSpinner(spinnerMessages.cargarMedicos);

        setTitleOening("Seleccionar Especialidad");
        break;

      case "2":

        setTitleOening("Seleccionar Fecha");

        break;
      case "3":
        setTitleOening("Seleccionar Horario");
        var str = getDate(
          showTurnosDisponibles
            ? showTurnosDisponibles[0]?.fecha.toString()
            : ""
        );
        setSubtitleOening("Fecha: " + str);
        break;
    }
  }, [componenteActivo]);

  //al seleccionar una fecha en el calendario llama aca - viene de handleDiaSelect
  useEffect(() => {
    if (showTurnosDisponibles) {
      setComponenteActivo("3");
    }
  }, [showTurnosDisponibles]);


  async function showDiasDisponibles(e: number) {
    setMsgeSpinner(spinnerMessages.cargarFechas);
    setLoadingDisponibilidades(true);
    try {
      await getTurnosDisponiblesByMedico(e.toString());
      setComponenteActivo("2");
    } catch (err) {
      error(handleHttpError(err));
    } finally {
      setLoadingDisponibilidades(false);
    }
  }


  function handleDiaSelect(e: string) {
    if (typeof e == "string") {
      var selectHorarios = turnosDisponibles?.filter(
        (elem) => getDate(elem.fecha.toString()) == getDate(e)
      );
      setShowTurnosDisponiblesHorarios(selectHorarios);
    }
  }

  function handleHorarioSelect(horario: string, medicoId: number) {
    if (user == null) return;
    var pacienteId: number = Number(pacienteInfo?.id);
    setCreateTurnoRequest({
      MedicoId: medicoId,
      Fecha: horario,
      PacienteId: pacienteId,
    });
    //muestra en el modal al medico
    setMedicoSelect(findMedicoById(medicoId));
    showModal();
  }
  function findMedicoById(id: number): IMedicoResponse | undefined {
    var medicoSelected = medicos?.find((elem) => elem.id == id);
    return medicoSelected ? medicoSelected : undefined;
  }

  async function handleConfirmCreateTurnoModal() {
    try {
      const response = await crearTurno(createTurnoRequest);
      addTurnoCache(response);
      success("Turno agendado exitosamente.");

      setCreateTurnoRequest(prev => ({ ...prev, MedicoId: 0, PacienteId: 0 }));

      setTimeout(() => {
        if (isPaciente) {
          navigate("/pacientes");
          redirectToPacienteHome();
        }
        if (isSecretario) {
          redirectToSecretarioHome();
        }
        closeModal();
      }, 100);
    } catch (err) {
      error(handleHttpError(err));
    }
  }
  async function showDiasDisponiblesEspecialidad(
    especiliadSelect: string
  ): Promise<void> {
    setMsgeSpinner(spinnerMessages.cargarFechas);
    setLoadingDisponibilidades(true);

    await getTurnosDisponiblesByEspecialidad(especiliadSelect);
    setComponenteActivo("2");
    setLoadingDisponibilidades(false);
  }

  return {
    medicoSelect,
    toggleModal,
    closeModal,
    handleConfirmCreateTurnoModal,
    createTurnoRequest,
    componenteActivo,
    medicos,
    showDiasDisponibles,
    showDiasDisponiblesEspecialidad,
    handleDiaSelect,
    turnosDisponibles,
    subtitleOening,
    handleHorarioSelect,
    showTurnosDisponibles,
    isLoading,
    msgeSpinner,
    loadingDisponibilidades,
  };
}

export default useCreateTurnoLogic;
