import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import List from "../../Lists/List/List";
import ListOpening from "../../Lists/ListOpening/ListOpening";
import ListHorarios from "../ListHorarios/ListHorarios";

interface IListEspecialidades {
  listMedicos: IMedicoResponse[];
  getMedicosByEspecialidadSelected: (
    listaMedicos: IMedicoResponse[],
    especialdiadSelect: string
  ) => void;
}

function ListEspecialidades({
  listMedicos,
  getMedicosByEspecialidadSelected,
}: IListEspecialidades) {
  //objete medicos filtrado, solo con los datos necesarios

  const especialidadUnica = listMedicos.reduce<IMedicoResponse[]>(
    (acc, current) => {
      if (!acc.some((obj) => obj.especialidad == current.especialidad)) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  const especialidadUnicaObjeto = especialidadUnica
  //le saca la info redundante
    .map((medico) => {
      return { nombre: medico.especialidad, id: medico.id };
    })
    //ordena por nombre
    .sort((ant, act) => {
      return ant.nombre.localeCompare(act.nombre);
    });

  function filterMedicosByEspecialidad(e: number) {
    const especialdiadSeleccionada = especialidadUnica.find(
      (elem) => elem.id == e
    );
    const medicosEspecialidadSeleccionada = listMedicos.filter(
      (medico) => medico.especialidad == especialdiadSeleccionada?.especialidad
    );
    if (especialdiadSeleccionada)
      getMedicosByEspecialidadSelected(
        medicosEspecialidadSeleccionada,
        especialdiadSeleccionada?.especialidad
      );
  }

  return (
    <>
      <List
        listItems={especialidadUnicaObjeto}
        handleSelect={filterMedicosByEspecialidad}
      />
    </>
  );
}

export default ListEspecialidades;
