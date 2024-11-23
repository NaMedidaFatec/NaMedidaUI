import api from "../../api";


export default class RequisicaoService {

    static createPedidos = async (pedido) => {
        try {
            const { data } = await api.post(`/requisicao/save`, pedido)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static savePedidos = async (pedidoId, pedido) => {
        try {
            const { data } = await api.put(`/requisicao/${pedidoId}`, pedido)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchPedido = async (id) => {
        try{
           const { data } = await api.get(`/requisicao/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAll = async () => {
        try{
           const { data } = await api.get(`/requisicao`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deletePedidos = async (id) => {
        try {
            const { data } = await api.delete(`/requisicao/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }
}