import React, { ReactElement, useContext } from 'react';
import { Navigate ,useLocation} from 'react-router-dom';
import { AuthContext } from './authProvider';

interface PrivateRouteProps  {
  children: ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children: Component,
}) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <>{Component}</>;
    
};

export default PrivateRoute;
