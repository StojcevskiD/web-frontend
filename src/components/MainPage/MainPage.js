import React, {useEffect} from "react";
import './MainPage.css'
import SubjectService from '../../repository/SubjectRepository'
import {Link, useLocation} from "react-router-dom";
import {AiFillStar} from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ImageList} from '@material-ui/core';
import ImageListItem from '@material-ui/core/ImageListItem'
import CSVReaderService from "../../repository/ReaderRepository"
import {DiDatabase} from 'react-icons/di';
import {FadeLoader} from "react-spinners";

const MainPage = () => {

    const [subjects, setSubjects] = React.useState([])
    const [year, setYear] = React.useState(undefined)
    const [type, setType] = React.useState(undefined)
    const [search, setSearch] = React.useState("")
    const [areFavorites, setAreFavorites] = React.useState(false)
    const [filteredSubjectsByYear, setFilteredSubjectsByYear] = React.useState([])
    const [filteredSubjectsByYearAndSemester, setFilteredSubjectsByYearAndSemester] = React.useState([])
    const [subjectsBySearch, setSubjectsBySearch] = React.useState([])
    let p = decodeURI(useLocation().search)

    const getQueryParam = () => {
        if (p[6] === "f") {
            setAreFavorites(true)
        } else {
            if (p[6] !== "h" && p[6] !== undefined) {
                setYear(p[6])
                filterByYear(parseInt(p[6]))
            }
            if (p[1] !== undefined) {
                if (p[1] === "s") {
                    let s = p.substring(8, p.length)
                    setSearch(s)
                    searchFilter(s)
                } else if (p[13] === "s") {
                    setType("летен")
                    filterByYearAndSemester(parseInt(p[6]), 1)
                } else if (p[13] === "w") {
                    setType("зимски")
                    filterByYearAndSemester(parseInt(p[6]), 2)
                }
            }
        }
    }

    const addToFavorites = (e) => {
        if (document.getElementById(e.target.parentNode.id).style.color === "rgb(227, 216, 2)") {
            document.getElementById(e.target.parentNode.id).style.color = "black"
        } else {
            document.getElementById(e.target.parentNode.id).style.color = "#e3d802"
        }
    }

    const filterByYear = (y) => {
        SubjectService.getAllSubjectsByYear(y).then(r => {
            setFilteredSubjectsByYear(r.data)
        })
    }

    const filterByYearAndSemester = (y, type) => {
        SubjectService.getAllSubjectsByYearAndSemester(y, type).then(r => {
            setFilteredSubjectsByYearAndSemester(r.data)
        })
    }

    const searchFilter = (val) => {
        SubjectService.getAllSubjectsWithSearch(val).then(r => {
            setSubjectsBySearch(r.data)
        })
    }

    useEffect(() => {
            getQueryParam()
            SubjectService.getAllSubjects().then((sub) => {
                setSubjects(sub.data)
            })
        }, []
    )


    function getAllData() {
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
                    <span><button style={{float: "right"}} onClick={getAllData}
                                  className="btn btn-secondary"><DiDatabase/></button></span>
                    <div>
                        {areFavorites === true ? <h3>Мои предмети:</h3> :
                            <div>
                                <h3>Предмети од {year === undefined ? "сите години" : year + " година "}
                                    {type !== undefined ? "(" + type + " семестар)" : null}: </h3>
                                {search !== "" ? <h5>-пребарување по "{search}"</h5> : null}
                            </div>
                        }

                        <ImageList rowHeight={50} cols={3} className="subject_list">
                            {subjects.map((s) => {
                                return (
                                    <ImageListItem key={s.id} className="main_page_list_item">
                                        <Link className="link_subject" to={`/subject/${s.id}`}>
                                            {s.name}
                                        </Link>
                                        <span>
                                            <AiFillStar size="22" onClick={addToFavorites} className="main_page_star"
                                                        id={"unique_star_id" + s.id}/>
                                        </span>
                                    </ImageListItem>
                                )
                            })}
                        </ImageList>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
