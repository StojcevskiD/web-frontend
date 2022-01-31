import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css'
import {Container, Dropdown, Form, Nav, NavDropdown} from "react-bootstrap";


const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand href="#home">Предметник</Navbar.Brand>
                <Nav className="me-auto">
                    <NavDropdown title="Предмети" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/">Прва година</NavDropdown.Item>
                        <NavDropdown.Item href="/">Втора година</NavDropdown.Item>
                        <NavDropdown.Item href="/">Трета година</NavDropdown.Item>
                        <NavDropdown.Item href="/">Четврта година</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="/">Сите предмети</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/login">Логирај се</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar