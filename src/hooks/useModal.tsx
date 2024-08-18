import { useState } from "react";



const useModal = () => {
   const [toggleModal, setToggleModal] = useState<boolean>(false);

   function closeModal (){
      setToggleModal(false)
  }
  function showModal(){
   setToggleModal(true)
   
 }
   return{
      closeModal,showModal,toggleModal
   }
}

export default useModal;