import React, { Component } from "react";
import "./category-franchise.sass";
import SectionTitle from "../section-title/SectionTitle";

class CategoryFranchise extends Component {
  render() {
    return (
      <div className="card-franchise-container">
        <SectionTitle section={this.props.category} />
        {this.renderItemFranchise()}
      </div>
    );
  }

  renderItemFranchise() {
    var items = this.props.items;
    return <div className="items-franchise-container">{items}</div>;
  }
}

export default CategoryFranchise;
