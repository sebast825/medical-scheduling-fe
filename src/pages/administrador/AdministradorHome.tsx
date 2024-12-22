import { useEffect } from "react";
import { useAdministrativoInfoContext } from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import TableMedico from "../../Components/Medico/TableMedico/TableMedico";



function AdministradorHome() {


   const {administrativoInfo} = useAdministrativoInfoContext()
   const isAdministrador = useIsAdministrador()
   const redirectToLogin = useRedirectToLogin();
   
   useEffect(()=>{
      if(!isAdministrador) redirectToLogin();
   },[])

  return (
    <>
      <Opening title={`Bienvenido ${administrativoInfo.nombre}`} />
      {/* <TablePaciente/> */}
      <TableMedico/>
      {/* <ListaHorariosMedicos /> */}
    </>
  );
}

export default AdministradorHome;
