import axios from "../custom-axios/axios";


const UserService = {

    login: (email, password) => {
        const formData = {email: email, password: password}
        console.log("formm", formData)
        return axios.post(`/user/login`, formData)
    },

    register: (email, password, body) => {
        return axios.post(`/user/register`, body, {
            headers: {
                email: email,
                password: password
            }
        })
    },

    logout: () => {
        axios.get(`/user/logout`)
    },


}

export default UserService