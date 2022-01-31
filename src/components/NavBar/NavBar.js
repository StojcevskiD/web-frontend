import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css'
import {Button, Container, Form, FormControl, Nav, NavDropdown} from "react-bootstrap";


const NavBar = () => {

    const search = () => {

    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Предметник</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavDropdown title="Предмети">
                            <NavDropdown.Item href="/" className="navBar_menu_items">Прва година
                                <div className="floatDiv">
                                    <NavDropdown.Item href="/">Зимски семестар</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Летен семестар</NavDropdown.Item>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/" className="navBar_menu_items">Втора година
                                <div className="floatDiv">
                                    <NavDropdown.Item href="/">Зимски семестар</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Летен семестар</NavDropdown.Item>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/" className="navBar_menu_items">Трета година
                                <div className="floatDiv">
                                    <NavDropdown.Item href="/">Зимски семестар</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Летен семестар</NavDropdown.Item>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/" className="navBar_menu_items">Четврта година
                                <div className="floatDiv">
                                    <NavDropdown.Item href="/">Зимски семестар</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Летен семестар</NavDropdown.Item>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/">Сите предмети</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
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