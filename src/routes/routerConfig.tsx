import { Home, Login, NuestrosMedicos} from "../pages/index"
import PacienteHome from "../pages/paciente/PacienteHome"

export const routes = [
   {
      path: '/',
      element: <Home/>
   },
   {
      path: '/login',
      element: <Login/>
   },
   {
      path: '/nuestrosMedicos',
      element: <NuestrosMedicos/>
   },
   {
      path: '/pacientes',
      element: <PacienteHome/>
   }
]
