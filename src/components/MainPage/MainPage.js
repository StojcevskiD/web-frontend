import React, {useEffect} from "react";
import './MainPage.css'
import SubjectService from '../../repository/SubjectRepository'
import {Link, useLocation} from "react-router-dom";

const MainPage = () => {

    const [subjects, setSubjects] = React.useState([])
    const [year, setYear] = React.useState(null)
    const [type, setType] = React.useState(null)
    const [search, setSearch] = React.useState("")
    let p = useLocation().search

    const getQueryParam = () => {
        setYear(p[6])
        if (p[6] === "0") {
            setYear("сите")
        }
        if (p[8] !== undefined) {
            if (p[8] === "s") {
                setSearch(p.substring(15, p.length))
            } else if (p[13] === "s") {
                setType("летен")
            } else {
                setType("зимски")
            }
        }
    }


    useEffect(() => {
            getQueryParam()
            SubjectService.getAllSubjects().then((sub) => {
                // console.log("subjects: ", sub.data)
                setSubjects(sub.data)
            })
        }, []
    )


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 id="main_page_title">Предмети</h1>
                    <div>
                        <h3>Предмети од {year === "сите" || year === undefined ? "сите години" : year + " година "}
                            {type !== null ? "(" + type + " семестар)" : null}: </h3>
                        {search !== "" ? <h5>-пребарување по "{search}"</h5> : null}
                        <ol>
                            {subjects.map((s) => {
                                return (
                                    <li className="main_page_li" key={s.id}>
                                        <Link to={`/subject/${s.id}`}>
                                            {s.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage