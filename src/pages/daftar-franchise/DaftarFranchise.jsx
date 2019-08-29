import React, { Component } from 'react';
import {Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';
import './daftar-franchise.sass'
import ItemFranchise from '../../components/item-franchise/ItemFranchise';
import SectionTitle from '../../components/section-title/SectionTitle'
import {database} from "../../utilities/firebase"
import { connect } from "react-redux";
import {set_chosen_franchise} from "../../store/actions/chosen-franchise-action"
import {Redirect} from "react-router-dom"

class DaftarFranchise extends Component {
    constructor(props) {
        super(props)
        this.setState({
            items_franchise : [],
            filter_outlet : null,
            filter_min_modal : null,
            filter_category : null,
            dropdown_outlet : ['< 50 Outlet', '51 - 100 Outlet', '> 100 Outlet'],
            dropdown_modal_min : ['< 25 Juta', '25 - 100 Juta', '> 100 Juta']
        })
    }

    componentWillMount() {
        this.setState({
            items_franchise : [],
            filter_outlet : null,
            filter_min_modal : null,
            filter_category : null,
            dropdown_outlet : ['< 50 Outlet', '51 - 100 Outlet', '> 100 Outlet'],
            dropdown_modal_min : ['< 25 Juta', '25 - 100 Juta', '> 100 Juta']
        })  
    }

    componentDidMount() {
        this.getSearchItem()
    }

    render() {
        if (this.state.go_to_franchise) {
            return (
                <Redirect to="/detail-franchise"/>
            )
        } else {
            return (
                <div className="search-franchise-container">
                    {/* <Row>
                        <Col md={2}/>
                        <Col>
                            <div className="search-bar">
                                <Form.Control type="text" placeholder="Search By Name" />
                            </div>
                        </Col>
                        <Col md={2}/>
                    </Row> */}
                    <Row style={{marginTop:"2rem"}}>
                        <Col md={2} className=""/>
                        <Col md={1} className="column-filter">
                            <div className="filter-container">
                                <SectionTitle section="filter"/>
                                <DropdownButton style={{marginTop:"2rem"}} className="filter-dropdown" variant="outline-secondary" id="dropdown-basic-button" size="sm" title={this.renderTextFilterOutlet()}>
                                    <Dropdown.Item onClick={this.goToFranchiseFromOutlet(1)}>{this.state.dropdown_outlet[0]}</Dropdown.Item>
                                    <Dropdown.Item onClick={this.goToFranchiseFromOutlet(2)}>{this.state.dropdown_outlet[1]}</Dropdown.Item>
                                    <Dropdown.Item onClick={this.goToFranchiseFromOutlet(3)}>{this.state.dropdown_outlet[2]}</Dropdown.Item>
                                </DropdownButton>
                                <DropdownButton className="filter-dropdown" variant="outline-secondary" id="dropdown-basic-button" size="sm" title={this.renderTextFilterMinModal()}>
                                    <Dropdown.Item onClick={this.goToFranchiseFromMinModal(1)}>{this.state.dropdown_modal_min[0]}</Dropdown.Item>
                                    <Dropdown.Item onClick={this.goToFranchiseFromMinModal(2)}>{this.state.dropdown_modal_min[1]}</Dropdown.Item>
                                    <Dropdown.Item onClick={this.goToFranchiseFromMinModal(3)}>{this.state.dropdown_modal_min[2]}</Dropdown.Item>
                                </DropdownButton>
                                {this.renderAllCategory()}
                            </div>
                        </Col>
                        <Col className="column-search">
                            <div className="search-container">
                                <SectionTitle section="franchise"/>
                                <div className="items-search-franchise-container">
                                    {this.renderSearchItemFranchise()}
                                </div>
                            </div>
                        </Col>
                        <Col md={1} className=""/>
                    </Row>
                </div>
            )
        }
    }

    getSearchItem() {
        var db = database.collection("franchise")
        db.get()
            .then(snapshots => {
                var temp = []
                snapshots.forEach(snapshot => {
                    var data = snapshot.data();
                    data.id = snapshot.id;
                    temp.push(data);
                })
                this.setState({
                    items_franchise : temp
                })

            });
    }

    renderTextFilterCategory() {
        var text = ""
        if (this.state.filter_category === null) { text = "Semua Kategori" }
        if (this.state.filter_category === "kesehatan") { text = "Kesehatan" }
        if (this.state.filter_category === "kuliner") { text = "Kuliner" }
        if (this.state.filter_category === "musik") { text = "Musik" }
        if (this.state.filter_category === "kecantikan") { text = "Kecantikan" }
        if (this.state.filter_category === "energi") { text = "Energi" }
        return text
    }

    renderTextFilterMinModal() {
        var text = ""
        if (this.state.filter_min_modal === null) { text = "Minimal Modal" }
        if (this.state.filter_min_modal === 1) { text = "< 25 Juta" }
        if (this.state.filter_min_modal === 2) { text = "25 - 100 Juta" }
        if (this.state.filter_min_modal === 3) { text = "> 100 Juta" }
        return text
    }

    renderTextFilterOutlet() {
        var text = ""
        if (this.state.filter_outlet === null) { text = "Jumlah Outlet" }
        if (this.state.filter_outlet === 1) { text = "< 50 Outlet" }
        if (this.state.filter_outlet === 2) { text = "51 - 100 Outlet" }
        if (this.state.filter_outlet === 3) { text = "> 100 Outlet" }
        return text
    }

    renderAllCategory() {
        var raw_categories = [
            {
                display: "Kuliner",
                value: "kuliner"
            },
            {
                display: "Musik",
                value: "musik"
            },
            {
                display: "Kesehatan",
                value: "kesehatan"
            },
            {
                display: "Kecantikan",
                value: "kecantikan"
            },
            {
                display: "Energi",
                value: "energi"
            }
        ]

        var categories = []
        raw_categories.forEach(item => {
            categories.push(
                <Dropdown.Item onClick={this.goToFranchiseFromCategory(item)}>{item.display}</Dropdown.Item>
            )
        })

        return (
            <DropdownButton className="filter-dropdown" variant="outline-secondary" id="dropdown-basic-button" size="sm" title={this.renderTextFilterCategory()}>
                {categories}
            </DropdownButton>
        )
    }

    goToFranchiseFromOutlet = params => e => {
        this.setState({
            filter_outlet: params
        })
        this.getSearchItemFiltered(this.state.filter_category, this.state.filter_min_modal, params)
    }

    goToFranchiseFromMinModal = params => e => {
        this.setState({
            filter_min_modal: params
        })
        this.getSearchItemFiltered(this.state.filter_category, params, this.state.filter_outlet)
    }

    goToFranchiseFromCategory = params => e => {
        this.setState({
            items_franchise: [],
            filter_category: params.value
        })
        this.getSearchItemFiltered(params.value, this.state.filter_min_modal, this.state.filter_outlet)
    }

    getSearchItemFiltered(category, modal, outlet) {
        var db = database.collection("franchise")
        db.get()
            .then(snapshots => {
                var temp = []
                snapshots.forEach(snapshot => {
                    var x = 0
                    // Check Category
                    if (category != null && snapshot.data().category !== category) { x++ }
                    // Check Modal
                    if (modal != null) {
                        if (modal === 1 && snapshot.data().price > 25000000) { x++ }
                        if (modal === 2 && (snapshot.data().price < 25000000 || snapshot.data().price > 100000000)) { x++ }
                        if (modal === 3 && snapshot.data().price < 100000000) { x++ }
                    }
                    // Check Outlet
                    if (outlet != null) {
                        if (outlet === 1 && snapshot.data().franchiseCount > 50) { x++ }
                        if (outlet === 2 && (snapshot.data().franchiseCount < 50 || snapshot.data().franchiseCount > 100)) { x++ }
                        if (outlet === 3 && snapshot.data().franchiseCount < 100) { x++ }
                    }

                    if (x === 0) {
                        var data = snapshot.data();
                        data.id = snapshot.id;
                        temp.push(data);
                    }
                })
                this.setState({
                    items_franchise : temp
                })

            });
    }

    renderSearchItemFranchise() {
        var items = []
        this.state.items_franchise.forEach( item => {
            items.push(
                <Col>
                    <div onClick={this.goToFranchise(item)}>
                        <ItemFranchise logo={item.logo} brand={item.brand} description={item.description} price={item.price} revenueEstimation={item.revenueEstimation}/>
                    </div>
                </Col>
            )
        })

        return (
            <Row>
                {items}
            </Row>
        )
    }

    goToFranchise = params => e => {
        this.props.set_chosen_franchise(params)
        this.setState({
            go_to_franchise: true
        })
    }
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  const mapDispatchToProps = dispatch => {
      return {
          set_chosen_franchise: (data) => {
              dispatch(set_chosen_franchise(data));
          },
      };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DaftarFranchise);
  