import React, {useEffect} from "react";
import './MainPage.css'
import SubjectService from '../../repository/SubjectRepository'
import {Link, useLocation} from "react-router-dom";
import {AiFillStar} from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CSVReaderService from "../../repository/ReaderRepository"
import {DiDatabase} from 'react-icons/di';
import {FadeLoader} from "react-spinners";

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
        console.log(document.getElementById(e.target.parentNode.id).style.color)
        if (document.getElementById(e.target.parentNode.id).style.color === "rgb(227, 216, 2)") {
            document.getElementById(e.target.parentNode.id).style.color = "black"
        } else {
            document.getElementById(e.target.parentNode.id).style.color = "#e3d802"
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


    function getAllData(){
        getQueryParam()
        CSVReaderService.getAllData()
    }

    return (
        <div className="container">
            <div id="div_loader">
                <FadeLoader id="spinner"/>
                <div id="loading_mess">Loading</div>
            </div>
            <div className="row">
                <div className="col">
                    <h1 id="main_page_title">Предмети</h1>
                    <span><button style={{float: "right"}} onClick={getAllData} className="btn btn-secondary"><DiDatabase/></button></span>
                    <div>
                        {areFavorites === true ? <h3>Мои предмети:</h3> :
                            <div>
                                <h3>Предмети од {year === undefined ? "сите години" : year + " година "}
                                    {type !== undefined ? "(" + type + " семестар)" : null}: </h3>
                                {search !== "" ? <h5>-пребарување по "{search}"</h5> : null}
                            </div>
                        }
                        <GridList cellHeight={50} cols={3} className="subject_list">
                            {subjects.map((s) => {
                                return (
                                    <GridListTile key={s.id} className="main_page_list_item">
                                        <Link className="link_subject" to={`/subject/${s.id}`}>
                                            {s.name}
                                        </Link>
                                        <span>
                                            <AiFillStar size="22" onClick={addToFavorites} className="main_page_star"
                                                        id={"unique_star_id" + s.id}/>
                                        </span>
                                    </GridListTile>
                                )
                            })}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
