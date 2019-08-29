import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import { database, authentication } from "../../utilities/firebase.js";
import "./sign-up.sass";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      identityNumber: "",
      email: "",
      password: "",
      phoneNumber: "",
      redirectSignIn: false
    };

    this.updateInput = this.updateInput.bind(this);
  }

  render() {
    return (
      <div className="signup-wrapper">
        {this.isRedirectSignIn()}
        <Container>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <div className="introText">
                <h1>Selamat Datang</h1>
                <p>Calon Pengusaha Indonesia</p>
              </div>

              <Form>
                <Form.Group controlId="email">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    onChange={this.updateInput}
                  />
                </Form.Group>
                <Form.Group controlId="ktp-number">
                  <Form.Label>Nomor KTP</Form.Label>
                  <Form.Control
                    type="number"
                    name="identityNumber"
                    onChange={this.updateInput}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={this.updateInput}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={this.updateInput}
                  />
                </Form.Group>
                <Form.Group controlId="phone-number">
                  <Form.Label>Nomor Telepon</Form.Label>
                  <Form.Control
                    type="number"
                    name="phoneNumber"
                    onChange={this.updateInput}
                  />
                </Form.Group>
                <Button
                  className="btn-success button-main"
                  onClick={this.signUp.bind(this)}
                  block
                >
                  <FontAwesomeIcon icon="sign-in-alt" /> Daftar
                </Button>
              </Form>

              <div className="redirect-text">
                <Link to="/">
                  <p>Kembali ke Beranda</p>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signUp() {
    authentication
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        this.saveUserInfo();
        this.setState({
          redirectSignIn: true
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  saveUserInfo() {
    database
      .collection("franchisee")
      .doc(authentication.currentUser.uid)
      .set({
        fullName: this.state.fullName,
        email: this.state.email,
        identityNumber: this.state.identityNumber,
        phoneNumber: this.state.phoneNumber,
        timestamp: new Date().getTime()
      })
      .then(data => {
        console.log("Berhasil mendaftarkan akun Anda");
      });
  }

  isRedirectSignIn() {
    if (this.state.redirectSignIn) {
      return <Redirect to="/sign-in" />;
    }
  }
}
