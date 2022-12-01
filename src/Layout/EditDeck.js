import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

export default function EditDeck() {
  const initialFormState = {
    name:"",
    description:""
  }
  const history = useHistory();
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  const [form, setForm] = useState({...initialFormState});
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

  function HandleSubmitButton(event){
    event.preventDefault();
    updateDeck(currentDeck);
    setForm({...initialFormState})
    window.location.reload();
  }
  function HandleCancelButton(){
    const url = `/decks/${deckId}`;
    history.push(url);
  }

  function HandleFormChange({target}){
    setCurrentDeck({...currentDeck,[target.name]:target.value})
  }

  return (
    <>
      <div style={{ fontSize: "14px" }} className="nav-bar bg-light p-2">
        <span>
          🏠<NavLink to="/">Home</NavLink> / 
          <NavLink to={`/decks/${deckId}`}>{currentDeck.name}</NavLink>
          <span className="font-weight-light"> / Edit Deck </span>
        </span>
      </div>
      <div>
        <h3>Edit Deck</h3>
        <form onSubmit={HandleSubmitButton}>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input
              onChange={HandleFormChange}
              id="name"
              name="name"
              type="text"
              placeholder={currentDeck.name}
              value={currentDeck.name}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
          </div>
          <div>
            <textarea
              onChange={HandleFormChange}
              id="description"
              name="description"
              type="text"
              placeholder={currentDeck.description}
              value={currentDeck.description}
            ></textarea>
          </div>
          <div>
            <button onClick={HandleCancelButton} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
