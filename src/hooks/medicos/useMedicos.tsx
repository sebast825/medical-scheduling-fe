import { useState, useCallback } from "react";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import {
  fecthGetEspecialidadesMedico,
  fecthUpdateMedico,
  fetchMedicos,
} from "../../services/apiService";
import { useMedicoInfoContext, useUserInfo } from "../../context/authContext";
import { MedicoUpdateRequestDTO } from "../../types/Medico/MedicoUpdateRequest.type";
import { EspecialidadResponse } from "../../types/Especialidad/EspecialidadResponse.type";
import useToastit from "../useToastit";
import { handleHttpError } from "../../utils/errorHandler";
import { successMessagges } from "../../constants/successMessages";

const useMedicos = () => {
  const [medicos, setMedicos] = useState<IMedicoResponse[] | undefined>(
    undefined
  );
  const { error, success } = useToastit();

  const user = useUserInfo();
  const { setMedicoInfo } = useMedicoInfoContext();


  const getMedicos = useCallback(async () : Promise<IMedicoResponse[] | []>=> {
    try {
      const response: IMedicoResponse[] = await fetchMedicos();
    
      setMedicos(sortByName(response));
      return response || [] ;  
    } catch (err: any) {
      error(handleHttpError(err));
      return []
    }
  }, []);

  function sortByName(medicoList : IMedicoResponse[]){
    return medicoList.sort((ant,act)=>{
      return ant.nombre.localeCompare(act.nombre);
    } )
  }
  function findMedicoById(id: number): IMedicoResponse | undefined {
    var medicoSelected = medicos?.find((elem) => elem.id == id);
    return medicoSelected ? medicoSelected : undefined;
  }

  function getMedicoNombre(id: number) {
    var medico = findMedicoById(id);
    var medicoNombre = medico?.nombre + " " + medico?.apellido;
    return medicoNombre;
  }

  const updateMedicos = useCallback(
    async (id: number, dto: MedicoUpdateRequestDTO) => {
      try {
        if (user == null) return;
        const response: IMedicoResponse = await fecthUpdateMedico(
          user,
          id,
          dto
        );
        success(successMessagges.actualizarInformacion);
        await setMedicoInfo(response);
      } catch (err: any) {
        error(handleHttpError(err));
      }
    },
    []
  );

  return {
    medicos,
    getMedicos,
    findMedicoById,
    getMedicoNombre,
    updateMedicos,
  
  };
};

export default useMedicos;
