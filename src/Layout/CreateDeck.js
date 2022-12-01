import React, {useState} from "react";
import { NavLink, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

export default function CreateDeck() {
  const initialDeckState = {
    name: "",
    description: "",
};
  
  const history = useHistory();

  function HandleCancelButton() {
    const url = "/";
    history.push(url);
  }

  const [ deck, setDeck ] = useState({...initialDeckState});

  function HandleSubmitButton(event){
    event.preventDefault();
    createDeck(deck)
    .then((response) => {
      setDeck({...initialDeckState})
      history.push(`/decks/${response.id}`);
});
};

  function HandleDeckChange({target}){
    setDeck({
      ...deck,
      [target.name]: target.value,
  });
};

  return (
    <>
      <div style={{ fontSize: "14px" }} className="nav-bar bg-light p-2">
        <span>
          🏠<NavLink to="/">Home</NavLink>
          <span className="font-weight-light"> / Create Deck</span>
        </span>
      </div>
      <div className="create-deck">
        <h2>Create Deck</h2>
        <form onSubmit={HandleSubmitButton}>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input
            required
              id="name"
              name="name"
              type="text"
              placeholder="Deck Name"
              onChange={HandleDeckChange}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
          </div>
          <div>
            <textarea
            required
              id="description"
              name="description"
              type="text"
              placeholder="Brief description of the deck"
              onChange={HandleDeckChange}
            ></textarea>
          </div>
          <div>
            <button onClick={HandleCancelButton} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
