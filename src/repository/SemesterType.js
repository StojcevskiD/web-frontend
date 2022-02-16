import axios from "../custom-axios/axios";


const SemesterTypeService = {

    getAllSemesterTypes: () => {
        return axios.get(`/semester/type/all`)
    }

}

export default SemesterTypeService