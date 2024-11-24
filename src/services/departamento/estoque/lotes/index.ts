import api from '../../../api';


export default class LoteService {

    static createLote = async (lote) => {
        try {
            const { data } = await api.post(`/lotes/save`, lote)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static saveLote = async (loteId, lote) => {
        try {
            const { data } = await api.put(`/lotes/${loteId}`, lote)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchLote = async (id) => {
        try{
           const { data } = await api.get(`/lotes/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAll = async () => {
        try{
           const { data } = await api.get(`/lotes`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deleteLote = async (id) => {
        try {
            const { data } = await api.delete(`/lotes/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static toggleStatusLote = async (id) => {
        try {
            const { data } = await api.put(`/lotes/toggle/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchAllByProduto = async (id) => {
        try{
           const { data } = await api.get(`/lotes/produto/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }
}