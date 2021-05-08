import React,{useState}  from 'react';
import {Helmet} from 'react-helmet';
import  {Header,Titulo,ContenedorHeader} from './../elementos/Header';
import Boton from './../elementos/Boton';
import  {Formulario,Input,ContenedorBoton} from './../elementos/ElementosFormulario';
import {ReactComponent as SvgLogin} from './../imagenes/login.svg'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {auth} from './../firebase/firebase';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width:100%;
    max-height:12.5rem;
    margin-bottom:1.25rem;
`;
const IniciarSesion = () => {
    const history = useHistory();
    const [correo,cambiarCorreo] = useState('');
    const [password,cambiarPassword] = useState('');
    const [estadoAlerta,cambiarEstadoAlerta] = useState(false);
    const [alerta,cambiarAlerta] = useState({});
    
    const handleOnChange = e =>{
        switch(e.target.name){
            case 'email':
                cambiarCorreo(e.target.value);
                break;
            case 'password':
                cambiarPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async e=> {
        e.preventDefault();
        cambiarEstadoAlerta(true);
        cambiarAlerta({});
        const expReg = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if (correo===''|| password===''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                mensaje:'Por Favor Rellena Todos Los Campos',
                tipo:'error'
            });
            return;
        }

        if (!expReg.test(correo)){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                mensaje:'El Correo Ingresado No Es Válido',
                tipo:'error'
            });
            return;
        }
        
        try{
            await auth.signInWithEmailAndPassword(correo,password);
            history.push('/');  
        } catch(error) {
            let mensaje = ''
            console.log(error);
            switch(error.code){
                case 'auth/user-not-found':
					mensaje = 'El Usuario No Existe'
				break;
                case 'auth/wrong-password':
					mensaje = 'Contraseña Incorrecta'
				break;

				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				break;
			}
            cambiarEstadoAlerta(true)
            cambiarAlerta({mensaje:mensaje,tipo:"error"})
        }
    }
    
    return ( 
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    <div>
                        <Boton to='/crear-cuenta'>Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg></Svg>
                <Input
                    type='email'
                    name='email'
                    placeholder="Correo Electronico"
                    value={correo}
                    onChange={handleOnChange}
                >
                </Input>
                <Input
                    type='password'
                    name='password'
                    placeholder="Contraseña"
                    value={password}
                    onChange={handleOnChange}
                >
                </Input>
                <ContenedorBoton>
                <Boton as="button" primario type="submit">Iniciar Sesion</Boton>
                </ContenedorBoton>
                
            </Formulario>
            <Alerta
                tipo={alerta.tipo} 
                mensaje={alerta.mensaje} 
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            ></Alerta>
        </>
    );
}
 
export default IniciarSesion;