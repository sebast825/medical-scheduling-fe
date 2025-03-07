import { useEffect } from "react";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import Opening from "../../Components/General/Opening/Opening";
import TableLicense from "../../Components/License/TableLicense/TableLicense";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { useRedirectToLogin } from "../../routes/navigation";
import { LicenseResponseDto } from "../../types/Licenses/LicenseResponseDto.type";

function LicensesMedico() {
  const isAdministrador = useIsAdministrador();
  const redirectToLogin = useRedirectToLogin();
  useEffect(() => {
  
    if (!isAdministrador) redirectToLogin();

    
  }, []);
  return (
    <>
      <div className="mb-2 mb-md-5">
        <Opening title="Licencias" />
        <div className="pt-4 pb-5">
          <TableLicense />
          <BackLink />
        </div>{" "}
      </div>
    </>
  );
}

export default LicensesMedico;
