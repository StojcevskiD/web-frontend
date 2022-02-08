import axios from "../custom-axios/axios";

const SubjectService = {

    getAllSubjects: () => {
        return axios.get(`/subject/all`)
    },
    getSubjectById: (id) => {
        return axios.get(`/subject/${id}`)
    },
    getAllSubjectsByYear: (year) => {
        return axios.get(`/subject/${year}`)
    }

}

export default SubjectService
