import axios from "../custom-axios/axios";


const UserService = {

    login: (email, password) => {
        const formData = {email: email, password: password}
        console.log("formm", formData)
        return axios.post(`/user/login`, formData)
    },


}

export default UserService