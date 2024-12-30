import { useState, useCallback } from "react";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import {
  fecthGetEspecialidadesMedico,
  fecthUpdateMedico,
  fetchMedicos,
} from "../../services/apiService";
import { useMedicoInfoContext, useUserInfo } from "../../context/authContext";
import { MedicoUpdateRequestDTO } from "../../types/Medico/MedicoUpdateRequest.type";
import { EspecialidadResponse } from "../../types/Especialidad/EspecialidadResponse.type";
import { convertCompilerOptionsFromJson } from "typescript";
import useToastit from "../useToastit";
import { handleHttpError } from "../../utils/errorHandler";

const useMedicos = () => {
  const [medicos, setMedicos] = useState<IMedicoResponse[] | undefined>(
    undefined
  );
  const { error, success } = useToastit();

  const user = useUserInfo();
  const { setMedicoInfo } = useMedicoInfoContext();
  const [especialidadesMedico, setEspecialidadesMedico] =
    useState<EspecialidadResponse[]>();
    
  const getMedicos = useCallback(async () => {
    try {
      const response: IMedicoResponse[] = await fetchMedicos();
      setMedicos(response);
    } catch (err: any) {
      error(handleHttpError(err));
    }
  }, []);

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
        success("Medico Actualizado exitosamente");
        await setMedicoInfo(response);
      } catch (err: any) {
        error(handleHttpError(err));
      }
    },
    []
  );
  const getEspecialidadesMedicos = useCallback(async () => {
    try {
      if (user == null) return;
      const response: EspecialidadResponse[] =
        await fecthGetEspecialidadesMedico(user);
      await setEspecialidadesMedico(response);
    } catch (err: any) {
      error(handleHttpError(err));
    }
  }, []);

  function getIdEspecialidad(especialdiad: string): number {
    if (!especialidadesMedico) return -1;
    let especialdiadObject: EspecialidadResponse | undefined =
      especialidadesMedico.find((elem) => elem.nombre == especialdiad);

    return especialdiadObject == undefined ? -1 : especialdiadObject?.id;
  }
  return {
    medicos,
    getMedicos,
    findMedicoById,
    getMedicoNombre,
    updateMedicos,
    getEspecialidadesMedicos,
    especialidadesMedico,
    getIdEspecialidad,
  };
};

export default useMedicos;
