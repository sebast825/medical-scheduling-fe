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
function ListaHorariosMedicos() {
  const user = useUserInfo();
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

  useEffect(() => {
    console.log(editarDisponibilidad)
    showModal();
  }, [editarDisponibilidad]);

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

  function primerFiltrado(): DisponibilidadMedico {
    const primerDisponibilidadMedico = {
      id: 1,
      medico: "Dr. Juan Pérez",
      especialidad: "Cardiología",
      diaSemana: "Lunes",
      startTime: "08:00",
      endTime: "12:00",
    };
    return primerDisponibilidadMedico;
  }
  return (
    <div className="container d-flex  flex-column justify-content-center gap-3 p-2">
      <InputRegex
        placeholder="Buscar medico por nombre o especialidad"
        onFraseRegexChage={setbuscarItem}
      />
      <HorarioMedicoModal
        modalField={editarDisponibilidad}
        show={toggleModal}
        handleClose={closeModal}
        handleConfirm={function (personaResponse: DisponibilidadMedico): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className=" d-flex flex-column flex-lg-row justify-content-center gap-3">
        {horariosMedicosFiltrados.map(([key, horarios]) => (
          <div className="col-12 col-lg-4  mb-3" key={key}>
            <div className="card">
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
                              }}
                            >
                              {horario.diaSemana}: {horario.startTime} -{" "}
                              {horario.endTime}
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
          </div>
        ))}
      </div>
    </div>
  );
}
export default ListaHorariosMedicos;
