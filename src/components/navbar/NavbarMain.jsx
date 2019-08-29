import React, { Component } from "react";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import "./navbar.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NavbarMain extends Component {
  constructor(props) {
    super(props);
    this.setState({
      name: "",
      isLogin: false,
      user_name: ""
    });
  }

  componentWillMount() {
    this.setState({
      name: "",
      isLogin: false,
      user_name: ""
    });
  }

  componentWillReceiveProps(props) {
    console.log("hm", this.props);
    this.setState({
      user_name: props.user.fullName
    });

    console.log("getstattt", this.state);
  }

  render() {
    return (
      <Navbar bg="white" fixed="top" className="main-navbar">
        <Navbar.Brand href="/" className="main-icon">
          <img
            alt=""
            src={require("../../assets/images/logo/kolago-color.png")}
            width="160"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ marginRight: "8rem" }}>
          <Nav className="navbar-nav mr-auto mt-2 mt-lg-0">
            <Nav.Link href="/tentang">Tentang</Nav.Link>
            <Nav.Link href="/daftar-franchise">Daftar Franchise</Nav.Link>
          </Nav>
          <Nav className="my-2 my-lg-0">
            {this.renderButtonLogin()}
            {this.renderAccountInfo()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  renderButtonLogin() {
    if (this.props.user.state.uid === null) {
      return (
        <Link to="/sign-in">
          <Button className="btn-success button-main">
            <FontAwesomeIcon icon="user" /> Masuk / Daftar
          </Button>
        </Link>
      );
    } else {
      return;
    }
  }

  renderAccountInfo() {
    if (this.props.user.state.uid !== null) {
      return (
        <div className="account-info">
          <Image
            src={require("../../assets/images/default-avatar.png")}
            width="40"
            roundedCircle
          />
          <span>{this.props.user.state.fullName}</span>
        </div>
      );
    } else {
      return;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(NavbarMain);
