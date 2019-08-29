import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./item-franchise.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ItemFranchise extends Component {
  render() {
    return (
      <div className="item-franchise-container">
        <Row>
          <Col md="3">
            <Image src={this.props.logo} className="franchise-image" />
          </Col>
          <Col md="9">
            <div className="franchise-name">{this.props.brand}</div>
            <div className="franchise-company-name">
              {this.props.companyName}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="franchise-description">
              {this.descriptionFormat(this.props.description)}
            </div>
          </Col>
        </Row>
        <Row className="capital-info">
          <Col>
            <div className="label-info">
              <FontAwesomeIcon icon="dolly-flatbed" />
              Pendapatan
            </div>
            <div className="info-content">{this.props.revenueEstimation}</div>
          </Col>
          <Col>
            <div className="label-info">
              <FontAwesomeIcon icon="money-bill-wave-alt" />
              Modal
            </div>
            <div className="info-content">
              {this.rupiahFormat(this.props.price)}
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  descriptionFormat(description) {
    var length = 60;
    var trimmedString = description.substring(0, length);
    return trimmedString + "...";
  }

  rupiahFormat(price) {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR"
    });
  }
}

export default ItemFranchise;
