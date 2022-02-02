import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css'
import {Button, Container, Form, FormControl, Nav, NavDropdown} from "react-bootstrap";
import React from "react";

const NavBar = () => {

    const [searchValue, setSearchValue] = React.useState("")

    const search = () => {
        window.location.href = "/subjects?year=0&search=" + searchValue
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
        <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
            <Container>
                <Navbar.Brand href="/subjects?year=0">Предметник</Navbar.Brand>
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
                            <NavDropdown.Item href="/subjects?year=0">Сите предмети</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="email"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchValue}
                            onChange={onValueChange}
                            onKeyPress={enterHandler}
                        />
                        <Button variant="outline-secondary" onClick={search}>Search</Button>
                    </Form>
                    <Nav.Link href="/login">Логирај се</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar