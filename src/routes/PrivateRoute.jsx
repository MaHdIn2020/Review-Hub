import React, { use } from 'react';
import { AuthContext } from '../providers/AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingPage from '../pages/Shared/LoadingPage';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext)
    const location = useLocation()

    if(loading){
        return <LoadingPage></LoadingPage>
    }

    if(!user){
        <Navigate to={`/login`} state={location.pathname}></Navigate>
    }
    return children
};

export default PrivateRoute;