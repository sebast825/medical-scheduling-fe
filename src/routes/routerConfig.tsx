import { Home, Login, NuestrosMedicos, PacienteHome,BuscarPorMedico} from "../pages/index"

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
   },
    {
       path: '/buscarMedico',
      element: <BuscarPorMedico/>
    }
]
