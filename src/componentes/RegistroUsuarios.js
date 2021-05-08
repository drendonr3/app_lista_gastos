import React,{useState} from 'react';
import {Helmet} from 'react-helmet';
import  {Header,Titulo,ContenedorHeader} from './../elementos/Header';
import Boton from './../elementos/Boton';
import  {Formulario,Input,ContenedorBoton} from './../elementos/ElementosFormulario';
import {ReactComponent as SvgLogin} from './../imagenes/registro.svg'
import styled from 'styled-components'
import {auth} from './../firebase/firebase';
import {useHistory} from 'react-router-dom'
import Alerta from './../elementos/Alerta'

const Svg = styled(SvgLogin)`
    width:100%;
    max-height:6.25rem;
    margin-bottom:1.25rem;
`;
const RegistroUsuarios = () => {
    const history = useHistory();
    const [correo,cambiarCorreo] = useState('');
    const [password,cambiarPassword] = useState('');
    const [password2,cambiarPassword2] = useState('');
    const [estadoAlerta,cambiarEstadoAlerta] = useState(false);
    const [alerta,cambiarAlerta] = useState({});
    const haandleChange = e=>{
        switch(e.target.name){
            case 'email':
                cambiarCorreo(e.target.value);
                break;
            case 'password':
                cambiarPassword(e.target.value);
                break;
            case 'password2':
                cambiarPassword2(e.target.value);
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
        if (correo===''|| password==='' ||password2===''){
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
        
        if(password !== password2){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                mensaje:'Las Contraseñas No Coinciden',
                tipo:'error'
            });
            return;
        }
        
        try{
            await auth.createUserWithEmailAndPassword(correo,password);
            history.push('/')
        } catch(error) {
            let mensaje = ''
            switch(error.code){
				case 'auth/invalid-password':
					mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
				break;
				case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
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
                <title>Crear Cuenta</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to='/iniciar-sesion'>Iniciar Sesión</Boton>
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
                    onChange={haandleChange}
                >
                </Input>
                <Input
                    type='password'
                    name='password'
                    placeholder="Contraseña"
                    value={password}
                    onChange={haandleChange}
                >
                </Input>
                <Input
                    type='password'
                    name='password2'
                    placeholder="Confirmar Contraseña"
                    value={password2}
                    onChange={haandleChange}
                >
                </Input>
                <ContenedorBoton>
                <Boton as="button" primario type="submit">Crear Cuenta</Boton>
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
 
export default RegistroUsuarios;