import api from '../api';


class EscolaService {
    static fetchAll = async () => {
        try{
           const { data } = await api.get(`/unidadeensino`)
           return data;
        }catch(e){
            console.log(JSON.stringify(e))
        }  
    }
}

export default EscolaService;