import Navbar from 'react-bootstrap/Navbar'
import {Container, Dropdown, Form, Nav, NavDropdown} from "react-bootstrap";


const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <NavDropdown title="Предмети" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Прва година</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Втора година</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Трета година</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Четврта година</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action5">Сите предмети</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar