import React, { Component } from "react";

class Like extends Component {
  render() {
    const { liked, onClick } = this.props;

    return (
      <i
        style={{ cursor: "pointer" }}
        onClick={onClick}
        className={this.setClasses(liked)}
        aria-hidden="true"
      />
    );
  }

  setClasses(liked) {
    let classes = "fa fa-heart";
    return liked ? classes : (classes += "-o");
  }
}

export default Like;
