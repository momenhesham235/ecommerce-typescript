import { NavLink } from "react-router-dom";
import HeaderLeft from "@components/common/header/headerLeft/HeaderLeft";

import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import styles from "./styles.module.css";
const { headerContainer, headerLogo } = styles;

import { ROUTES } from "@utils";
const Header = () => {
  return (
    <header>
      {/* Top Header */}
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Online</span> <Badge bg="info">Shop</Badge>
        </h1>

        <HeaderLeft />
      </div>

      {/* Bottom Header */}
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={ROUTES.HOME}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to={ROUTES.ABOUT}>
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to={ROUTES.CATEGORIES}>
                Categories
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to={ROUTES.LOGIN}>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to={ROUTES.REGISTER}>
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
