import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { useRedirectToLogin } from "../../routes/navigation";
import BackLink from "../../Components/buttons/BackLink/BackLink";

function TablePacienteAdministrador() {
  const isAdministrador = useIsAdministrador();
  const redirectToLogin = useRedirectToLogin();

  useEffect(() => {
    if (!isAdministrador) redirectToLogin();
  }, []);

  return (
    <>
      <Opening title="Informacion de pacientes" />
      <div className="pt-4 pb-5">
        {/* <TablePaciente /> */}
        <BackLink />
      </div>
    </>
  );
}

export default TablePacienteAdministrador;
