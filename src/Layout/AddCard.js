import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Form from "./Form";

export default function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [currentForm, setCurrentForm] = useState({ ...initialFormState });
  const [currentDeck, setCurrentDeck] = useState({});

  function HandleSubmit(event) {
    event.preventDefault();
    createCard(deckId, currentForm).then((response) => {
      setCurrentForm({ ...initialFormState });
    });
    window.location.reload();
  }
  function handleFormChange({ target }) {
    setCurrentForm({ ...currentForm, [target.name]: target.value });
  }
  function HandleDoneButton() {
    const url = `/decks/${deckId}`;
    history.push(url);
  }
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

  return (
    <>
      <div style={{ fontSize: "14px" }} className="nav-bar bg-light p-2">
        <span>
          🏠<NavLink to="/">Home</NavLink> /
          <NavLink to={`/decks/${deckId}`}>{currentDeck.name}</NavLink>
          <span className="font-weight-light"> / Add Card</span>
        </span>
      </div>
      <Form
        formTitle={`${currentDeck.name}: Add Card`}
        handleFormChange={handleFormChange}
        HandleDoneButton={HandleDoneButton}
        HandleSubmit={HandleSubmit}
        formLabelOne={`Front`}
        formPlaceholderOne={`Front side of card`}
        formValueOne={`front`}
        formLabelTwo={`Back`}
        formPlaceholderTwo={`Back side of card`}
        formValueTwo={`back`}
        buttonName={`Done`}
      />
    </>
  );
}

// <h3>{currentDeck.name}: Add Card</h3>
// <form onSubmit={HandleSubmit}>
//   <div><label htmlFor="front">Front</label></div>
//   <div><textarea onChange={handleFormChange} id="front" name="front" type="text" placeholder="Front side of card"></textarea></div>
//   <div><label htmlFor="back">Back</label></div>
//   <div><textarea onChange={handleFormChange} id="back" name="back" type="text" placeholder="Back side of card"></textarea></div>
//   <div className="mt-2">
//     <button onClick={HandleDoneButton} className="btn btn-secondary mr-2">Done</button>
//     <button type="submit" className="btn btn-primary">Save</button>
//   </div>
// </form>
