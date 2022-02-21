import axios from "../custom-axios/axios";


const FileService = {

    uploadFile: (id, files) => {
        return axios.post(`/file/${id}`, files)
    },

    findFiles: (id) => {
        return axios.get(`/file/${id}`)
    },

    deleteFile: (id) => {
        return axios.delete(`/file/${id}`)
    },

    getFile: (id) => {
        return axios.get(`/file/get/${id}`)
    },

    downloadFile: (id) => {
        return axios.get(`/file/downloadFile/${id}`,
            {
                headers: {
                    "Content-disposition": "attachment; filename=response; charset=UTF-8",
                    //   "Access-Control-Expose-Headers":"Content-Disposition",
                    //   "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
                responseType: 'blob'
            }
        )
    }

}

export default FileService