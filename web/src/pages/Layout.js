import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap';

const Layout = () => {
  return (
    <>
      
        <Navbar bg="light" expand="lg">
            <Container>
            <LinkContainer to="/">
              <Navbar.Brand >Spin 'N Stone Pizza</Navbar.Brand>
            </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
            <LinkContainer to="/manager">
                <Nav.Link active={false}>Manager</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/server">
                <Nav.Link active={false}>Server</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
                <Nav.Link active={false}>Login</Nav.Link>
            </LinkContainer>
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;
