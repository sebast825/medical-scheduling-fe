import { useState, useCallback } from 'react';
import { IMedicoResponse } from '../../types/Medico/MedicoResponse.type';
import { ErrorTypeAny } from '../../types/Error.type';
import {  fecthUpdateMedico, fetchMedicos } from '../../services/apiService';
import { useMedicoInfoContext, useUserInfo } from '../../context/authContext';
import { MedicoUpdateRequestDTO } from '../../types/Medico/MedicoUpdateRequest.type';


const useMedicos = () => {
  const [medicos, setMedicos] = useState<IMedicoResponse[]>();
  const [medicosError, setError] = useState<ErrorTypeAny>(null);
  const user = useUserInfo()
  const {setMedicoInfo} = useMedicoInfoContext();

  const getMedicos = useCallback(async () => {

    try {
      const response: IMedicoResponse[] = await fetchMedicos();
      setMedicos(response);

    } catch (err: any) {
      console.log(err);
      setError("Error desconocido");
    }
  }, []);

  function findMedicoById(id:number) :IMedicoResponse | undefined{
    var medicoSelected = medicos?.find(elem => elem.id == id);
    return medicoSelected ? medicoSelected : undefined;
  }

  function getMedicoNombre(id : number){
    var medico = findMedicoById(id);
    var medicoNombre =  medico?.nombre + " " + medico?.apellido;
    return medicoNombre;
  }

  const updateMedicos = useCallback(async (id : number, dto: MedicoUpdateRequestDTO) => {
    
    try {
      if(user == null) return
      const response: IMedicoResponse = await fecthUpdateMedico(user,id,dto);
    //  setMedicos(response);
     await setMedicoInfo(response)

    } catch (err: any) {
      console.log(err);
      setError("Error desconocido");
    }
  }, []);
  

  return { medicos, medicosError, getMedicos,findMedicoById,getMedicoNombre,updateMedicos};
};

export default useMedicos;