import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from '../elementos/Header';
import BtnRegresar from './../elementos/BtnRegresar'
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosMes from './../hooks/useObtenerGastosMes'
const GastosPorCategoria = () => {
    useObtenerGastosMes();
    return ( 
        <>
            <Helmet>
                <title>Gastos por Categoría</title>
            </Helmet>
            <Header>
                <BtnRegresar></BtnRegresar>
                <Titulo>Gastos por Categoría</Titulo>
            </Header>
            <BarraTotalGastado></BarraTotalGastado>
        </>
     );
}
 
export default GastosPorCategoria;