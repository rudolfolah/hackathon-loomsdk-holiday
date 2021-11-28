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
            <Route path="/about">
              <Screen.About />
            </Route>
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
            <li><Link to={"/"}>Trivia Town</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            <li><a href={"https://forms.gle/TSx24u4RNyBuVe2A9"} target={"_blank"} rel={"noreferrer"}>Contact Us</a></li>
            <li><a href={"https://forms.gle/TSx24u4RNyBuVe2A9"} target={"_blank"} rel={"noreferrer"}>Customer Support</a></li>
          </ul>
        </footer>
      </div>
    </Router>
  );
}

export default App;
