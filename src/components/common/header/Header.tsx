import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { NavLink } from "react-router-dom";
import HeaderLeft from "@components/common/header/headerLeft/HeaderLeft";

import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./styles.module.css";
const { headerContainer, headerLogo } = styles;

import { ROUTES } from "@utils";
const Header = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);

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
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to={ROUTES.REGISTER}>
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to={ROUTES.LOGIN}>
                    Login
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  title={`Welcome ${user?.firstName} ${user?.lastName}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to={ROUTES.PROFILE}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to={ROUTES.ORDER}>
                    Order
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to={ROUTES.LOGIN}
                    onClick={() => dispatch(authLogout())}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
