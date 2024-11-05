import api from '../../../api';


export default class ProdutoService {

    static createProduto = async (produto) => {
        try {
            const { data } = await api.post(`/produtos/save`, produto)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static saveProduto = async (produtoId, produto) => {
        try {
            const { data } = await api.put(`/produtos/${produtoId}`, produto)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchProduto = async (id) => {
        try{
           const { data } = await api.get(`/produtos/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAll = async () => {
        try{
           const { data } = await api.get(`/produtos`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deleteProduto = async (id) => {
        try {
            const { data } = await api.delete(`/produtos/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

}