import React, {useEffect} from "react";
import SubjectService from '../repository/SubjectRepository'

const MainPage = () => {

    const [subjects, setSubjects] = React.useState([])

    useEffect(() => {
        console.log(".evn", process.env.REACT_APP_HOST_ENV)
        SubjectService.getAllSubjects().then((sub) => {
            console.log("subjects: ", sub.data)
            setSubjects(sub.data)
        })
    }, [])

    return (
        <div className="container">
            <h2>Наслов</h2>
            <div>Внеси нешто</div>
            <input className="form-check"/>
            <button className="btn btn-info mt-2"> Submit</button>
            <div className="mt-3"><h3>Subjects:</h3>
                {subjects.map((s) => {
                    return (
                        <div>{s.name}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default MainPage