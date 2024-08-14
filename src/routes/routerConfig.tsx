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
       path: '/buscarMedico/listMedicos',
      element: <BuscarPorMedico filterBy="0"/>
    },
    {
      path: '/buscarMedico/listEspecialidades',
     element: <BuscarPorMedico filterBy="1"/>
   }
]
