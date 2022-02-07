import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css'
import {Button, Container, Form, FormControl, Nav, NavDropdown} from "react-bootstrap";
import React from "react";
import {FaSearch} from 'react-icons/fa';

const NavBar = () => {

    const [searchValue, setSearchValue] = React.useState("")

    const search = () => {
        window.location.href = "/subjects?search=" + searchValue
    }

    const onValueChange = (e) => {
        setSearchValue(e.target.value)
    }

    const enterHandler = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    return (
        <Navbar id="nav_bar" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/subjects">Предметник</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavDropdown title="Предмети">
                            <NavDropdown.Item href="/subjects?year=1" className="navBar_item1">Прва година
                                <div className="floatDiv">
                                    <NavDropdown.Item href="/subjects?year=1&type=winter">Зимски
                                        семестар </NavDropdown.Item>
                                    <NavDropdown.Item href="/subjects?year=1&type=summer">Летен
                                        семестар</NavDropdown.Item>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/subjects?year=2" className="navBar_item2">Втора година
                                <div className="floatDiv">
                                    <NavDropdown.Item href="/subjects?year=2&type=winter">Зимски
                                        семестар</NavDropdown.Item>
                                    <NavDropdown.Item href="/subjects?year=2&type=summer">Летен
                                        семестар</NavDropdown.Item>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/subjects?year=3" className="navBar_item3">Трета година
                                <div className="floatDiv">
                                    <NavDropdown.Item href="/subjects?year=3&type=winter">Зимски
                                        семестар</NavDropdown.Item>
                                    <NavDropdown.Item href="/subjects?year=3&type=summer">Летен
                                        семестар</NavDropdown.Item>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/subjects?year=4" className="navBar_item4">Четврта година
                                <div className="floatDiv">
                                    <NavDropdown.Item href="/subjects?year=4&type=winter">Зимски
                                        семестар</NavDropdown.Item>
                                    <NavDropdown.Item href="/subjects?year=4&type=summer">Летен
                                        семестар</NavDropdown.Item>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/subjects">Сите предмети</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/subjects?type=favorites">Омилени предмети</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="email"
                            placeholder="Search..."
                            className="me-2"
                            aria-label="Search"
                            value={searchValue}
                            onChange={onValueChange}
                            onKeyPress={enterHandler}
                        />
                        <div><FaSearch id="nav_bar_search_icon" size={19} cursor="pointer" onClick={search}/></div>
                    </Form>
                    <Nav.Link className="nav_bar_login_link" href="/login">Најави се</Nav.Link>
                    <Nav.Link className="nav_bar_login_link" href="/register">Регистрирај се</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
