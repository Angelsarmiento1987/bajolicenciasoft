
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import '../MenuNav/MenuNav.css'
import logo from '../../Img/bajolicencia.png'

const MenuNav = () => {
    return(
        <Navbar expand="lg" className="mi-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className='logoTitulo'><img src={logo} alt="Mi Logo" className='logoImg' /> Bajo Licencia Soft</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/lecturacancion">Cargar Cancion</Nav.Link>
              <NavDropdown title="Ver Mas..." id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Info App</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Modo de Uso
                </NavDropdown.Item>
               
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Mas Apps
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export { MenuNav }