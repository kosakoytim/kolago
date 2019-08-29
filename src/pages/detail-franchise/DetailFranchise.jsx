import React, { Component } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import SectionTitle from '../../components/section-title/SectionTitle'
import "./detail-franchise.sass";
import { connect } from "react-redux";

class DetailFranchise extends Component {
  constructor() {
    super();
    this.state = {
      showPhoto: false,
      urlPhoto: ''
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  rupiahFormat(price) {
    return price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }

  showPicture(photo){
    this.setState({ showPhoto: true, urlPhoto: photo});
  }

  hidePicture(){
    this.setState({ showPhoto: false, urlPhoto: ''});
  }

  render() {
    return (
      <div className="detail-franchise">
        <Modal open={this.state.showPhoto} onClose={this.hidePicture.bind(this)} center>
          <img src={this.state.urlPhoto} alt=""/>            
        </Modal>
        <Container>
          <Row>
            <Col md={{ span: 3, offset: 1 }}>
              <div className="detail-left">
                <img src={this.props.franchise_chosen.state.logo} alt="" />

                <h2>Modal Minimal</h2>
                <p>{this.rupiahFormat(this.props.franchise_chosen.state.price)}</p>

                <h2>Total Outlet</h2>
                <p>{this.props.franchise_chosen.state.franchiseCount}</p>

                <h2>Alamat</h2>
                <p>{this.props.franchise_chosen.state.companyAddress}</p>

                <h2>Foto</h2>
                {this.renderPhotos()}
              </div>
            </Col>
            <Col md={{ span: 7 }}>
              <div className="detail-right">
                <h2>{this.props.franchise_chosen.state.brand}</h2>
                <p>{this.props.franchise_chosen.description}</p>

                <SectionTitle className="info-section" section="Riwayat" />
                <p>{this.props.franchise_chosen.state.history}</p>

                <SectionTitle className="info-section" section="Standar Operasional" />
                <p>Operasional dijalankan dengan efektif dan mengutakan efektivitas. Seluruh proses operasional akan melalui pengecekan kualitas untuk memastikan setiap produk yang dijual ke pengguna merupakan produk terbaik dan juga demi menjaga nama baik seluruh merek. Detail operasional dijelaskan pada dokumen berikut</p>

                <SectionTitle className="info-section" section="Suplai Alat dan Bahan Baku" />
                <p>Kami sudah memiliki rekanan yang suplier untuk memastikan seluruh bahana baku yang dibutuhkan untuk memastikan bahwa produk kami selalu tersedia untuk pelanggan kami. Kami sudah menandatangai kontrak kerjasama dengan suplier kami sehingga setiap bahan akan langsung dikirimkan kepada Anda secara teratur dan dipastikan bahwa bahan tersebut merupakan bahan dengan kualitas terbaik.</p>

                <SectionTitle className="info-section" section="Proses Koordinasi" />
                <p>Kami mengutamakan transparasi dalam menjalin kerjasama dengan para franchisee kami. Kami selalu mengadakan evaluasi rutin bulanan dengan seluruh partner bisnis kami dari seluruh Indonesia baik secara online maupun offline. Kami juga membuka seluruh data dan tips yang dibutuhkan oleh rekan kami untuk terus mengembangkan bisnisnya. Kontak kami untuk informasi dan juga pengajuan dan permintaan saran selalu terbuka pada jam kerja untuk Anda hubungi</p>

                <SectionTitle className="info-section" section="Pemasaran" />
                <p>Kami akan mendukung setiap partner franchise kami dengan peralatan pemasaran terbaik. Kami akan secara rutin mendistribusikan desain dan nilai-nilai pemasaran baru serta memberikan arahan dalam proses pemasaran. Dengan begitu pemasaran pada seluruh franchise akan konsisten sehingga pelanggan dapat lebih mudah memahami nilai yang dibawa oleh merk</p>

                <SectionTitle className="info-section" section="Tips Memulai" />
                <p>Kami sudah menyediakan serangkaian pertanyaan yang sering ditanyakan dan tips untuk para partner kami bisa segera memulai proses penjualan. Kami juga selalu membuka forum bagi para partner dapat berdiskusi lebih lanjut mengenai masalah atau kendala yang dialami selalu proses berjalannya operasional. </p>

                <div className="detail-button">
                  {this.props.user.success && <Link to="/buy-franchise">
                    <Button className="btn-success" variant="secondary">Beli Franchise</Button>
                  </Link>}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }

  renderPhotos() {
    var photos = []
    this.props.franchise_chosen.state.photos.forEach(photo => {
      photos.push(
        <img className="img-click" src={photo} alt="" onClick={this.showPicture.bind(this, photo)}/>
      )
    })

    return (
      <div className="detail-foto">
        {photos}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    franchise_chosen: state.chosen_franchise
  };
};


export default connect(
  mapStateToProps
)(DetailFranchise);
