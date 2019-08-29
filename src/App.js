import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/home/Home";
import DetailFranchise from "./pages/detail-franchise/DetailFranchise";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import DaftarFranchise from "./pages/daftar-franchise/DaftarFranchise";
import BuySuccess from "./pages/buy-success/BuySuccess";
import BuyFranchise from "./pages/buy-franchise/BuyFranchise";
import NavbarMain from "./components/navbar/NavbarMain";

import "./assets/sass/global.sass";
import "./utilities/icon.js";
import "./app.sass";

class App extends Component {

  renderNavbar() {
    if (this.state.navbar_active) {
      return (
        <NavbarMain />
      )
    } else {
      return
    }
  }

  componentWillMount() {
    this.setState({
      navbar_active: true
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {this.renderNavbar()}
            <div className="wrapper-main-content">
              <Route exact path="/" component={Home} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route
                exact
                path="/detail-franchise"
                component={DetailFranchise}
              />
              <Route exact path="/buy-success" component={BuySuccess} />
              <Route exact path="/buy-franchise" component={BuyFranchise} />
              <Route
                exact
                path="/daftar-franchise"
                component={DaftarFranchise}
              />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
