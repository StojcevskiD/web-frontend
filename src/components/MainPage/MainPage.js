import React, {useEffect} from "react";
import './MainPage.css'
import SubjectService from '../../repository/SubjectRepository'
import {Link, useLocation} from "react-router-dom";
import {AiFillStar} from 'react-icons/ai';


const MainPage = () => {

    const [subjects, setSubjects] = React.useState([])
    const [year, setYear] = React.useState(undefined)
    const [type, setType] = React.useState(undefined)
    const [search, setSearch] = React.useState("")
    const [areFavorites, setAreFavorites] = React.useState(false)
    let p = useLocation().search

    const getQueryParam = () => {
        if (p[6] === "f") {
            setAreFavorites(true)
        } else {
            if (p[6] !== "h") {
                setYear(p[6])
            }
            if (p[1] !== undefined) {
                if (p[1] === "s") {
                    setSearch(p.substring(8, p.length))
                } else if (p[13] === "s") {
                    setType("летен")
                } else if (p[13] === "w") {
                    setType("зимски")
                }
            }
        }
    }

    const addToFavorites = (e) => {
        if (document.getElementById(e.target.parentNode.id).style.color === "yellow") {
            document.getElementById(e.target.parentNode.id).style.color = "black"
        } else {
            document.getElementById(e.target.parentNode.id).style.color = "yellow"
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
                        {areFavorites === true ? <h3>Омилени предмети:</h3> :
                            <div>
                                <h3>Предмети од {year === undefined ? "сите години" : year + " година "}
                                    {type !== undefined ? "(" + type + " семестар)" : null}: </h3>
                                {search !== "" ? <h5>-пребарување по "{search}"</h5> : null}
                            </div>
                        }

                        <ol>
                            {subjects.map((s) => {
                                return (
                                    <li className="main_page_li" key={s.id}>
                                        <Link to={`/subject/${s.id}`}>
                                            {s.name}
                                        </Link>
                                        <AiFillStar size="20px" onClick={addToFavorites} className="main_page_star"
                                                    id={"unique_star_id" + s.id}/>
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