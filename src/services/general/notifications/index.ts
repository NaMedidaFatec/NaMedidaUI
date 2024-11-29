import api from "../../api";

class NotificationService {
    static fetchAll = async () => {
        try {
            const { data } = await api.get(`/notificacoes/me`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static markSeen = async (id) => {
        try {
            const { data } = await api.put(`/notificacoes/marcar-visto/${id}`)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }
}

export default NotificationService;