import { useEffect, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import { getDisponibilidadMedicos } from "../../services/apiService";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";
import { agruparObjetosPorClave } from "../../utils/AgruparObjetosPorClave";
import InputRegex from "../General/InputRegex/InputRegex";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import OneButton from "../buttons/oneButton/OneButton";
import HorarioMedicoModal from "../modals/horarioMedicoModal/HorarioMedicoModal";
import useModal from "../../hooks/useModal";
import { text } from "stream/consumers";
import "./ListaHorariosMedicos.scss";
import { IDisponibilidadMedicoUpdateRequest } from "../../types/DisponibilidadMedico/IDisponibilidadMedicoUpdateRequest";
import useDisponibilidadMedicos from "../../hooks/disponibilidadMedicos/useDisponibilidadMedicos";
import CreateHorarioMedicoModal from "../modals/horarioMedicoModal/create/CreateHorarioMedicoModal";
import { DisponibilidadMedicoCreate } from "../../types/DisponibilidadMedico/DisponibilidadMedicoCreate";
import { idText } from "typescript";
function ListaHorariosMedicos() {
  const user = useUserInfo();
  //record conjunto clave valor
  //clave-> nombremedico-especialidad
  const [horariosMedicos, setHorariosMedicos] = useState<
    Record<string, DisponibilidadMedico[]>
  >({});
  const [buscarItem, setbuscarItem] = useState<string>("");
  const [horariosMedicosFiltrados, setHorariosMedicosFiltrados] = useState<
    [string, DisponibilidadMedico[]][]
  >([]);

  const { showModal, closeModal, toggleModal } = useModal();

  const [editarDisponibilidad, setEditarDisponibilidad] =
    useState<DisponibilidadMedico>({
      id: 0,
      medicoId: 0,
      medico: "",
      especialidad: "",
      diaSemana: "",
      startTime: "",
      endTime: "",
    });

  useEffect(() => {
    const executeAsyncTask = async () => {
      await getMedicos();
    };
    executeAsyncTask();
  }, []);

  //filtra los medicos
  useEffect(() => {
    const regEx = new RegExp(`^${buscarItem}`, "i");
    const filteredItems = Object.entries(horariosMedicos).filter(
      ([key, horarios]) => {
        let splitKey = splitKeyNombreEspecialidad(key);
        return regEx.test(splitKey.nombre) || regEx.test(splitKey.especialidad);
      }
    );
    setHorariosMedicosFiltrados(filteredItems);
  }, [buscarItem, horariosMedicos]);

  async function getMedicos() {
    if (user != null) {
      var horariosAtencionMedicos: DisponibilidadMedico[] =
        await getDisponibilidadMedicos(user);

      var agruparHorariosPorMedico = await agruparObjetosPorClave(
        horariosAtencionMedicos,
        "medico",
        "especialidad"
      );

      setHorariosMedicos(agruparHorariosPorMedico);
    }
  }

  function removeDisponibilidadFromRecord(
    id: number
  ): Record<string, DisponibilidadMedico[]> {
    const newRecord: Record<string, DisponibilidadMedico[]> =
      //from entries lo vuelve a covertir a u objeto
      Object.fromEntries(
        Object.entries(horariosMedicos)
          .map(([key, horario]) => [
            key,
            horario.filter((elem) => elem.id != id),
          ])
          //remueve el elemento si no tiene valores
          .filter(([key, value]) => value.length != 0)
      );
    return newRecord;
  }

  function updateDisponibilidadFromRecord(
    dto: DisponibilidadMedico
  ): Record<string, DisponibilidadMedico[]> {
    const newRecord: Record<string, DisponibilidadMedico[]> =
      Object.fromEntries(
        Object.entries(horariosMedicos)
          .map(([key, horario]) => [
            key,
            horario.map((elem) =>
              elem.id === dto.id
                ? { ...elem, startTime: dto.startTime, endTime: dto.endTime }
                : elem
            ),
          ])
         
      );
    return newRecord;
  }

  function splitKeyNombreEspecialidad(key: string): {
    nombre: string;
    especialidad: string;
  } {
    var nombreEspecialidad: string[] = key.split("-");

    var splitKey = {
      nombre: nombreEspecialidad[0],
      especialidad: nombreEspecialidad[1],
    };
    return splitKey;
  }

  const {
    fetchUpdateDisponibilidadMedico,
    fetchCreateDisponibilidadMedico,
    fetchDeleteDisponibilidadMedico,
  } = useDisponibilidadMedicos();

  async function updateDisponibilidadHorario(
    disponibilidadMedicoUpdated: IDisponibilidadMedicoUpdateRequest
  ) {
    var rsta = await fetchUpdateDisponibilidadMedico(
      disponibilidadMedicoUpdated
    );
    await closeModal();
    //await getMedicos();
    if (rsta == undefined) return;
    let updatedList = updateDisponibilidadFromRecord(rsta);
    setHorariosMedicos(updatedList);
  }

  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);

  function closeCreateModal() {
    setToggleCreateModal(false);
  }
  function showCreateModal() {
    setToggleCreateModal(true);
  }

  async function createDisponibilidadHorario(
    disponibilidadMedico: DisponibilidadMedicoCreate
  ) {
    await fetchCreateDisponibilidadMedico(disponibilidadMedico);
    await closeCreateModal();
    await getMedicos();
  }

  async function deleteDisponibilidadHorario(id: number) {
    await fetchDeleteDisponibilidadMedico(id);
    await closeModal();
    // await getMedicos();
    let updateList = removeDisponibilidadFromRecord(id);
    setHorariosMedicos(updateList);
  }
  return (
    <div className="container d-flex  flex-column justify-content-center gap-3 p-2">
      <InputRegex
        placeholder="Buscar medico por nombre o especialidad"
        onFraseRegexChage={setbuscarItem}
      />
      <CreateHorarioMedicoModal
        modalField={editarDisponibilidad}
        show={toggleCreateModal}
        handleClose={closeCreateModal}
        handleConfirm={(e) => createDisponibilidadHorario(e)}
      />
      <HorarioMedicoModal
        modalField={editarDisponibilidad}
        show={toggleModal}
        handleClose={closeModal}
        handleConfirm={(e) => updateDisponibilidadHorario(e)}
        handleDelete={(e) => deleteDisponibilidadHorario(e)}
      />
      <div className=" d-flex flex-column flex-lg-row justify-content-center gap-3">
        {horariosMedicosFiltrados.map(([key, horarios]) => (
          <div className="card col-12 col-lg-3  mb-3" key={key}>
            <div className="card-header d-flex align-items-center  justify-content-center">
              <div className=" text-center ms-auto">
                <h5>{splitKeyNombreEspecialidad(key).nombre}</h5>
                <h6>{splitKeyNombreEspecialidad(key).especialidad}</h6>
              </div>

              <div className="ms-auto">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => showModal()}>
                      Editar Información
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setEditarDisponibilidad(horarios[0]);
                        showCreateModal();
                      }}
                    >
                      Crear Horario
                    </Dropdown.Item>

                    <Dropdown className="hover">
                      <Dropdown.Toggle as={Dropdown.ItemText}>
                        Editar Horario
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {horarios.map((horario, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              setEditarDisponibilidad(horario);
                              showModal();
                            }}
                          >
                            <div className="d-flex justify-content-between">
                              <span style={{ fontWeight: "bold" }}>
                                {" "}
                                {`${horario.diaSemana}: `}{" "}
                              </span>
                              <span>
                                {horario.startTime} - {horario.endTime}
                              </span>
                            </div>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="card-body ">
              {horarios.map((horario, index) => (
                <div className="row mb-2" key={index}>
                  <div className=" col-6">
                    <strong>{horario.diaSemana}</strong>
                  </div>
                  <div className=" col-6 text-center">
                    <span>
                      {horario.startTime} - {horario.endTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ListaHorariosMedicos;
