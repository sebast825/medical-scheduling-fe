import BackLink from "../../Components/buttons/BackLink/BackLink";
import Opening from "../../Components/General/Opening/Opening";
import TableLicense from "../../Components/License/TableLicense/TableLicense";
import { LicenseResponseDto } from "../../types/Licenses/LicenseResponseDto.type";

function LicensesMedico() {

  return (
    <>
      <div className="mb-2 mb-md-5">
        <Opening title="licencias" />
        <div className="pt-4 pb-5">
          <TableLicense />
          <BackLink />
        </div>{" "}
      </div>
    </>
  );
}

export default LicensesMedico;
