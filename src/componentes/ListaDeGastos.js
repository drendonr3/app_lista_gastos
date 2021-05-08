import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from '../elementos/Header';
import BtnRegresar from './../elementos/BtnRegresar'
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from './../hooks/useObtenerGastos';
import {Lista,
        ElementoLista,
        Categoria,
        Descripcion,
        Valor,
        Fecha,
        ContenedorBotones,
        BotonAccion,
        BotonCargarMas,
        ContenedorBotonCentral,
        ContenedorSubtitulo,
        Subtitulo
    } from './../elementos/ElementosDeLista';
import IconoCategoria from './../elementos/IconoCategoria';
import convertirAMoneda from './../funciones/convertirAMoneda'
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar } from './../imagenes/borrar.svg';
import {Link} from 'react-router-dom';
import Boton from './../elementos/Boton';
import {format, fromUnixTime} from 'date-fns';
import {es} from 'date-fns/locale';
import borrarGasto from './../firebase/borrarGasto';

const ListaDeGastos = () => {
    const [gastos,obtenerMasGastos,masPorCargar] = useObtenerGastos();

    const formatearFecha = fecha=>{
        return format(fromUnixTime(fecha),"dd 'de' MMMM 'de' yyyy",{locale:es});
    }

    const fechaEsIgual = (gastos,index) =>{
        if (index !==0){
            const fechaActual = gastos[index].fecha;
            const fechaAnterior = gastos[index-1].fecha;
            return  fechaActual===fechaAnterior;
        }
    }

    return ( 
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>
            <Header>
                <BtnRegresar></BtnRegresar>
                <Titulo>Lista de Gastos</Titulo>
            </Header>
            <Lista>
                {gastos.map((gasto,index)=>{
                    return(
                        <div key={gasto.id}>
                            {!fechaEsIgual(gastos,index) &&
                                <Fecha>{formatearFecha(gasto.fecha)}</Fecha>                            
                            }
                            <ElementoLista>
                                <Categoria>
                                    <IconoCategoria nombre={gasto.categoria}></IconoCategoria>
                                    {gasto.categoria}
                                </Categoria>
                                <Descripcion>{gasto.descripcion}</Descripcion>
                                <Valor>{convertirAMoneda(gasto.cantidad)}</Valor>
                                <ContenedorBotones>
                                    <BotonAccion as={Link} to={`/editar/${gasto.id}`}><IconoEditar></IconoEditar></BotonAccion>
                                    <BotonAccion onClick={()=>borrarGasto(gasto.id)}><IconoBorrar></IconoBorrar></BotonAccion>
                                </ContenedorBotones>
                            </ElementoLista>
                        </div>
                    );
                })}
                {masPorCargar &&
                    <ContenedorBotonCentral>
                    <BotonCargarMas onClick={()=>obtenerMasGastos()}>Cargar Más</BotonCargarMas>
                    </ContenedorBotonCentral>
                }
                
                {gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos por mostrat</Subtitulo>
                        <Boton as={Link} to="/">Agregar Gasto</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>
            <BarraTotalGastado></BarraTotalGastado>
        </>
     );
}
 
export default ListaDeGastos;