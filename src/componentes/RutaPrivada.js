import React from 'react';
import {useAuth} from './../contextos/AuthContext';
import {Route,Redirect} from 'react-router-dom'
const RutaPrivada = ({children,...props}) => {
    const {usuario} = useAuth();
    if (usuario){
        return <Route {...props}>{children}</Route>
    } else {
        return <Redirect to="/iniciar-sesion"></Redirect>
    }
    
}
 
export default RutaPrivada;