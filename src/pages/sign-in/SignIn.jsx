import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import { authentication } from "../../utilities/firebase.js";
import {set_user} from "../../store/actions/user-action";
import { connect } from "react-redux";
import {database} from "../../utilities/firebase"

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirectHome: false
    };

    this.updateInput = this.updateInput.bind(this);
  }

  render() {
    return (
      <div className="signin-wrapper">
        {this.isRedirectHome()}
        <Container>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <div className="introText">
                <h1>Selamat Datang Kembali</h1>
                <p>Wirausahawan Indonesia</p>
              </div>
              <Form>
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
                <Button
                  className="btn-success button-main"
                  onClick={this.signIn.bind(this)}
                  block
                >
                  <FontAwesomeIcon icon="sign-in-alt" /> Masuk
                </Button>
              </Form>
              <div className="redirect-text">
                <p>
                  Sudah punya akun?{" "}
                  <Link to="/sign-up">
                    <span>Daftar</span>
                  </Link>
                </p>
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

  signIn() {
    authentication
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        this.getUser(data.user.uid)
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  getUser(uid) {
    database.collection("franchisee").doc(uid)
      .get()
      .then(snapshots => {
        var data = snapshots.data()
        data.uid = uid
        this.props.set_user(data)
        this.setState({ redirectHome: true });
      });
  }

  isRedirectHome() {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
    return {
        set_user: (data) => {
            dispatch(set_user(data));
        },
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
