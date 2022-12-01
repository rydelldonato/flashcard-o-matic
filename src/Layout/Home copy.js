import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";

export default function Home() {
  const [deckList, setDeckList] = useState([]);
  const history = useHistory();

  function HandleCreateButton() {
    const createDeckURL = "/decks/new";
    history.push(createDeckURL);
  }
  function HandleViewButton() {
    const viewDeckURL = "/decks/:deckId";
    history.push(viewDeckURL);
  }
  function HandleStudyButton() {
    const studyDeckURL = "/decks/:deckId/study";
    history.push(studyDeckURL);
  }
  function HandleDeleteButton(deckDescription) {
    const message = `Delete this deck?\n\nYou will not be able to recover it.`;
    if (window.confirm(message)) {
      setDeckList(
        deckList.filter((deck) => deck.description !== deckDescription)
      );
    }
  }

  useEffect(() => {
    async function getDeckListData() {
      const data = await listDecks();
      setDeckList(data);
    }
    getDeckListData();
  }, []);

  return (
    <>
      {/*on click take user to create deck screen*/}
      <div id="create-deck-button" className="mb-2">
        <button onClick={HandleCreateButton} className="btn btn-secondary">
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
            <button onClick={HandleViewButton} className="btn btn-secondary">
              👁️View
            </button>
            <button onClick={HandleStudyButton} className="btn btn-primary m-2">
              📖Study
            </button>
            <button
              onClick={() => HandleDeleteButton(deck.description)}
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
