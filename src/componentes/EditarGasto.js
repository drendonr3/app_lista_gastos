import React from 'react';
import { Helmet } from 'react-helmet';

import { Header, Titulo } from '../elementos/Header';
import BtnRegresar from './../elementos/BtnRegresar'
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';
import {useParams} from 'react-router-dom';
import useObtenerGasto from './../hooks/useObtenerGasto';

const EditarGasto = () => {
    const {id} = useParams();
    const [gasto]=useObtenerGasto(id);
    return (
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>
            <Header>
                <BtnRegresar ruta="/lista"></BtnRegresar>
                <Titulo>Editar Gasto</Titulo>
            </Header>
            <FormularioGasto gasto={gasto}></FormularioGasto>
            <BarraTotalGastado></BarraTotalGastado>
        </>
    );
}
 
export default EditarGasto;