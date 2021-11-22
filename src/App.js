import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./firebase";
import 'animate.css';
import './App.css';
import * as Screen from "./screens";
import headerImage from "./header.png";

// const baseUrl = "triviatown-123.s3bucket.example.org";
const baseUrl = "localhost:3000";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img height="300" alt="" src={headerImage} />
        </header>
        <Switch>
          <Route path="/setup/:companyId">
            <Screen.Manage baseUrl={baseUrl} />
          </Route>
          <Route path="/setup">
            <Screen.Setup baseUrl={baseUrl} />
          </Route>
          <Route path="/invite/:companyId">
            <Screen.Invite />
          </Route>
          <Route path="/play/:companyId">
            <Screen.Play />
          </Route>
          <Route path="/">
            <Screen.Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
