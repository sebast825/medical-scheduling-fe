import { Home, Login, NuestrosMedicos, PacienteHome,CrearTurno, InformacionPersonal, SecretarioHome, TurnosDePaciente} from "../pages/index"

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
       path: '/crearTurno/listMedicos',
      element: <CrearTurno filterBy="0"/>
    },
    {
      path: '/crearTurno/listEspecialidades',
     element: <CrearTurno filterBy="1"/>
   },
   {
      path: '/pacientes/informacion',
     element: <InformacionPersonal/>
   },
   {
      path: '/secretarios',
     element: <SecretarioHome/>
   },
   {
      path: '/secretarios/turnosDePaciente',
     element: <TurnosDePaciente/>
   }
]
