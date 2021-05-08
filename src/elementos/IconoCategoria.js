import React from 'react';

import {ReactComponent as IconoComida} from './../imagenes/cat_comida.svg';
import {ReactComponent as IconoCompras} from './../imagenes/cat_compras.svg';
import {ReactComponent as IconoCuentasYPagos} from './../imagenes/cat_cuentas-y-pagos.svg';
import {ReactComponent as IconoDiversion} from './../imagenes/cat_diversion.svg';
import {ReactComponent as IconoHogar} from './../imagenes/cat_hogar.svg';
import {ReactComponent as IconoRopa} from './../imagenes/cat_ropa.svg';
import {ReactComponent as IconoSaludEHigiene} from './../imagenes/cat_salud-e-higiene.svg';
import {ReactComponent as IconoTransporte} from './../imagenes/cat_transporte.svg';

const IconoCategora = ({nombre}) => {
        switch(nombre) {
            case 'comida':
                return <IconoComida></IconoComida>;
            case 'compras':
                return <IconoCompras></IconoCompras>;
            case 'cuentas y pagos':
                return <IconoCuentasYPagos></IconoCuentasYPagos>;
            case 'diversion':
                return <IconoDiversion></IconoDiversion>;
            case 'hogar':
                return <IconoHogar></IconoHogar>;
            case 'salud e higiene':
                return <IconoSaludEHigiene></IconoSaludEHigiene>;
            case 'transporte':
                return <IconoTransporte></IconoTransporte>;
            case 'ropa':
                return <IconoRopa></IconoRopa>;
            default:
                break;
        }
}
 
export default IconoCategora;