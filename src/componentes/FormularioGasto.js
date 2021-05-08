import React,{useState,useEffect} from 'react';
import Boton from '../elementos/Boton';
import {ContenedorFiltros,Formulario,Input,InputGrande,ContenedorBoton} from './../elementos/ElementosFormulario';
import {ReactComponent as IconoPlus} from './../imagenes/plus.svg'
import DatePicker from './DatePicker';
import SelectCategorias from './SelectCategorias';
import agregarGasto from '../firebase/AgregarGasto';
import editarGasto from '../firebase/editarGasto';
import { getUnixTime } from 'date-fns'
import { fromUnixTime } from 'date-fns'
import {useAuth} from './../contextos/AuthContext'
import Alerta from './../elementos/Alerta';
import {useHistory} from 'react-router-dom'
const FormularioGasto = ({gasto}) => {
    const history = useHistory();
    const [inputDescripcion,cambiarInputDescripcion] = useState('');
    const [inputCantidad,cambiarInputCantidad] = useState('');
    const [categoria,cambiarCategoria] = useState('hogar');
    const [fecha,cambiarFecha] = useState(new Date());
    const {usuario} = useAuth();
    const [estadoAlerta,cambiarEstadoAlerta] = useState(false);
    const [alerta,cambiarAlerta] = useState({});

    useEffect(()=>{
        if (gasto){
            if (gasto.data().uidUsuario===usuario.uid){
                cambiarCategoria(gasto.data().categoria);
                cambiarFecha(fromUnixTime((gasto.data().fecha)));
                cambiarInputDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad);
            } else {
                history.push('/lista');
            }
        }
    },[gasto,usuario,history]);


    const handleOnChange = e => {
        switch (e.target.name) {
            case 'descripcion':
                cambiarInputDescripcion(e.target.value);
                break;
            case 'cantidad':
                cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g,''));
                break;
        
            default:
                break;
        }
    }

    const handleSubmit = e=>{
        e.preventDefault();
        let cantidad = parseFloat(inputCantidad).toFixed(2);

        if (inputDescripcion==='' || inputCantidad===''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo:'error',mensaje:'Agrega Todos Los Valores'})
            return;
        }

        if (!cantidad){
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo:'error',mensaje:'Agrega Una Cantidad Válida'})
            return;
        }

        if(gasto){
            editarGasto({
                id:gasto.id,
                categoria:categoria,
                descripcion:inputDescripcion,
                cantidad:cantidad,
                fecha:getUnixTime(fecha),
            })
            .then(()=>{
                history.push('/lista')
            })
            .catch(error=>{
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo:'error',mensaje:'Hubo un Problema Al Intentar Modificar Tu Gasto'})
            });
        } else {
            agregarGasto({
                categoria:categoria,
                descripcion:inputDescripcion,
                cantidad:cantidad,
                fecha:getUnixTime(fecha),
                uidUsuario:usuario.uid
            })
            .then(()=>{
                cambiarCategoria('hogar');
                cambiarInputDescripcion('');
                cambiarInputCantidad('');
                cambiarFecha(new Date());
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo:'exito',mensaje:'Gasto Agregado Con Éxito'})
            })
            .catch(error=>{
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo:'error',mensaje:'Hubo un Problema Al Intentar Agregar Tu Gasto'})
            });
        }
        
    }
    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                ></SelectCategorias>
                <DatePicker
                    fecha={fecha}
                    cambiarFecha={cambiarFecha}    
                ></DatePicker>
            </ContenedorFiltros>
            <div>
                <Input
                    type='text'
                    name='descripcion'
                    id='descripcion'
                    placeholder='Descripcion del Gasto'
                    value = {inputDescripcion}
                    onChange={handleOnChange}
                >
                </Input>
                <InputGrande
                    type='text'
                    name='cantidad'
                    id='cantidad'
                    placeholder='$0.00'
                    value = {inputCantidad}
                    onChange={handleOnChange}
                >
                </InputGrande>

            </div>
            <ContenedorBoton>
                <Boton as="button" primario conIcono type='submit'>{gasto?'Guardar Gasto':'Agregar Gasto'} <IconoPlus/></Boton>
            </ContenedorBoton>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}    
            ></Alerta>
        </Formulario>
    );
}
 
export default FormularioGasto;
