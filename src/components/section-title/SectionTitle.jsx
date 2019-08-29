import React, { Component } from "react";
import './section-title.sass'

class SectionTitle extends Component {
  render() {
    return (
        <div className="section-title-container">{this.props.section}</div>
    )
  }

}

export default SectionTitle
