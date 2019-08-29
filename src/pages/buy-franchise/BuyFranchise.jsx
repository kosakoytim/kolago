import React, { Component } from "react";
import { ButtonGroup, Alert, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionTitle from "../../components/section-title/SectionTitle";
import { database } from "../../utilities/firebase.js";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./buy-franchise.sass";
import moment from "moment";

class BuyFranchise extends Component {
  constructor() {
    super();
    this.state = {
      nama: "",
      alamat: "",
      ktp: "",
      email: "",
      handphone: "",
      tempat: "",
      karyawan: "",
      supplier: "",
      infolain: "",
      formDiri: true,
      styleDiri: { backgroundColor: "#55b66a", border: "1px solid #55b66a" },
      formInfo: false,
      styleInfo: {},
      formPembayaran: false,
      stylePembayaran: {},
      tempatCheck: "",
      karyawanCheck: "",
      supplierCheck: "",
      redirectSuccess: false,
      redirectSignUp: false,
      formAlert: false
    };

    this.onRadio = this.onRadio.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount(){
    this.setState({
      nama: this.props.user.state.fullName,
      ktp: this.props.user.state.identityNumber,
      email: this.props.user.state.email,
      handphone: this.props.user.state.phoneNumber,
    })
  }

  onNext(value) {
    window.scrollTo(0, 0);
    if (value === "diri") {
      if (
        this.state.nama !== "" &&
        this.state.alamat !== "" &&
        this.state.ktp !== "" &&
        this.state.email !== "" &&
        this.state.handphone !== ""
      ) {
        this.setState({
          formDiri: false,
          formInfo: true,
          formPembayaran: false,
          styleInfo: { backgroundColor: "#55b66a", border: "1px solid #55b66a" }
        });
      } else {
        this.setState({ formAlert: true });
        setTimeout(() => {
          this.setState({ formAlert: false });
        }, 3000);
      }
    } else if (value === "info") {
      if (
        this.state.tempatCheck !== "" &&
        this.state.karyawanCheck !== "" &&
        this.state.supplierCheck !== ""
      ) {
        this.setState({
          formDiri: false,
          formInfo: false,
          formPembayaran: true,
          stylePembayaran: {
            backgroundColor: "#55b66a",
            border: "1px solid #55b66a"
          }
        });
      } else {
        this.setState({ formAlert: true });
        setTimeout(() => {
          this.setState({ formAlert: false });
        }, 3000);
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onRadio(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit() {
    if (this.props.user.success) {
      let params = {
        franchiseeId: this.props.user.state.uid,
        franchiseId: this.props.franchise_chosen.state.id,
        name: this.state.nama,
        address: this.state.alamat,
        identityNo: this.state.ktp,
        email: this.state.email,
        handphone: this.state.handphone,
        place: this.state.tempat,
        employee: this.state.karyawan,
        supplier: this.state.supplier,
        experince: this.state.infolain,
        placeCheck: this.state.tempatCheck,
        employeeCheck: this.state.karyawanCheck,
        supplierCheck: this.state.supplierCheck,
        timestamp: new Date().getTime()
      };
      database
        .collection("transaction")
        .add(params)
        .then(data => {
          this.setState({ redirectSuccess: true });
        });
    } else {
      this.setState({ redirectSignUp: true });
    }
  }

  isRedirectSuccess() {
    if (this.state.redirectSuccess) {
      return <Redirect to="/buy-success" />;
    }
  }

  isRedirectSignUp() {
    if (this.state.redirectSignUp) {
      return <Redirect to="/sign-up" />;
    }
  }

  rupiahFormat(price) {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR"
    });
  }

  render() {
    let progressGroup = (
      <div className="buy-franchise">
        <ButtonGroup aria-label="Basic example" className="btn-group">
          <Button variant="secondary" style={this.state.styleDiri}>
            <FontAwesomeIcon icon="user" /> <span>Data Diri</span>
          </Button>
          <Button variant="secondary" style={this.state.styleInfo}>
            <FontAwesomeIcon icon="info-circle" /> <span>Info Franchise</span>
          </Button>
          <Button variant="secondary" style={this.state.stylePembayaran}>
            <FontAwesomeIcon icon="money-bill-wave-alt" />{" "}
            <span>Pembayaran</span>
          </Button>
        </ButtonGroup>
      </div>
    );

    let dataDiri = (
      <Form>
        <Form.Group>
          <p>Nama</p>
          <Form.Control
            type="nama"
            id="nama"
            value={this.props.user.state.fullName}
            onChange={this.onChange.bind(this)}
          />
        </Form.Group>
        <Form.Group>
          <p>Alamat</p>
          <Form.Control
            type="alamat"
            id="alamat"
            onChange={this.onChange.bind(this)}
          />
        </Form.Group>
        <Form.Group>
          <p>No. KTP</p>
          <Form.Control
            type="number"
            id="ktp"
            value={this.props.user.state.identityNumber}
            onChange={this.onChange.bind(this)}
          />
        </Form.Group>
        <Form.Group>
          <p>Email</p>
          <Form.Control
            type="email"
            id="email"
            value={this.props.user.state.email}
            onChange={this.onChange.bind(this)}
          />
        </Form.Group>
        <Form.Group>
          <p>No. Handphone</p>
          <Form.Control
            type="number"
            id="handphone"
            value={this.props.user.state.phoneNumber}
            onChange={this.onChange.bind(this)}
          />
        </Form.Group>
        <Button
          className="form-button"
          variant="secondary"
          onClick={this.onNext.bind(this, "diri")}
        >
          Selanjutnya
        </Button>
      </Form>
    );

    let infoFranchise = (
      <div className="info-franchise">
        <SectionTitle section="yang akan anda dapatkan" />
        <ul>
          <li>
            Seluruh informasi standar operasional bisnis franchise, seperti cara
            pembuatan produk, cara pemasaran, pengelolaan keuangan, dan
            pembagian pekerjaan.
          </li>
          <li>
            Dukungan terhadap proses pemasaran selama berlangsungnya kerjasama,
            berupa pemberian desain publikasi (logo, flyer, spanduk, gambar
            media sosial).
          </li>
          <li>
            Standar perekrutan karyawan (juru masak, manager, resepsionis, dan
            pelayan)
          </li>
          <li>
            Dukungan penyediaan bahan baku dan akan dikirimkan secara rutin
            sesuai kebutuhan tiap-tiap partner.
          </li>
          <li>
            Disediakan aplikasi untuk mengelola keuangan (POS) dan aplikasi
            absensi untuk setiap karyawan.
          </li>
          <li>
            Bantuan ketika terjadi masalah atau musibah dalam pelaksanaan
            bisnis.
          </li>
        </ul>
        <div />
        <SectionTitle section="yang anda miliki" />
        <Form>
          <Form.Group>
            <FontAwesomeIcon icon="store" /> <span>Tempat</span>
            <form className="check-form">
              <input
                type="radio"
                name="tempatCheck"
                value="Y"
                onChange={this.onRadio}
              />{" "}
              <span>Sudah Punya</span>
              <input
                type="radio"
                name="tempatCheck"
                value="N"
                onChange={this.onRadio}
              />{" "}
              <span>Belum Punya</span>
            </form>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Keterangan.."
              id="tempat"
              onChange={this.onChange.bind(this)}
            />
          </Form.Group>
          <Form.Group>
            <FontAwesomeIcon icon="user-friends" /> <span>Karyawan</span>
            <form className="check-form">
              <input
                type="radio"
                name="karyawanCheck"
                value="Y"
                onChange={this.onRadio}
              />{" "}
              <span>Sudah Punya</span>
              <input
                type="radio"
                name="karyawanCheck"
                value="N"
                onChange={this.onRadio}
              />{" "}
              <span>Belum Punya</span>
            </form>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Keterangan.."
              id="karyawan"
              onChange={this.onChange.bind(this)}
            />
          </Form.Group>
          <Form.Group>
            <FontAwesomeIcon icon="box" /> <span>Supplier</span>
            <form className="check-form">
              <input
                type="radio"
                name="supplierCheck"
                value="Y"
                onChange={this.onRadio}
              />{" "}
              <span>Sudah Punya</span>
              <input
                type="radio"
                name="supplierCheck"
                value="N"
                onChange={this.onRadio}
              />{" "}
              <span>Belum Punya</span>
            </form>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Keterangan.."
              id="supplier"
              onChange={this.onChange.bind(this)}
            />
          </Form.Group>
          <Form.Group>
            <FontAwesomeIcon icon="info-circle" />{" "}
            <span>Ceritakan pengalaman anda mengelola produk</span>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Keterangan.."
              id="infolain"
              onChange={this.onChange.bind(this)}
            />
          </Form.Group>
          <Button
            className="btn-success form-button"
            variant="secondary"
            onClick={this.onNext.bind(this, "info")}
          >
            Selanjutnya
          </Button>
        </Form>
      </div>
    );

    let Pembayaran = (
      <div className="pembayaran-franchise">
        <SectionTitle section="biaya pembelian" />
        <h2>{this.rupiahFormat(this.props.franchise_chosen.state.price)}</h2>
        <SectionTitle section="dengan biaya ini kamu akan dapat" />
        <ul>
          <li>
            Seluruh informasi standar operasional bisnis franchise, seperti cara
            pembuatan produk, cara pemasaran, pengelolaan keuangan, dan
            pembagian pekerjaan.
          </li>
          <li>
            Dukungan terhadap proses pemasaran selama berlangsungnya kerjasama,
            berupa pemberian desain publikasi (logo, flyer, spanduk, gambar
            media sosial).
          </li>
          <li>
            Standar perekrutan karyawan (juru masak, manager, resepsionis, dan
            pelayan)
          </li>
          <li>
            Dukungan penyediaan bahan baku dan akan dikirimkan secara rutin
            sesuai kebutuhan tiap-tiap partner.
          </li>
          <li>
            Disediakan aplikasi untuk mengelola keuangan (POS) dan aplikasi
            absensi untuk setiap karyawan.
          </li>
          <li>
            Bantuan ketika terjadi masalah atau musibah dalam pelaksanaan
            bisnis.
          </li>
        </ul>
        <SectionTitle section="batas waktu" />
        <h3>
          {moment()
            .add(7, "days")
            .format("DD MMM YYYY, hh:mm")}{" "}
          (7 hari)
        </h3>
        <SectionTitle section="rekening tujuan" />
        <div className="info-rekening">
          <p>123.456.7890</p>
          <p>a.n. Gohan Paringotan</p>
        </div>
        <Button
          className="btn-success form-button"
          variant="secondary"
          onClick={this.onSubmit.bind(this)}
        >
          Selesai
        </Button>
      </div>
    );

    let AlertData = (
      <div className="alert-wrapper">
        <Alert variant="danger">Silahkan isi semua data</Alert>
      </div>
    );

    return (
      <Row>
        <Col />
        <Col xs={6}>
          {this.isRedirectSuccess()}
          {this.isRedirectSignUp()}
          {progressGroup}
          {this.state.formAlert && AlertData}
          {this.state.formDiri && dataDiri}
          {this.state.formInfo && infoFranchise}
          {this.state.formPembayaran && Pembayaran}
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

export default connect(mapStateToProps)(BuyFranchise);
