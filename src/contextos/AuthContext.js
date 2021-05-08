import React, { useContext,useState,useEffect} from 'react';
import {auth} from './../firebase/firebase';

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario,cambiarUsuario] = useState();
    const [cargando,cambiarCargando] = useState(true); 

    useEffect(()=>{
        const cancelarSubcripcion = auth.onAuthStateChanged(usuario=>{
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });
        
        return cancelarSubcripcion;
    },[]);
    
    return ( 
        <AuthContext.Provider value={{usuario:usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}
 
export {AuthContext,AuthProvider,useAuth};