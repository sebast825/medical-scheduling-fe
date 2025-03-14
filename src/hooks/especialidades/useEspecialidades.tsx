import { useState, useCallback } from "react";
import { error } from "toastr";
import { fecthGetEspecialidadesMedico } from "../../services/apiService";
import { EspecialidadResponse } from "../../types/Especialidad/EspecialidadResponse.type";
import { handleHttpError } from "../../utils/errorHandler";
import { useUserInfo } from "../../context/authContext";

function useEspecialidades() {
  const [especialidadesMedico, setEspecialidadesMedico] =
    useState<EspecialidadResponse[]>();
  const user = useUserInfo();

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
    getEspecialidadesMedicos,
    especialidadesMedico,
    getIdEspecialidad,
  };
}

export default useEspecialidades;
