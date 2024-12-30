import { useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const useToastit = () => {

   // Configuración global de toastr
 toastr.options = {
   positionClass: 'toast-top-right',
   timeOut: 3700,
   closeButton: true,
   // ... otras opciones
};
function success(message : string) {
   toastr.success(message);
}

function error(message : string) {
   toastr.error(message);
}

function warning(message : string) {
   toastr.warning(message);
}

function info(message : string) {
   toastr.info(message);
}

return { success, error, warning, info };
}



export default useToastit;
