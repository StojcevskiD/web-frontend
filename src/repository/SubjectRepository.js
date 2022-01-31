import axios from "../custom-axios/axios";

const SubjectService = {

    getAllSubjects: () => {
        return axios.get(`/subject/all`)
    },
}

export default SubjectService