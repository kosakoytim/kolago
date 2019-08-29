import React, { Component } from "react";
import "./home.sass";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { set_chosen_franchise } from "../../store/actions/chosen-franchise-action";
import { Row, Col, Image, Button, Container } from "react-bootstrap";
import CategoryFranchise from "../../components/category-franchise/CategoryFranchise";
import ItemFranchise from "../../components/item-franchise/ItemFranchise";
import { Link } from "react-router-dom";
import { database } from "../../utilities/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Home extends Component {
  constructor(props) {
    super(props);
    this.setState({
      culinary_franchise: [],
      music_franchise: [],
      health_franchise: [],
      beauty_franchise: [],
      go_to_franchise: false
    });
  }

  componentWillMount() {
    this.setState({
      culinary_franchise: [],
      music_franchise: [],
      health_franchise: [],
      beauty_franchise: []
    });
  }

  componentDidMount() {
    this.getCulinaryCategory();
    this.getBeautyCategory();
    this.getHealthCategory();
    this.getMusicCategory();
  }

  render() {
    if (this.state.go_to_franchise) {
      return <Redirect to="/detail-franchise" />;
    } else {
      return (
        <div className="home-container">
          {this.renderFirstHeroSection()}
          {this.renderSecondHeroSection()}
          {this.renderCategoryFranchiseSection()}
        </div>
      );
    }
  }

  renderFirstHeroSection() {
    return (
      <div className="first-hero-section-container">
        <Container>
          <Row>
            <Col className="hero-action">
              <div className="hero-action-container">
                <div className="hero-text-main">
                  Kapan Lagi Punya Bisnis Sendiri
                </div>
                <div className="hero-text-desc">
                  Pilih bisnismu dari 1000++ franchise mulai dari kuliner sampai
                  kesehatan
                </div>
                <Link to="/daftar-franchise">
                  <Button
                    variant="success"
                    size="lg"
                    className="button-to-search"
                  >
                    <FontAwesomeIcon icon="store" />
                    Beli Franchise Sekarang
                  </Button>
                </Link>
              </div>
            </Col>
            <Col className="hero-image">
              <Image
                className="franchisee-illu"
                src={require("../../assets/images/illustration/franchisee-illustration.png")}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderSecondHeroSection() {
    return (
      <div className="second-hero-section-container">
        <Container>
          <Row className="align-items-center">
            <Col className="hero-image">
              <Image
                width="350"
                src={require("../../assets/images/illustration/franchiser-illustration.png")}
              />
            </Col>
            <Col className="hero-action">
              <div className="hero-action-container">
                <div className="hero-text-main color-white-transparent">
                  Perbesar franchise dan bisnis Anda
                </div>
                <div className="hero-text-button color-white-transparent">
                  Kolaborasi dengan menjual Franchise
                </div>
                <Link to="/daftar-franchise">
                  <Button
                    variant="warning"
                    size="lg"
                    className="button-to-search"
                  >
                    <FontAwesomeIcon icon="bullhorn" />
                    Pasang Iklan Franchise
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderCategoryFranchiseSection() {
    return (
      <div className="category-franchise-section-container">
        <h1>Pilih Bisnis yang Anda Suka</h1>
        <Container>
          <Row>
            <Col className="column-franchise-left">
              <CategoryFranchise
                category="Kuliner"
                items={this.setCulinaryCategory()}
              />
            </Col>
            <Col className="column-franchise-right">
              <CategoryFranchise
                category="Musik"
                items={this.setMusicCategory()}
              />
            </Col>
          </Row>
          <Row>
            <Col className="column-franchise-left">
              <CategoryFranchise
                category="Kesehatan"
                items={this.setHealthCategory()}
              />
            </Col>
            <Col className="column-franchise-right">
              <CategoryFranchise
                category="Kecantikan"
                items={this.setBeautyCategory()}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  getCulinaryCategory() {
    database
      .collection("franchise")
      .where("category", "==", "kuliner")
      .get()
      .then(snapshots => {
        var temp = [];
        snapshots.forEach(snapshot => {
          var data = snapshot.data();
          data.id = snapshot.id;
          temp.push(data);
        });
        this.setState({
          culinary_franchise: temp
        });
      });
  }

  setCulinaryCategory() {
    var items = [];

    this.state.culinary_franchise.forEach(item => {
      if (items.length < 2) {
        items.push(
          <div onClick={this.goToFranchise(item)}>
            <ItemFranchise
              onClick={this.goToFranchise(item)}
              logo={item.logo}
              brand={item.brand}
              companyName={item.companyName}
              description={item.description}
              price={item.price}
              revenueEstimation={item.revenueEstimation}
            />
          </div>
        );
      }
    });

    return items;
  }

  getMusicCategory() {
    database
      .collection("franchise")
      .where("category", "==", "musik")
      .get()
      .then(snapshots => {
        var temp = [];
        snapshots.forEach(snapshot => {
          var data = snapshot.data();
          data.id = snapshot.id;
          temp.push(data);
        });
        this.setState({
          music_franchise: temp
        });
      });
  }

    setMusicCategory() {
        var items = []
        
        this.state.music_franchise.forEach( item => {
            if (items.length < 2) {
                items.push(
                    <div onClick={this.goToFranchise(item)}>
                        <ItemFranchise logo={item.logo} brand={item.brand} description={item.description} price={item.price} revenueEstimation={item.revenueEstimation}/>
                    </div>
                )
            }
        })

    this.state.music_franchise.forEach(item => {
      if (items.length < 2) {
        items.push(
          <div onClick={this.goToFranchise(item)}>
            <ItemFranchise
              onClick={this.goToFranchise(item)}
              logo={item.logo}
              brand={item.brand}
              companyName={item.companyName}
              description={item.description}
              price={item.price}
              revenueEstimation={item.revenueEstimation}
            />
          </div>
        );
      }
    });

    return items;
  }

  getHealthCategory() {
    database
      .collection("franchise")
      .where("category", "==", "kesehatan")
      .get()
      .then(snapshots => {
        var temp = [];
        snapshots.forEach(snapshot => {
          var data = snapshot.data();
          data.id = snapshot.id;
          temp.push(data);
        });
        this.setState({
          health_franchise: temp
        });
      });
  }

  setHealthCategory() {
    var items = [];

    this.state.health_franchise.forEach(item => {
      if (items.length < 2) {
        items.push(
          <div onClick={this.goToFranchise(item)}>
            <ItemFranchise
              onClick={this.goToFranchise(item)}
              logo={item.logo}
              brand={item.brand}
              companyName={item.companyName}
              description={item.description}
              price={item.price}
              revenueEstimation={item.revenueEstimation}
            />
          </div>
        );
      }
    });

    return items;
  }

  getBeautyCategory() {
    database
      .collection("franchise")
      .where("category", "==", "kecantikan")
      .get()
      .then(snapshots => {
        var temp = [];
        snapshots.forEach(snapshot => {
          var data = snapshot.data();
          data.id = snapshot.id;
          temp.push(data);
        });
        this.setState({
          beauty_franchise: temp
        });
      });
  }

  setBeautyCategory() {
    var items = [];

    this.state.beauty_franchise.forEach(item => {
      if (items.length < 2) {
        items.push(
          <div onClick={this.goToFranchise(item)}>
            <ItemFranchise
              logo={item.logo}
              brand={item.brand}
              companyName={item.companyName}
              description={item.description}
              price={item.price}
              revenueEstimation={item.revenueEstimation}
            />
          </div>
        );
      }
    });

    return items;
  }

  goToFranchise = params => e => {
    this.props.set_chosen_franchise(params);
    this.setState({
      go_to_franchise: true
    });
  };
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_chosen_franchise: data => {
      dispatch(set_chosen_franchise(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
