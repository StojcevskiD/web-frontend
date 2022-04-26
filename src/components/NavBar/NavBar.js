import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css'
import {Container, Nav, NavDropdown} from "react-bootstrap";
import React, {Fragment, useEffect} from "react";
import {FaSearch} from 'react-icons/fa';
import YearService from "../../repository/YearRepository";
import SemesterTypeService from "../../repository/SemesterType";
import {DiDatabase} from "react-icons/di";
import CSVReaderService from "../../repository/ReaderRepository";
import UserService from "../../repository/UserRepository";
import {useTranslation} from "react-i18next";


const NavBar = () => {
    const {t, i18n} = useTranslation('lang')
    const username = localStorage.getItem("username")

    const [searchValue, setSearchValue] = React.useState("")
    const [years, setYears] = React.useState([])
    const [semesterTypes, setSemesterTypes] = React.useState([])

    const search = () => {
        if (searchValue !== "") {
            window.location.href = "/subjects?search=" + searchValue
        } else {
            window.location.href = "/subjects?page=1"
        }
    }

    const onValueChange = (e) => {
        setSearchValue(e.target.value)
    }

    const enterHandler = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    const fetchAllYears = () => {
        YearService.getAllYears().then((year) => {
            setYears(year.data)
        })
    }

    const fetchAllSemesterTypes = () => {
        SemesterTypeService.getAllSemesterTypes().then((type) => {
            setSemesterTypes(type.data)
        })
    }

    const logout = () => {
        UserService.logout().then(() => {
            localStorage.clear()
            window.location.href = "/login"
        })
    }

    useEffect(() => {
            fetchAllSemesterTypes()
            fetchAllYears()
        }, []
    )

    function getAllData() {
        CSVReaderService.getAllData()
    }

    const changeLanguage = (lng) => {
        localStorage.setItem("lng", lng)
        i18n.changeLanguage(lng)
    }

    return (
        <Navbar id="nav_bar" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/subjects?page=1">{t('TITLE')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavDropdown title={t('SUBJECTS')}>
                            {years.map((y, ind) => {
                                return (
                                    <NavDropdown.Item href={"/subjects?year=" + y.id} key={y.id}
                                                      className={"navBar_item" + ind}>{y.name} година
                                        <div className="floatDiv">
                                            {semesterTypes.map((t, index) => {
                                                return (
                                                    <NavDropdown.Item
                                                        href={"/subjects?year=" + y.id + "&type=" + t.id}
                                                        key={t.id}>{t.name} семестар</NavDropdown.Item>
                                                )
                                            })}
                                        </div>
                                    </NavDropdown.Item>
                                )
                            })}
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/subjects?page=1">{t('ALL_SUBJECTS')}</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/schedule">{t('SCHEDULE')}</NavDropdown.Item>
                        </NavDropdown>
                        {localStorage.getItem("role") ?
                            <Nav.Link href="/subjects?type=favorites">{t('MY_SUBJECTS')}</Nav.Link> : null}
                        {/*<button onClick={getAllData}*/}
                        {/*        className="btn btn-secondary" id="navBar_dataBase"><DiDatabase/></button>*/}
                    </Nav>
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder={t('SEARCH') + '...'}
                            className="me-2 form-control"
                            aria-label="Search"
                            value={searchValue}
                            onChange={onValueChange}
                            onKeyPress={enterHandler}
                        />
                        <div><FaSearch id="nav_bar_search_icon" size={19} cursor="pointer" onClick={search}/></div>
                    </div>
                    {localStorage.getItem("role") ? <>
                            <span className="nav_bar_username mx-3">{t('USERNAME') + ': ' + username}</span>
                            <Nav.Link className="nav_bar_login_link" onClick={logout}>{t('LOGOUT')}</Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link className="nav_bar_login_link" href="/login">{t('LOG_IN')}</Nav.Link>
                            <Nav.Link className="nav_bar_login_link" href="/register">{t('REGISTER')}</Nav.Link>
                        </>}
                    <Nav.Link className="nav_bar_login_link">
                        <span onClick={() => changeLanguage('mk')}>MK</span>
                        <span>/</span>
                        <span onClick={() => changeLanguage('en')}>EN</span>
                    </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
