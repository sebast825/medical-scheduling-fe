import { useEffect, useState } from "react";
import Opening from "../../Components/General/Opening/Opening";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { useRedirectToLogin } from "../../routes/navigation";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import usePersonas from "../../hooks/personas/usePersonas";
import { Spinner } from "../../Components/statics/Spinner";

function TablePacienteAdministrador() {
  const isAdministrador = useIsAdministrador();
  const redirectToLogin = useRedirectToLogin();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    getAllPersonasIncludeInactive,
    personasList,
    RemovePersona,
  } = usePersonas();

  useEffect(() => {
    if (!isAdministrador) redirectToLogin();
    getPersonas();
  }, []);

  async function getPersonas() {
     setIsLoading(true)
    await getAllPersonasIncludeInactive();
     await setIsLoading(false)
  }

  return (
    <>{isLoading&&
       <Spinner msge="Cargando usuarios"/>}

    
      <Opening title="Informacion de usuarios" />
      <div className="pt-4 pb-5">
        {personasList && (
          <TablePaciente
            personaList={personasList}
            handleAction={RemovePersona}
          />
        )}
        <BackLink />
      </div>)
    </>
  );
}

export default TablePacienteAdministrador;
