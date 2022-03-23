import axios from "../custom-axios/axios";


const ExamTypeService = {

    getAllExamTypes: () => {
        return axios.get(`/exam-type/all`)
    },

    getExamType: (id) => {
        return axios.get(`/exam-type/${id}`)
    },

}

export default ExamTypeService