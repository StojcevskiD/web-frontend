import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import SubjectService from "../../repository/SubjectRepository";


const Subject = () => {
    const id = useParams()

    useEffect(() => {


    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>

                    </h1>
                </div>
            </div>
        </div>
    )

}

export default Subject