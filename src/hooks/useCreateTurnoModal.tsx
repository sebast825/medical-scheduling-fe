import { useState } from "react";



const useCreateTurnoModal = () => {
   const [toggleCreateModal, setShowModal] = useState<boolean>(false);

   function closeCreatTurnoModal (){
      setShowModal(false)
  }
  function showCreatTurnoModal(){
   setShowModal(true)
   
 }
   return{
      closeCreatTurnoModal,showCreatTurnoModal,toggleCreateModal
   }
}

export default useCreateTurnoModal;