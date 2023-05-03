import { ReactElement, FC } from "react";
import { getCookie } from '../utils/utils';
import { RouteProps, useLocation, Navigate } from 'react-router-dom';

interface IProtectedRoute {
  anonymous?: boolean;
  children: ReactElement;
};

const ProtectedRoute: FC<RouteProps & IProtectedRoute> = ({ children, anonymous = false }) => {
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
};

export default ProtectedRoute;
