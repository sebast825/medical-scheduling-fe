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
        setMsgeSpinner(spinnerMessages.cargarFechas);

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
    setLoadingDisponibilidades(true);
    await getTurnosDisponiblesByMedico(e.toString());
    var nombreMedico = medicos?.find((elem) => elem.id === e);
    setComponenteActivo("2");
    setLoadingDisponibilidades(false);
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
    var response = await crearTurno(createTurnoRequest);
    if (response != undefined) {
      addTurnoCache(response);
    }
    //evita que la funcion sea llamada veces extra, reinicia las variables una vez que el turno fue creado
    setCreateTurnoRequest((prevState) => ({
      ...prevState,
      MedicoId: 0,
      PacienteId: 0,
    }));
    setTimeout(() => {
      //al hacer el redirect vuelve a llamar a getAll para que esten los turnos actualizados
      if (isPaciente) {
        navigate("/pacientes");
        redirectToPacienteHome();
      }
      if (isSecretario) {
        redirectToSecretarioHome();
      }
      closeModal();
    }, 100);
  }

  async function showDiasDisponiblesEspecialidad(
    listaMedicos: IMedicoResponse[],
    especiliadSelect: string
  ): Promise<void> {
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
