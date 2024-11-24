import api from "../../api";


export default class RequisicaoSeparacaoService {
    static createSeparacao = async (separacao) => {
        try {
            const { data } = await api.post(`/requisicaoseparacao/save`, separacao)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static updateSeparacao = async (separacaoId, separacao) => {
        try {
            const { data } = await api.put(`/requisicaoseparacao/${separacaoId}`, separacao)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchSeparacao = async (id) => {
        try{
           const { data } = await api.get(`/requisicaoseparacao/requisicao/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAll = async () => {
        try{
           const { data } = await api.get(`/requisicaoseparacao`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deleteSeparacoes = async (id) => {
        try {
            const { data } = await api.delete(`/requisicaoseparacao/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }
}