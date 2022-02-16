import axios from "../custom-axios/axios";


const YearService = {

    getAllYears: () => {
        return axios.get(`/year/all`)
    }

}

export default YearService