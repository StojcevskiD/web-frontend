import axios from "../custom-axios/axios";

const SubjectService = {

    getAllSubjects: () => {
        return axios.get(`/subject/all`)
    },

    getPaginatedSubjects: (pageNo, pageSize) => {
        return axios.get(`/subject/page/${pageNo}/${pageSize}`)
    },
    getTotalSubjects: () => {
        return axios.get(`subject/totalSubjects`)
    },

    getSubjectById: (id) => {
        return axios.get(`/subject/${id}`)
    },

    getAllSubjectsByYear: (id) => {
        return axios.get(`/subject/filter/year`, {params: {yearId: id}})
    },

    getAllSubjectsByYearAndSemester: (year, semester) => {
        return axios.get(`/subject/filter/semester`, {params: {yearId: year, semesterId: semester}})
    },

    getAllSubjectsWithSearch: (value) => {
        return axios.get(`/subject/search`, {params: {value: value}})
    }

}

export default SubjectService
