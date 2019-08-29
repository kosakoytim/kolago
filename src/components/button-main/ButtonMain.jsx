import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./button-main.sass";

export default class ButtonMain extends Component {
  render() {
    return (
      <Button className="btn-success button-main">
        <FontAwesomeIcon icon={this.props.icon} /> {this.props.text}
      </Button>
    );
  }
}
