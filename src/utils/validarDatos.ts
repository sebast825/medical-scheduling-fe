//se utiliza para validar los datos enviados al formulario
function validarInputForm(value: string | undefined, key: string): boolean {

   if (value == undefined) return false;
   if (
     key === "email" &&
     (!value.includes("@") || !value.includes(".com"))
   ) {
     console.log(value);
     return false;
   } else if (key === "numeroDocumento" && value.length !== 8) {
     console.log(value);
     return false;
   } else if (value.length == 0) {
     console.log(value);
     return false;
   } else if (key === "telefono" && !Number(value)) {
     console.log(Number(value));
     console.log(value);
     return false;
   } else {
     return true;
   }
 }

 export default validarInputForm;