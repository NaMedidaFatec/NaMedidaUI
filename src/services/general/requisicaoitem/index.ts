import api from "../../api";


export default class RequisicaoItemService {

    static createRequisicaoItem = async (requisicao) => {
        try {
            const { data } = await api.post(`/requisicaoitem/save`, requisicao)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static saveRequisicaoItem = async (requisicaoId, requisicao) => {
        try {
            const { data } = await api.put(`/requisicaoitem/${requisicaoId}`, requisicao)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchRequisicaoItem = async (id) => {
        try{
           const { data } = await api.get(`/requisicaoitem/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAll = async () => {
        try{
           const { data } = await api.get(`/requisicaoitem`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deleteRequisicaoItem = async (id) => {
        try {
            const { data } = await api.delete(`/requisicaoitem/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchAllByRequisicao = async (id) => {
        try{
           const { data } = await api.get(`/requisicaoitem/requisicao/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }
}