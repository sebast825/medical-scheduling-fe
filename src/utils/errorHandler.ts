export function handleHttpError(error: any): string {
  console.log(error)
   let errorMessage = 'Un error inesperado ocurrió';
   let errorCode = 500; // Default to 500 if status code is not available

  if(error.response?.data){
    console.log("entra")
    errorMessage = error.response.data;
    errorCode = error.response.status;
  }

return errorMessage;
}