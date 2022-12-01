import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

function Layout() {
  return (
    <Router>
      <>
        <Header />
        <div className="container">
          <Switch>
            {/* TODO: Implement the screen starting here */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/decks/:deckId/study">
              <Study deckId={id} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default Layout;
