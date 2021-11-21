import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./firebase";
import 'animate.css';
import './App.css';
import Setup from "./screens/Setup";
import Home from "./screens/Home";
import Invite from "./screens/Invite";
import {Play} from "./screens/Play";
import headerImage from "./header.png";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
            <img height="300" alt="" src={headerImage} />
        </header>
        <Switch>
          <Route path="/setup">
            {/*<Setup baseUrl={"triviatown-123.s3bucket.example.org"} />*/}
            <Setup baseUrl={"localhost:3000"} />
          </Route>
          <Route path="/invite/:companyId">
            <Invite />
          </Route>
          <Route path="/play/:companyId">
            <Play />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
