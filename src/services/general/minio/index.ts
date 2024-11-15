import apiMinio from "../../apiMinio";


class MinioService {
    static upload = async (user) => {
        try {
            const { data } = await apiMinio.post(`/upload`, user)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

}

export default MinioService;