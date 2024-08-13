import { IMedicoResponse } from "../../../types/MedicoResponse.type";
import ListOpening from "../../Lists/ListOpening/ListOpening";
import ListHorarios from "../../turno/ListHorarios/ListHorarios";

interface IListEspecialidades {
  listMedicos: IMedicoResponse[];
  getMedicosByEspecialidadSelected: (listaMedicos : IMedicoResponse[]) => void;
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

  const especialidadUnicaObjeto =
  especialidadUnica.map((medico) => {
      return { nombre: medico.especialidad, id: medico.id };
    }) ;

  function filterMedicosByEspecialidad(e:number){
   const especialdiadSeleccionada = especialidadUnica.find(elem => elem.id == e);
   const medicosEspecialidadSeleccionada = listMedicos.filter(medico => medico.especialidad == especialdiadSeleccionada?.especialidad );
   getMedicosByEspecialidadSelected(medicosEspecialidadSeleccionada);
  }

  return (
    <>
      <ListOpening
        title="Seleccionar Especialidad"
        listItems={especialidadUnicaObjeto}
        handleSelect={filterMedicosByEspecialidad}
      />
    </>
  );
}

export default ListEspecialidades;
