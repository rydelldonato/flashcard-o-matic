import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import DeckScreen from "./DeckScreen";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import {
  Route,
  Switch,
} from "react-router-dom";
import React from "react";


function Layout() {

  return (
      <>
        <Header />
        <div className="container">
          <Switch>
            {/* TODO: Implement the screen starting here */}
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path={"/decks/new"}>
              <CreateDeck />
            </Route>
            <Route path={`/decks/:deckId/study`}>
              <Study />
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck/>
            </Route>
            <Route  path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route path={`/decks/:deckId/cards/:cardId/edit`}>
              <EditCard/>
            </Route>
            <Route exact path={"/decks/:deckId"}>
              <DeckScreen />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </>
  );
}

export default Layout;
