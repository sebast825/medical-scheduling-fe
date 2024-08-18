import React from 'react';
import Home from './home/Home';

export {Home}

export const Login = React.lazy(() => import('./home/Login'));
export const NuestrosMedicos = React.lazy(() => import('./home/NuestrosMedicos'));

export const PacienteHome = React.lazy(()=>import('./paciente/PacienteHome'))
export const CrearTurno = React.lazy(()=> import ('./paciente/CrearTurno'))
export const InformacionPersonal = React.lazy(()=> import ('./paciente/InformacionPersonal'))
