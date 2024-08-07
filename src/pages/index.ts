import React from 'react';
import Home from './home/Home';

export {Home}

export const Login = React.lazy(() => import('./home/Login'));
export const NuestrosMedicos = React.lazy(() => import('./home/NuestrosMedicos'));
