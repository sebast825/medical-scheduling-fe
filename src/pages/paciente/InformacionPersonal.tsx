import { Card } from "react-bootstrap";
import Opening from "../../Components/General/Opening/Opening";
import CardInfo from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { usePersonaInfoContext } from "../../context/authContext";



function InformaciónPersonal (){

   const {SetPersonaInfo} = usePersonaInfoContext();
   const id = 1;
   const nombre = "Lucía";
   const apellido = "Martínez";
   const fechaNacimiento = "1985-04-22T00:00:00";
   const telefono = "987654321";
   const numeroDocumento = "87654321";
   const sexo = "Mujer";
   const estadoUsuario = "Activo";
   const telefonoEmergencia = "1122334455";
   const nombreEmergencia = "Juan Pérez";

   function saludar(){
      console.log("hola")
   }
   return <>
      <Opening title="Mi Información"></Opening>
      {/* <PersonaInfoCard title="Información Personal" nombre={} /> */}

   </>
}


export default InformaciónPersonal;