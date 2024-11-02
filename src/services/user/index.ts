import api from '../api';


class UserService {
    static signin = async (user) => {
        try {
            const { data } = await api.post(`/authenticate/login`, user)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static getMe = async () => {
        try {
            const { data } = await api.get('authenticate/me')
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static register = async (newUser) => {
        try {
            const { data } = await api.post('authenticate/signup', newUser)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchCidades = async () => {
        try {
            const { data } = await api.get('cidades')
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static fetchEstados = async () => {
        try {
            const { data } = await api.get('estados')
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }
}

export default UserService;