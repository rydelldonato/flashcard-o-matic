import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import { deleteDeck } from "../utils/api";

export default function Home() {
  const history = useHistory();
  const [deckList, setDeckList] = useState([]);

  function HandleViewButton(deckId) {
    const viewDeckURL = `/decks/${deckId}`;
    history.push(viewDeckURL);
  }
  function HandleStudyButton(deckId) {
    const studyDeckURL = `/decks/${deckId}/study`;
    history.push(studyDeckURL);
  }
  function HandleDeleteButton(deckId) {
    const message = `Delete this deck?\n\nYou will not be able to recover it.`;
    if (window.confirm(message)) {
      deleteDeck(deckId);
      window.location.reload();
    }
  }

  function HandleCreateButton() {
    const createDeckURL = "/decks/new";
    history.push(createDeckURL);
  }

  useEffect(() => {
    async function getDeckListData() {
      try{
        const data = await listDecks();
        setDeckList(data);
      }
      catch(error){
        console.log(error);
      }
    }
    getDeckListData();
  }, []);

  return (
    <>
      {/*on click take user to create deck screen*/}
      <div id="create-deck-button" className="mb-2">
        <button
          onClick={() => HandleCreateButton()}
          className="btn btn-secondary"
        >
          +Create Deck
        </button>
      </div>
      <ul className="list-group">
        {deckList.map((deck) => (
          <li key={deck.id} className="list-group-item">
            <div
              id="deck-header"
              className="d-flex flex-row justify-content-between"
            >
              <h5 className="p-2">{deck.name}</h5>
              <p className="p-2">{deck.cards.length} cards</p>
            </div>
            <div id="deck-description" className="d-flex flex-row">
              <p className="p-2">{deck.description}</p>
            </div>
            <button
              onClick={() => HandleViewButton(deck.id)}
              className="btn btn-secondary"
            >
              👁️View
            </button>
            <button
              onClick={() => HandleStudyButton(deck.id)}
              className="btn btn-primary m-2"
            >
              📖Study
            </button>
            <button
              onClick={() => HandleDeleteButton(deck.id)}
              style={{ float: "right" }}
              className="btn btn-danger"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
