import { useState } from "react";
import { permisosEdicion } from "../../constants/permisosEdicion";
import { warning } from "toastr";
import { genericMessages } from "../../constants/genericMessages";
import useLicenseCacheQuery from "./useLicenseCacheQuery";
import { LicenseCreateRequestDto } from "../../types/Licenses/LicenseCreateRequestDto.type";


function useLicense(){

   const {CreateLicense} = useLicenseCacheQuery();
  const [toggleCreateLicenseModal, setToggleCreateLicenseModal] = useState<boolean>(false);
  function closeCreateLicenseModal() {
   setToggleCreateLicenseModal(false);
 }
 function showCreateLicenseModal() {
   setToggleCreateLicenseModal(true);
 }

 
  async function handleCreateLicense(
     licenseRequst: LicenseCreateRequestDto
   ) {
     if (!permisosEdicion.admin) {
       warning(genericMessages.funcionalidadAdministradorRestringido);
       closeCreateLicenseModal();
       return;
     }

      var asd = await CreateLicense(licenseRequst);
      console.log(asd);
 
     closeCreateLicenseModal();
   }
 /*
   async function handleDelete(id: number) {
     if (!permisosEdicion.admin) {
       warning(genericMessages.funcionalidadAdministradorRestringido);
       closeEditModal();
       return;
     }
     await fetchDeleteDisponibilidadMedico(id);
 
     let updateList = removeDisponibilidadFromRecord(id);
     setHorariosMedicos(updateList);
     handleReloadDisponibilidadMedicos();
     closeEditModal();
 
   }
 */
return{
   closeCreateLicenseModal,showCreateLicenseModal,toggleCreateLicenseModal,handleCreateLicense
}
}

export default useLicense;