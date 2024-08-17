import api from '../api';


class UserService {
    static signin = async (user) => {
        try{
           const { data } = await api.post(`/auth`, user)
           return data;
        }catch(e){
            console.log(JSON.stringify(e))
        }  
    }
}

export default UserService;