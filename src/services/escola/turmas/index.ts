import api from '../../api';


export default class EscolaTurmaService {

    static createTurma = async (turma) => {
        try {
            const { data } = await api.post(`/unidadeensinoturma/save`, turma)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static saveTurma = async (turmaId, turma) => {
        try {
            const { data } = await api.put(`/unidadeensinoturma/save/${turmaId}`, turma)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchTurma = async (id) => {
        try{
           const { data } = await api.get(`/api/unidadeensinoturma/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAllTurmas = async () => {
        try{
           const { data } = await api.get(`/api/unidadeensinoturma`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deleteTurma = async (id) => {
        try {
            const { data } = await api.delete(`/unidadeensinoturma/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

}