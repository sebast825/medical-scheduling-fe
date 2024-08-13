import { IMedicoResponse } from "../../../types/MedicoResponse.type";
import { TurnoHorarioDisponibleResponseDTO } from "../../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import SeleccionarHorario from "../../turno/SeleccionarHorario/SeleccionarHorario";

interface IListHorariosPorMedico {
  horariosPorMedico: TurnoHorarioDisponibleResponseDTO[];
  handleSelect: (horario:string) => void;
  medicos : IMedicoResponse[];
}

function ListHorariosPorMedico({
  horariosPorMedico,
  handleSelect,
  medicos
}: IListHorariosPorMedico) {

 var asdasd = horariosPorMedico?.map(obj => {
       var medicoActual :IMedicoResponse | undefined= medicos.find(medico=> medico.id == obj.medicoId );
       if(medicoActual)
       return {
          ...obj,
         medico: `${medicoActual.nombre} ${medicoActual.apellido}`}
   })
return (
   <>
     {asdasd && asdasd.map((horarioMedico) => (
      horarioMedico &&
       <SeleccionarHorario
         key={horarioMedico.medicoId} // Asegúrate de que 'id' esté disponible y sea único
         showTurnosDisponibles={horarioMedico}
         handleHorarioSelect={handleSelect}
         nombreMedico={horarioMedico?.medico}
       />
     ))}
   </>
 );
}


export default ListHorariosPorMedico;
