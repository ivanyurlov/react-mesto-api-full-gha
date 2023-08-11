import * as React from 'react';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ isLoggedIn, element }) {
  return (
    isLoggedIn ? element : <Navigate to="/sign-in" replace />
  );
}

export default ProtectedRoute;