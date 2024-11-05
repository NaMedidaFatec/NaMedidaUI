import api from '../api';


class EscolaService {

    static createTurma = async (escola) => {
        try {
            const { data } = await api.post(`/unidadeensino/save`, escola)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static saveTurma = async (escolaId, escola) => {
        try {
            const { data } = await api.put(`/unidadeensino/${escolaId}`, escola)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchEscola = async (id) => {
        try{
           const { data } = await api.get(`/unidadeensino/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAll = async () => {
        try{
           const { data } = await api.get(`/unidadeensino`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deleteTurma = async (id) => {
        try {
            const { data } = await api.delete(`/unidadeensino/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

}

export default EscolaService;