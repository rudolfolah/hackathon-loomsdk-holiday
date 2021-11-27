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

const baseUrl = "trivia-town.s3-website-us-east-1.amazonaws.com";
// const baseUrl = "localhost:3000";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App--header">
          <img height="350" alt="" src={headerImage} />
        </header>
        <section className="App--content">
          <Switch>
            <Route path="/invite/:companyId">
              <Screen.Invite />
            </Route>
            <Route path="/play/:companyId">
              <Screen.Play />
            </Route>
            <Route path="/scoreboard/:companyId">
              <Screen.Scoreboard />
            </Route>
            <Route path="/setup/:companyId">
              <Screen.Manage baseUrl={baseUrl} />
            </Route>
            <Route path="/">
              <Screen.Setup baseUrl={baseUrl} />
            </Route>
          </Switch>
        </section>
        <footer className="App--footer">
          <ul className="App--footer-nav">
            <li><a href={"/about"}>About</a></li>
            <li><a href={"/about"}>Contact Us</a></li>
            <li><a href={"/about"}>Customer Support</a></li>
          </ul>
        </footer>
      </div>
    </Router>
  );
}

export default App;
