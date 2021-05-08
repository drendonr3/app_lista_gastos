import { ReactComponent as IconoCerrar } from './../imagenes/log-out.svg';
import React from 'react';
import Boton from './../elementos/Boton';
import {auth} from './../firebase/firebase';
import { useHistory } from 'react-router';

const BotonCerrarSesion = () => {
    const history = useHistory();
    const  cerrarSesion = async ()=>{
        try {
            await auth.signOut();
            history.push('/iniciar-sesion')
        } catch(error) {
            console.log(error);
        }
    }
    return ( 
        <Boton iconoGrande as='button' onClick={cerrarSesion}><IconoCerrar/>   </Boton>
     );
}
 
export default BotonCerrarSesion;