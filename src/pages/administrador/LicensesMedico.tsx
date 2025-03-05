import Opening from "../../Components/General/Opening/Opening";
import TableLicense from "../../Components/License/TableLicense/TableLicense";
import { LicenseResponseDto } from "../../types/Licenses/LicenseResponseDto.type";

function LicensesMedico(){

    const mockLicenses: LicenseResponseDto[] = [
      {
        Id: 1,
        MedicoId: 101,
        Medico: "Dr. Juan Pérez",
        StartDate: new Date("2024-03-01"),
        EndTime: new Date("2024-03-10"),
        Reason: "Vacaciones"
      },
      {
        Id: 2,
        MedicoId: 102,
        Medico: "Dra. Ana López",
        StartDate: new Date("2024-04-05"),
        EndTime: new Date("2024-04-12"),
        Reason: "Congreso médico"
      },
      {
        Id: 3,
        MedicoId: 103,
        Medico: "Dr. Carlos Gómez",
        StartDate: new Date("2024-05-15"),
        EndTime: null,
        Reason: "Licencia por enfermedad"
      }
    ];
    
   return(
      <>
         <div className="mb-2 mb-md-5">
      <Opening title="licencias"/>
      <TableLicense licenseList={mockLicenses}></TableLicense>
      <div>LicensesMedico</div>
      </div>

      </>
   )
}


export default LicensesMedico;