import {db} from './firebase';

const editarGasto = ({id,categoria,descripcion,cantidad,fecha,uidUsuario}) => {
    return db.collection('gastos').doc(id).update({
        categoria:categoria,
        descripcion:descripcion,
        cantidad:Number(cantidad),
        fecha:fecha,
    });
}

export default editarGasto;