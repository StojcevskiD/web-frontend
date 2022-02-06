import axios from "../custom-axios/axios";


const FileService = {

    uploadFile: (id, files) => {
        console.log("id", id)
        console.log("files", files)
        return axios.post(`/file/${id}`, {files},
            {
                headers:
                    {
                        'content-type': 'multipart/form-data',
                    }
            }
        )
    }

}

export default FileService