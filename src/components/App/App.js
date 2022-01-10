import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "components/Routes/Routes";
import  { SWRConfig } from "swr";

import Axios from "axios";
class App extends Component {
  render() {
    const fetcher = (url) => Axios.get(url);

    return (
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Router>{Routes}</Router>
      </SWRConfig>
    );
  }
}

export default App;
