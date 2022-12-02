import { Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    var employ = localStorage.getItem("employee");
    if (employ === null) {
      localStorage.setItem("employee", false);
      window.location.reload();
    }
  }, []);

  function setNavBar() {
    var employ = localStorage.getItem("employee");
    if (employ === null) {
      localStorage.setItem("employee", false);
      window.location.reload();
    }
    return true;
  }

  return (
    <>
      <Navbar className="shadow-sm" bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {/* <img  style={{ width:'10vw', height:'auto'}} alt="spin n stone logo" /> */}
              <img
                src={require("../spin_n_stone_logo.png")}
                height="50vh"
                className="d-inline-block align-top"
                alt="spin n stone logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {localStorage.getItem("manager") === "true" &&
                localStorage.getItem("isLoggedIn") === "true" &&
                localStorage.getItem("employee") === "true" && (
                  <LinkContainer to="/manager">
                    <Nav.Link active={false}>Manager</Nav.Link>
                  </LinkContainer>
                )}
              {localStorage.getItem("employee") === "true" &&
                localStorage.getItem("isLoggedIn") === "true" && (
                  <LinkContainer to="/server">
                    <Nav.Link active={false}>Server</Nav.Link>
                  </LinkContainer>
                )}
              <LinkContainer to="/order">
                <Nav.Link active={false}>Order</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/pickup">
                <Nav.Link active={false}>Pickup</Nav.Link>
              </LinkContainer>
              {(localStorage.getItem("isLoggedIn") === "false" ||
                localStorage.getItem("isLoggedIn") === null) && (
                <LinkContainer to="/login">
                  <Nav.Link active={false}>Login</Nav.Link>
                </LinkContainer>
              )}
              {localStorage.getItem("isLoggedIn") === "true" && (
                <LinkContainer to="/login">
                  <Nav.Link active={false}>Logout</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
