import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, Link
} from "react-router-dom";

import "./firebase";
import 'animate.css';
import './App.css';
import * as Screen from "./screens";
import headerImage from "./header.png";

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
              <Screen.Manage baseUrl={process.env.REACT_APP_BASE_URL} />
            </Route>
            <Route path="/">
              <Screen.Setup />
            </Route>
          </Switch>
        </section>
        <footer className="App--footer">
          <ul className="App--footer-nav">
            <li><Link to={"/"}>About</Link></li>
            <li><Link to={"/"}>Contact Us</Link></li>
            <li><Link to={"/"}>Customer Support</Link></li>
          </ul>
        </footer>
      </div>
    </Router>
  );
}

export default App;
