import React, {Fragment} from 'react';
import {Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

// lots of Bootstrap code here
// Notice the use of <Fragment> to avoid adding useless <div>s 
const NavBar = ({isAuthenticated, username, handleLogout}) => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          {isAuthenticated
            ? <Link to="/">{username}</Link>
            : 'TodoApp'
          }
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {isAuthenticated
            ? <NavItem onClick={handleLogout}>Logout</NavItem>
            : <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
