import { getCookie } from '../utils/utils';
import { useLocation, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, anonymous = false }) {
  const isAuthorized = getCookie('accessToken');
  const location = useLocation();
  const from = location.state?.from || '/';
  
  if (anonymous && isAuthorized) {
    return <Navigate to={ from } />
  }
  if (!anonymous && !isAuthorized) {
    return <Navigate to="/login" state={{ from: location }}/>
  }
  return children
}
