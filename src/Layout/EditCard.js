import React, { useState, useEffect } from "react";
import { readDeck, readCard, updateCard } from "../utils/api";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Form from "./Form";

export default function EditCard() {
  const { deckId, cardId } = useParams();
  const initialFormState = {
    id:cardId,
    front:"",
    back:"",
    deckId:deckId
  }
  const history = useHistory();
  const [currentForm, setCurrentForm] = useState({...initialFormState})
  const [currentDeck, setCurrentDeck] = useState({});
  const [currentCard, setCurrentCard] = useState({});
  // const [updatedCard, setUpdatedCard] = useState({});
  
  useEffect(()=>{
    readCard(cardId)
    .then(setCurrentCard)
    .catch(err=>console.log(err))
  },[cardId])

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

  function HandleSubmit(event){
    event.preventDefault();
    async function HandleSubmitChange(){
      await updateCard(currentForm)
      history.push(`/decks/${deckId}`);
      // setCurrentForm({...initialFormState})
    }
    HandleSubmitChange();
    console.log("current form is",currentForm);
    // window.location.reload();
  }
  function handleFormChange({target}){
    setCurrentForm({...currentForm, id:cardId, [target.name]: target.value, deckId:Number(deckId)})
  }
  function HandleCancelButton(){
    const url = `/decks/${deckId}`;
    history.push(url);
  }
  
  
  return (
    <div>
      <div style={{ fontSize: "14px" }} className="nav-bar bg-light p-2">
        <span>
          🏠<NavLink to="/">Home</NavLink>
          <NavLink to={`/decks/${deckId}`}> / Deck {currentDeck.name}</NavLink>
          <span className="font-weight-light"> / Edit Card {cardId}</span>
        </span>
      </div>
      <div>
      <Form
        formTitle={`Edit Card`}
        handleFormChange={handleFormChange}
        HandleDoneButton={HandleCancelButton}
        HandleSubmit={HandleSubmit}
        formLabelOne={`Front`}
        formPlaceholderOne={currentCard.front}
        formValueOne={currentCard.front}
        formLabelTwo={`Back`}
        formPlaceholderTwo={currentCard.back}
        formValueTwo={currentCard.back}
        buttonName={`Cancel`}
      />
      </div>
    </div>
  );
}

        // <h2>Edit Card</h2>
        // <form onSubmit={HandleSubmit}>
        //   <div>
        //     <label htmlFor="front">Front</label>
        //   </div>
        //   <div>
        //     <textarea
        //       onChange={handleFormChange}
        //       id="front"
        //       name="front"
        //       type="text"
        //       placeholder={currentCard.front}
        //       value={currentCard.front}
        //     ></textarea>
        //   </div>
        //   <div>
        //     <label htmlFor="back">Back</label>
        //   </div>
        //   <div>
        //     <textarea
        //       onChange={handleFormChange}
        //       id="back"
        //       name="back"
        //       type="text"
        //       placeholder={currentCard.back}
        //       value={currentCard.back}
        //     ></textarea>
        //   </div>
        //   <div className="mt-2">
        //     <button
        //       onClick={HandleCancelButton}
        //       className="btn btn-secondary mr-2"
        //     >
        //       Cancel
        //     </button>
        //     <button type="submit" className="btn btn-primary">
        //       Save
        //     </button>
        //   </div>
        // </form>