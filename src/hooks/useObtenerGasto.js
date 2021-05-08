import {useEffect,useState} from 'react';
import {db} from './../firebase/firebase';
import {useHistory} from 'react-router-dom';
const useObtenerGasto = (id) => {
    const [gasto,establecerGasto] = useState('');
    const history = useHistory();
    useEffect(() =>{
        db.collection('gastos').doc(id).get()
        .then(doc=> {
            if(doc.exists){
                establecerGasto(doc);
            } else {
                history.push('/lista');
            }
        });
    },[history,id]);

    return [gasto];
}
 
export default useObtenerGasto;