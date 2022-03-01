import axios from "../custom-axios/axios";


const UserService = {

    login: (email, password) => {
        return axios.get(`/user/login`, {
            headers: {
                email: email,
                password: password
            }
        })
    },


}

export default UserService