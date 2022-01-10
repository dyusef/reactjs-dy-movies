import React, { Component } from "react";
import { Button, IconButton, ButtonGroup, ButtonToolbar } from "rsuite";

export default class ButtonCommon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button appearance={this.props.type} onClick={this.props.onClick}>
        {this.props.label}
      </Button>
    );
  }
}
