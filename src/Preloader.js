import React, { Component } from "react";
import { Loader } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
export default class Preloader extends Component {
  render() {
    return (
      <div>
        <div className="loading">
          <Loader />
        </div>
      </div>
    );
  }
}
