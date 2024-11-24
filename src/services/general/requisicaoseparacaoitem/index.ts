import api from "../../api";


export default class RequisicaoSeparacaoItemService {

    static createRequisicaoSeparacaoItem = async (requisicaoseparacaoitem) => {
        try {
            const { data } = await api.post(`/requisicaoseparacaoitem/save`, requisicaoseparacaoitem)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static saveRequisicaoSeparacaoItem = async (requisicaoId, requisicaoseparacaoitem) => {
        try {
            const { data } = await api.put(`/requisicaoseparacaoitem/${requisicaoId}`, requisicaoseparacaoitem)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchRequisicaoSeparacaoItem = async (id) => {
        try{
           const { data } = await api.get(`/requisicaoseparacaoitem/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAll = async () => {
        try{
           const { data } = await api.get(`/requisicaoseparacaoitem`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deleteRequisicaoSeparacaoItem = async (id) => {
        try {
            const { data } = await api.delete(`/requisicaoseparacaoitem/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchAllByRequisicaoItem = async (id) => {
        try{
           const { data } = await api.get(`/requisicaoseparacaoitem/requisicaoitem/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }
}