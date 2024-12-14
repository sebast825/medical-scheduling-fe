//se utiliza para validar los datos enviados al formulario
function validarInputForm(value: string | undefined, key: string, typeInput: string): boolean {

   if (value == undefined || value.length == 0) return false;
   if (
    typeInput === "email" &&
     (!value.includes("@") || !value.includes(".com"))
   ) {
     console.log(value);
     return false;
   } else if (key === "numeroDocumento" && value.length !== 8) {
     console.log(value);
     return false;
   }  else if (typeInput === "tel" && !Number(value)) {
     console.log(Number(value));
     console.log(value);
     
     return false;
   } else {
     return true;
   }
 }

 export default validarInputForm;

 