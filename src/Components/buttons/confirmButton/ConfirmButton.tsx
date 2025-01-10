import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { genericMessages } from "../../../constants/genericMessages";
import useToastit from "../../../hooks/useToastit";

interface IConfirmButton{
   handleConfirm : () => void;
   text ?: string
}
function ConfirmButton (props : IConfirmButton){
   const { handleConfirm,text = "Confirmar"} = props;
   const {info} = useToastit();

   const [isButtonDisabel, setIsButtonDisabel] = useState<boolean>(false);
 
   useEffect(()=>{
     if(isButtonDisabel){
       //info(genericMessages.procesadoSolicutd);
     }
   },[isButtonDisabel])
 
     function handleBtnConfirm() {
      setIsButtonDisabel(true);

      setTimeout(() => {
        handleConfirm();
      }, 1000);
      
     }    
 
   return(
      <Button variant="primary" onClick={() => handleBtnConfirm()} disabled={isButtonDisabel}>
          {isButtonDisabel ? "Solicitud Enviada" : text}
        </Button>
   )
}

export default ConfirmButton;