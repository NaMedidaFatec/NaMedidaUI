import api from "../../api";


class RelatorioService {
    static createRelatorio = async (relatorio) => {
        try {
            const { data } = await api.post(`/relatorio/save`, relatorio)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static saveRelatorio = async (relatorioId, relatorio) => {
        try {
            const { data } = await api.put(`/relatorio/${relatorioId}`, relatorio)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchRelatorio = async (id) => {
        try{
           const { data } = await api.get(`/relatorio/${id}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAllRelatorios = async () => {
        try{
           const { data } = await api.get(`/relatorio`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static fetchAllRelatoriosByUnidadeEnsino = async (escolaId) => {
        try{
           const { data } = await api.get(`/relatorio/unidadeensino/${escolaId}`)
           return data;
        }catch(e){
            throw new Error(e?.response?.data?.message);
        }  
    }

    static deleteRelatorio = async (id) => {
        try {
            const { data } = await api.delete(`/relatorio/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }
}

export default RelatorioService;