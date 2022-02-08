import axios from "../custom-axios/axios";

const CSVReaderService = {

    getAllData: () => {
        return axios.get(`/database`)
    }
}

export default CSVReaderService
