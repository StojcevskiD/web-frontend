import React, {useEffect} from "react";
import './MainPage.css'
import SubjectService from '../../repository/SubjectRepository'
import {Link} from "react-router-dom";

const MainPage = () => {

    const [subjects, setSubjects] = React.useState([])

    useEffect(() => {
        SubjectService.getAllSubjects().then((sub) => {
            console.log("subjects: ", sub.data)
            setSubjects(sub.data)
        })
    }, [])


    return (
        <div className="container">
            <div className="row">
                <h1 id="main_page_title">Предмети:</h1>
                <div className="col-12 col-md-6">
                    <h3 className="main_page_sub_title">Прв колоквиум</h3>
                    <ol>
                        {subjects.map((s) => {
                            return (
                                <li className="main_page_li">
                                    <Link to={"/subject/" + s.id}>
                                        {s.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </div>

                <div className="col-12 col-md-6" id="main_page_second">
                    <h3 className="main_page_sub_title">Втор колоквиум</h3>
                    <ol>
                        {subjects.map((s) => {
                            return (
                                <li className="main_page_li">
                                    <Link to={"/subject/" + s.id}>
                                        {s.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default MainPage