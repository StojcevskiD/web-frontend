import axios from "../custom-axios/axios";


const FileService = {

    uploadFile: (id, files) => {
        return axios.post(`/file/${id}`, files)
    },

    findFiles: (id) => {
        return axios.get(`/file/${id}`)
    },

    deleteFile: (id) => {
        console.log("d", id)
        return axios.delete(`/file/${id}`)
    }

}

export default FileService