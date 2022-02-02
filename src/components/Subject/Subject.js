import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import './Subject.css'
import SubjectService from "../../repository/SubjectRepository";


const Subject = () => {
    const id = parseInt(useParams().id)

    const [subject, setSubject] = React.useState();
    useEffect(() => {
        SubjectService.getSubjectById(id).then((s) => {
            setSubject(s.data)
            console.log("sub", s.data)
        })

    }, [id])

    return (
        <div className="container">
            {subject !== undefined ?
                <div className="row">
                    <h1 id="subject_title">{subject.name}</h1>
                    <div className="col-12 col-lg-4">
                        <h3 className="subject_sub_title">Прв колоквиум</h3>

                    </div>

                    <div className="col-12 col-lg-4 subject_sub_title_border">
                        <h3 className="subject_sub_title">Втор колоквиум</h3>

                    </div>

                    <div className="col-12 col-lg-4 subject_sub_title_border">
                        <h3 className="subject_sub_title">Испит</h3>

                    </div>
                </div>
                :
                <div/>
            }
        </div>
    )
}

export default Subject