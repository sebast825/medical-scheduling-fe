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


  return { medicos, medicosError, getMedicos };
};

export default useMedicos;