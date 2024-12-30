import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { useRedirectToLogin } from "../../routes/navigation";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import usePersonas from "../../hooks/personas/usePersonas";

function TablePacienteAdministrador() {
  const isAdministrador = useIsAdministrador();
  const redirectToLogin = useRedirectToLogin();
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
    await getAllPersonasIncludeInactive();
  }
  useEffect(()=>{},[personasList])
  return (
    <>
      <Opening title="Informacion de pacientes" />
      <div className="pt-4 pb-5">
        {personasList && (
          <TablePaciente
            personaList={personasList}
            handleAction={RemovePersona}
          />
        )}
        <BackLink />
      </div>
    </>
  );
}

export default TablePacienteAdministrador;
