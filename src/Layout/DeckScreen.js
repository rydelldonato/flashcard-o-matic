import React, { useEffect, useState } from "react";
import { readDeck, deleteCard, deleteDeck} from "../utils/api";
import { NavLink, useParams, useHistory } from "react-router-dom";

export default function DeckScreen() {
  const { deckId } = useParams();
  const history = useHistory();
  const [currentDeck, setCurrentDeck] = useState({ cards: [] });
  const { cards } = currentDeck;
  useEffect(() => {
    async function getCurrentDeck() {
      try {
        const response = await readDeck(deckId);
        setCurrentDeck(response);
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentDeck();
  }, [deckId]);


  function HandleEditDeckButton(deckId) {
    const url = `/decks/${deckId}/edit`;
    history.push(url);
  }

  function HandleStudyButton(deckId) {
    const studyDeckURL = `/decks/${deckId}/study`;
    history.push(studyDeckURL);
  }
  function HandleAddButton(deckId) {
    const studyDeckURL = `/decks/${deckId}/cards/new`;
    history.push(studyDeckURL);
  }
  function HandleDeleteDeckButton(deckId) {
    const message = `Delete this deck?\n\nYou will not be able to recover it.`;
    if (window.confirm(message)) {
      deleteDeck(deckId);
      history.push("/");
      window.location.reload();
    }
  }
  function HandleDeleteCardButton(cardId) {
    const message = `Delete this card?\n\nYou will not be able to recover it.`;
    if (window.confirm(message)) {
      deleteCard(cardId);
      window.location.reload();
    }
  }
  function HandleEditCardButton(deckId, cardId){
    const url = `/decks/${deckId}/cards/${cardId}/edit`;
    history.push(url);
  }
  return (
    <div>
      <div style={{ fontSize: "14px" }} className="nav-bar bg-light p-2">
        <span>
          🏠<NavLink to="/">Home</NavLink>
          <span className="font-weight-light"> / {currentDeck.name}</span>
        </span>
      </div>
      <div>
        <h4>{currentDeck.name}</h4>
        <p>{currentDeck.description}</p>
        <button
          onClick={() => HandleEditDeckButton(deckId)}
          className="btn btn-secondary m-1"
        >
          ✏️Edit
        </button>
        <button
          onClick={() => HandleStudyButton(deckId)}
          className="btn btn-primary m-1"
        >
          📖Study
        </button>
        <button
          onClick={() => HandleAddButton(deckId)}
          className="btn btn-primary m-1"
        >
          +Add Cards
        </button>
        <button
          style={{float: "right"}}
          onClick={() => HandleDeleteDeckButton(deckId)}
          className="btn btn-danger"
        >
          🗑️
        </button>
      </div>
      <div className="mt-3">
        <h4>Cards</h4>
        {cards.map((card) => (
          <div key={card.id} className="d-flex flex-row border">
            <div className="col text-center">
              <p>{card.front}</p>
            </div>
            <div className="col text-center">
              <p>{card.back}</p>
              <div style={{ marginLeft: "50%" }} className="row">
                <button onClick={()=>HandleEditCardButton(deckId,card.id)} className="btn btn-secondary mr-1">✏️Edit</button>
                <button onClick={()=>HandleDeleteCardButton(card.id)} className="btn btn-danger">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
