import {useState,useEffect} from 'react'
import {db} from './../firebase/firebase'
import {startOfMonth,endOfMonth,getUnixTime} from 'date-fns'

const useObtenerGastosMes = () => {
    const [gastos,establecerGastos] = useState([]);

    useEffect(()=>{
        const inicioMes = getUnixTime(startOfMonth(new Date()));
        const finMes = getUnixTime(endOfMonth(new Date()));
        db.collection('gastos')
        .orderBy('fecha','desc')
        .where('fecha','>=',inicioMes)
        .where('fecha','<=',finMes)
        .onSnapshot(snapshot=>{
            snapshot.docs.forEach(doc=>{
                console.log(doc.data());
            })
        });
    },[]);

    return gastos;
}
 
export default useObtenerGastosMes;