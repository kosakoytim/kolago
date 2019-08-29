import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./buy-success.sass";
import moment from "moment";

class BuySuccess extends Component {

  rupiahFormat(price) {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR"
    });
  }

  render() {
    return (
      <Row>
        <Col />
        <Col>
          <div className="success-wrapper">
            <h3>Pembelian Selesai</h3>
            <p>Selesaikan pembayaran sebesar</p>
            <h1>{this.rupiahFormat(this.props.franchise_chosen.state.price)}</h1>
            <p>Sebelum</p>
            <h2>{moment()
            .add(7, "days")
            .format("DD MMM YYYY, hh:mm")}</h2>
            <Link to="/items">
              <Button variant="primary">Kirim ke Email</Button>
            </Link>
            <p className="kontak">Kontak</p>
            <Row>
              <Col className="kontak-column">
                <p>
                  <b>kolago</b>
                </p>
                <p>customer@kolago.com</p>
              </Col>
              <Col className="kontak-column">
                <p>
                  <b>{this.props.franchise_chosen.state.brand}</b>
                </p>
                <p>customer@kolago.com</p>
              </Col>
            </Row>
            <Link to="/">
              <p className="home">Kembali ke home</p>
            </Link>
          </div>
        </Col>
        <Col />
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    franchise_chosen: state.chosen_franchise
  };
};

export default connect(mapStateToProps)(BuySuccess);
