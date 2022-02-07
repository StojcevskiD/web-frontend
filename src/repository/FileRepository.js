import axios from "../custom-axios/axios";


const FileService = {

    uploadFile: (id, files) => {
        return axios.post(`/file/${id}`, files)
    }

}

export default FileService