import {db} from './firebase';
const borrarGasto = id =>{
    db.collection('gastos')
        .doc(id).delete();
}

export default borrarGasto;