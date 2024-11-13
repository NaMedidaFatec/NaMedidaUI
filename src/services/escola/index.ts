import api from '../api';


class EscolaService {

    static createEscola = async (escola) => {
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

    static searchEscola = async (id) => {
        try{
           const { data } = await api.get(`/unidadeensino/${id}`)
           return data;
        }catch(e){
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

    static fetchAtivos = async (enabled) => {
        try {
            const { data } = await api.get(`/enabled/${enabled}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static toggleStatusEscola = async (id) => {
        try {
            const { data } = await api.put(`/unidadeensino/toggle/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }
}

export default EscolaService;