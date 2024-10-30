import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getToken } from '../Services/AxiosApi';

const PrivateRoute = ({ children }) => {
    // const { isAuthenticated } = useAuth();
    const token = getToken();
    

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
