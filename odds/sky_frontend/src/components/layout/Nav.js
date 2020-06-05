import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default class NavBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Link to="/">
          <Navbar.Brand>Sky Odds</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link href="">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/data">
              <Nav.Link href="">Chart</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <NavDropdown title="Other" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/api/">Api</NavDropdown.Item>
              <NavDropdown.Item href="/admin/">Admin</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
