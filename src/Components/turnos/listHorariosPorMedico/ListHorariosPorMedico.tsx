import { IMedicoResponse } from "../../../types/MedicoResponse.type";
import { TurnoHorarioDisponibleResponseDTO } from "../../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { getDate } from "../../../utils/formatDate";
import BackLink from "../../buttons/BackLink/BackLink";
import Opening from "../../General/Opening/Opening";
import CardMedicoHorarios from "../../turno/cardMedicoHorarios/CardMedicoHorarios";

interface IListHorariosPorMedico {
  horariosPorMedico: TurnoHorarioDisponibleResponseDTO[];
  handleSelect: (horario: string, idMedico:number) => void;
  medicos: IMedicoResponse[];
}

function ListHorariosPorMedico({
  horariosPorMedico,
  handleSelect,
  medicos,
}: IListHorariosPorMedico) {


  var objMedicos = horariosPorMedico?.map((obj) => {
    var medicoActual: IMedicoResponse | undefined = medicos.find(
      (medico) => medico.id == obj.medicoId
    );
    if (medicoActual)
      return {
        ...obj,
        medico: `${medicoActual.nombre} ${medicoActual.apellido}`,
      };
  });

   function asd (horario: string, medicoId:number){
console.log(horario,medicoId)
  }
  return (
    <>

 
     <div className="d-flex flex-wrap justify-content-center gap-3">

     {objMedicos &&
        objMedicos.map(
          (horarioMedico) =>
            horarioMedico && (
              <CardMedicoHorarios
                key={horarioMedico.medicoId}
                TurnoHorarioResponse={horarioMedico}
                handleSelect={handleSelect}
                nombreMedico={horarioMedico.medico}
              />
            )
        )}

     </div>
 
      <BackLink />
    </>
  );
}

export default ListHorariosPorMedico;
