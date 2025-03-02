import { useState } from "react";


function useLicense(){

  const [toggleCreateLicenseModal, setToggleCreateLicenseModal] = useState<boolean>(false);
  function closeCreateLicenseModal() {
   setToggleCreateLicenseModal(false);
 }
 function showCreateLicenseModal() {
   setToggleCreateLicenseModal(true);
 }
return{
   closeCreateLicenseModal,showCreateLicenseModal,toggleCreateLicenseModal
}
}

export default useLicense;