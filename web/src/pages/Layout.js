import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap';

const Layout = () => {
  return (
    <>
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/server">Server</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/manager">Manager</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/Login">Login</a>
        </li>
        </ul>
        </div>
        </div>
        </nav> */}
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
