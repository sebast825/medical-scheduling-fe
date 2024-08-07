import { useNavigate } from 'react-router-dom';

export const useRedirectToNuestrosMedicos = () => {
  const navigate = useNavigate();
  return () => {
    navigate('/nuestrosMedicos');
  };
};

export const useRedirectToLogin = () => {
   const navigate = useNavigate();
   return () => {
     navigate('/login');
   };
 };
 