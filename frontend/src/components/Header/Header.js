import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { logout } from "../../actions/userActions";
import './Header.css'

const Header = ({ setSearch }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar bg="primary" expand="lg" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="brand">
          Note Zipper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="🔎 Search"
                className="mr-sm-2 custom-search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </nav>
          {userInfo ? (
            <Nav>
              <Nav.Link href="/mynotes" className="nav-link">
                My Notes
              </Nav.Link>
              <NavDropdown
                title={userInfo?.name}
                id="basic-nav-dropdown"
                className="nav-dropdown"
              >
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login" className="nav-link">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
