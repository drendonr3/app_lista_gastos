import React from 'react';
import styled from 'styled-components'
import {ReactComponent as Puntos} from './../imagenes/puntos.svg'

const Fondo= () => {
    return ( 
        <>
            <PuntosArriba></PuntosArriba>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" 
            preserveAspectRatio='none'>
                <path 
                    fillOpacity="1" 
                    d="M0,0L60,53.3C120,107,240,213,360,234.7C480,256,600,192,720,176C840,160,960,192,1080,186.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
                </path></Svg>
            <PuntosAbajo></PuntosAbajo>
        </>
    );
}
 
export default Fondo;

const Svg = styled.svg`
	height: 50vh;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 0;
	path {
		fill: rgba(135,182,194, .15);
	}
`;

const PuntosArriba = styled(Puntos)`
	position: fixed;
	z-index: 1;
	top: 2.5rem; /* 40px */
	left: 2.5rem; /* 40px */
`;

const PuntosAbajo = styled(Puntos)`
	position: fixed;
	z-index: 1;
	bottom: 2.5rem; /* 40px */
	right: 2.5rem; /* 40px */
`;