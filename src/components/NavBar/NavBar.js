import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css'
import {Container, Nav, NavDropdown} from "react-bootstrap";
import React, {useEffect} from "react";
import {FaSearch} from 'react-icons/fa';
import YearService from "../../repository/YearRepository";
import SemesterTypeService from "../../repository/SemesterType";
import {DiDatabase} from "react-icons/di";
import CSVReaderService from "../../repository/ReaderRepository";
import UserService from "../../repository/UserRepository";


const NavBar = () => {

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
        UserService.logout()
        window.location.href = "/login"
    }

    useEffect(() => {
            fetchAllSemesterTypes()
            fetchAllYears()
        }, []
    )


    function getAllData() {
        CSVReaderService.getAllData()
    }

    return (
        <Navbar id="nav_bar" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/subjects?page=1">Предметник</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavDropdown title="Предмети">
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
                            <NavDropdown.Item href="/subjects?page=1">Сите предмети</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/subjects?type=favorites">Мои предмети</Nav.Link>
                        <button onClick={getAllData}
                                className="btn btn-secondary"><DiDatabase/></button>
                    </Nav>
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="me-2 form-control"
                            aria-label="Search"
                            value={searchValue}
                            onChange={onValueChange}
                            onKeyPress={enterHandler}
                        />
                        <div><FaSearch id="nav_bar_search_icon" size={19} cursor="pointer" onClick={search}/></div>
                    </div>
                    <Nav.Link className="nav_bar_login_link" href="/login">Најави се</Nav.Link>
                    <Nav.Link className="nav_bar_login_link" onClick={logout}>Одјави се</Nav.Link>
                    <Nav.Link className="nav_bar_login_link" href="/register">Регистрирај се</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
