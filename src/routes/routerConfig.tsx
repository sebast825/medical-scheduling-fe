import { Home, Login, NuestrosMedicos} from "../pages/index"

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
   }
]
