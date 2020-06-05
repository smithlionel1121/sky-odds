import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";

export default class Footer extends Component {
  render() {
    return (
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="d-flex justify-content-center"
      >
        <h6>Thanks for coming!</h6>
      </Navbar>
    );
  }
}
