import {useState,useEffect} from 'react';
import {db} from './../firebase/firebase';
import {useAuth} from './../contextos/AuthContext'

const useObtenerGastos = () => {
    const {usuario} = useAuth();
    const [gastos,cambiarGastos] = useState([]);
    const [ultimoGasto,cambiarUltimoGasto] = useState(null);
    const [masPorCargar, cambiarMasPorCargar] = useState(false);

    const obtenerMasGastos = () => {
        db.collection('gastos')
        .where('uidUsuario','==',usuario.uid)
        .orderBy('fecha','desc')
        .limit(2)
        .startAfter(ultimoGasto)
        .onSnapshot(snapshot=>{
            if (snapshot.docs.length>0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length-1]);
                cambiarMasPorCargar(true);
                cambiarGastos(gastos.concat(snapshot.docs.map(gasto=>{
                    return {...gasto.data(),id:gasto.id}
                    }))
                );
            } else {
                cambiarMasPorCargar(false);
            }
        });
    }

    useEffect(()=>{
        const unsubscribe = db.collection('gastos')
            .where('uidUsuario','==',usuario.uid)
            .orderBy('fecha','desc')
            .limit(2)
            .onSnapshot(snapshot=>{
                if (snapshot.docs.length>0){
                    cambiarUltimoGasto(snapshot.docs[snapshot.docs.length-1]);
                    cambiarMasPorCargar(true);
                } else {
                    cambiarMasPorCargar(false);
                }
                cambiarGastos(snapshot.docs.map(gasto=>{
                    return {...gasto.data(),id:gasto.id}
                }));
        });

        return unsubscribe;
    },[usuario]);
    return [gastos,obtenerMasGastos,masPorCargar];
}
 
export default useObtenerGastos;