import React, {useEffect} from "react";
import './MainPage.css'
import SubjectService from '../../repository/SubjectRepository'
import {Link, useLocation} from "react-router-dom";
import {AiFillStar} from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ImageList} from '@material-ui/core';
import ImageListItem from '@material-ui/core/ImageListItem'
import CSVReaderService from "../../repository/ReaderRepository"
import {FadeLoader} from "react-spinners";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const MainPage = () => {

    const [subjects, setSubjects] = React.useState([])
    const [year, setYear] = React.useState(undefined)
    const [type, setType] = React.useState(undefined)
    const [search, setSearch] = React.useState("")
    const [areFavorites, setAreFavorites] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [showPagination, setShowPagination] = React.useState(false)
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0)
    const [sizeOnPage, setSizeOnPage] = React.useState(30)
    const [totalSubjects, setTotalSubjects] = React.useState(0)

    let p = decodeURI(useLocation().search)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getPaginatedSubjects(newPage, sizeOnPage)
    };

    const changeSizePerPage = (event) => {
        let p = parseInt(event.target.value)
        setSizeOnPage(p)
        setPage(1);
        setTotalPages(Math.ceil(totalSubjects / p))
        getPaginatedSubjects(1, p)
    };

    const getQueryParam = () => {
        setShowPagination(false)
        if (p[1] === "p") {
            getPaginatedSubjects(page, sizeOnPage)
            setShowPagination(true)
        } else if (p[6] === "f") {
            setAreFavorites(true)
            fetchAllSubjects()
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
            setSubjects(r.data)
        }).then(() => {
            setLoading(false)
        })
    }

    const filterByYearAndSemester = (y, type) => {
        SubjectService.getAllSubjectsByYearAndSemester(y, type).then(r => {
            setSubjects(r.data)
        }).then(() => {
            setLoading(false)
        })
    }

    const searchFilter = (val) => {
        SubjectService.getAllSubjectsWithSearch(val).then(r => {
            setSubjects(r.data)
        }).then(() => {
            setLoading(false)
        })
    }

    const fetchAllSubjects = () => {
        setLoading(true)
        SubjectService.getAllSubjects().then((sub) => {
            setSubjects(sub.data)
        }).then(() => {
            setLoading(false)
        })
    }

    const getTotalSubjects = () => {
        SubjectService.getTotalSubjects().then(r => {
            setTotalSubjects(r.data)
            setTotalPages(Math.ceil(r.data / sizeOnPage))
        })
    }

    const getPaginatedSubjects = (p, s) => {
        SubjectService.getPaginatedSubjects(p, s).then(r => {
            setSubjects(r.data)
        }).then(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
            getQueryParam()
            getTotalSubjects()
        }, []
    )

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="container">
            {loading === true ?
                <div id="div_loader">
                    <FadeLoader speedMultiplier={2} color={"#2a439a"}/>
                    <div id="loading_mess">Loading...</div>
                </div>
                :
                <div className="row">
                    <div className="col">
                        <h1 id="main_page_title">Предмети</h1>

                        <div>
                            <a className="btn main_page_add_subject_btn" href="/add/subject">Додади предмет</a>
                        </div>

                        <div style={{marginBottom: "30px"}}>
                            {areFavorites === true ? <h3>Мои предмети:</h3> :
                                <div style={{marginBottom: "20px"}}>
                                    <h3>Предмети од {year === undefined ? "сите години" : year + " година "}
                                        {type !== undefined ? "(" + type + " семестар)" : null}: </h3>
                                    {search !== "" ? <h5 id="search_message">-пребарување по "{search}"</h5> : null}
                                </div>
                            }



                            {showPagination === true ?
                                <div id="main_page_pagination_div">
                                    <Pagination id="main_page_pagination"
                                                count={totalPages} page={page}
                                                color={'primary'} variant="outlined"
                                                onChange={handleChangePage}
                                                renderItem={(item) => (
                                                    <PaginationItem
                                                        component={Link}
                                                        to={`/subjects?page=${item.page}`}
                                                        {...item}
                                                    />
                                                )}
                                    />
                                    <div id="main_page_selection">
                                        <h5>Прикажи по страна:</h5>
                                        <select id="main_page_select" onChange={changeSizePerPage}>
                                            <option defaultValue="30">30</option>
                                            <option value="45">45</option>
                                            <option value="60">60</option>
                                            <option value="75">75</option>
                                            <option value="90">90</option>
                                        </select>
                                    </div>
                                </div> : null}
                            {subjects.length === 0 ?
                                <h1 id="main_page_subjects_not_found" className="danger">Нема предмети по даденото пребарување</h1> :
                                <ImageList cols={3} className="main_page_subject_list">
                                    {subjects.map((s) => {
                                        return (
                                            <ImageListItem key={s.id} className="main_page_list_item">
                                                <AiFillStar size="22" onClick={addToFavorites}
                                                            className="main_page_star"
                                                            id={"unique_star_id" + s.id}/>
                                                <Link className="link_subject" to={`/subject/${s.id}`}>
                                                    {s.name}
                                                </Link>

                                            </ImageListItem>
                                        )
                                    })}
                                </ImageList>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MainPage
