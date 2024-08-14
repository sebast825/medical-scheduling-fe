import { useState, useCallback } from 'react';
import { IMedicoResponse } from '../types/MedicoResponse.type';
import { ErrorTypeAny } from '../types/Error.type';
import {  fetchMedicos } from '../services/apiService';


const useMedicos = () => {
  const [medicos, setMedicos] = useState<IMedicoResponse[]>();
  const [medicosError, setError] = useState<ErrorTypeAny>(null);

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

  function medicoNombre(id : number){
    var medico = findMedicoById(id);
    var medicoNombre =  medico?.nombre + " " + medico?.apellido;
    return medicoNombre;
  }

  return { medicos, medicosError, getMedicos,findMedicoById,medicoNombre };
};

export default useMedicos;