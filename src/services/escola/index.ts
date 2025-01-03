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

    static saveEscola = async (escolaId, escola) => {
        try {
            const { data } = await api.put(`/unidadeensino/${escolaId}`, escola)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static searchEscola = async (id) => {
        try {
            const { data } = await api.get(`/unidadeensino/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchEscola = async (id) => {
        try {
            const { data } = await api.get(`/unidadeensino/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchAll = async () => {
        try {
            const { data } = await api.get(`/unidadeensino`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchAtivos = async (enabled) => {
        try {
            const { data } = await api.get(`/unidadeensino/enabled/${enabled}`)
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

    static saveResponsavel = async (nomeResponsavel) => {
        try {
            const { data } = await api.post(`/responsavel/save/${nomeResponsavel}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchResponsaveis = async () => {
        try {
            const { data } = await api.get(`/responsavel`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static vincularResponsavel = async (escolaId, responsavelId) => {
        try {
            const { data } = await api.post(`/unidadeensino/vincular/${escolaId}/${responsavelId}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchRefeicoes = async () => {
        try {
            const { data } = await api.get(`/unidadeensinorefeicao`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static createRefeicao = async (form) => {
        try {
            const { data } = await api.post(`/unidadeensinorefeicao/save`, form)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static createRefeicaoItens = async (form) => {
        try {
            const { data } = await api.post(`/refeicaoitem/save`, form)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchRefeicaoItens = async (id) => {
        try {
            const { data } = await api.get(`/refeicaoitem/refeicao/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }
}

export default EscolaService;