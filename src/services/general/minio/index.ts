import apiMinio from "../../apiMinio";


class MinioService {
    static upload = async (form) => {
        try {
            const { data } = await apiMinio.post(`/upload`, form)
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }

    static download = async (form) => {
        try {
            const { data } = await apiMinio.post(`/download/`, form, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json;',
                }
              });
            return data;
        } catch (e) {
            throw new Error(e?.response?.data?.message);
        }
    }
}

export default MinioService;