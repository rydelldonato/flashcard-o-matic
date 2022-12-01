import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function FlipCard(props) {
  const initialCardState = {
    id: 0,
    front: "",
    back: "",
    deckId: 0,
  };

  const { cards } = props;
  const sortedCards = cards.sort((cardA, cardB) => cardA.id - cardB.id);

  const { deckId } = useParams();
  const history = useHistory();

  const [currentCard, setCurrentCard] = useState({ ...initialCardState });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [displayedCardIndex, setDisplayedCardIndex] = useState(1);
  const [cardIsFlipped, setCardIsFlipped] = useState(true);
  const [endOfCardDeck, setEndOfCardDeck] = useState(false);

  useEffect(() => {
    if (sortedCards.length > 2) {
      setCardIsFlipped(true);
    }
    setCurrentCard(sortedCards[currentCardIndex]);
  }, [sortedCards, currentCardIndex]);

  const cardFlipHandler = () => {
    cardIsFlipped ? setCardIsFlipped(false) : setCardIsFlipped(true);
  };

  const nextCardHandler = () => {
    setCardIsFlipped(false);
    incrementCurrentCardAndIndexes();
    if (cards.length <= displayedCardIndex) {
      setEndOfCardDeck(true);
      resetCardsTofirstIndexPrompt();
    }
  };

  function incrementCurrentCardAndIndexes() {
    setCurrentCardIndex((currentIndex) => currentIndex + 1);
    setDisplayedCardIndex((currentDisplayedIndex) => currentDisplayedIndex + 1);
    setCurrentCard(sortedCards[currentCardIndex + 1]);
  }

  function resetCardsTofirstIndexPrompt() {
    if (window.confirm(`Restart cards?\n\nClick 'cancel' to return to the home page.`)) {
      resetCardIndexesToInitialState();
      resetEndOfDeckToInitialState();
      changeRouteOnConfirmation(true);
    } else {
      resetEndOfDeckToInitialState();
      changeRouteOnConfirmation(false);
    }
  }

  function resetCardIndexesToInitialState() {
    setCurrentCardIndex(0);
    setDisplayedCardIndex(1);
    setCurrentCard(sortedCards[currentCardIndex]);
  }

  function resetEndOfDeckToInitialState() {
    return setEndOfCardDeck(false);
  }

  function changeRouteOnConfirmation(confirm) {
    if (confirm) {
      history.push(`/decks/${deckId}/study`);
    } else {
      history.push("/");
    }
  }
  function HandleAddCardButton(){
    const url = `/decks/${deckId}/cards/new`;
    history.push(url);
  }

  if (cards.length > 2 && currentCard) {
    return (
      <div className="container border p-3">
        <h4>
          Card {displayedCardIndex} of {cards.length}
        </h4>
        {cardIsFlipped ? <p>{currentCard.front}</p> : <p>{currentCard.back}</p>}
        <div className="row">
          <div className="p-3">
            <button className="btn btn-secondary" onClick={cardFlipHandler}>
              Flip
            </button>
          </div>
          {!cardIsFlipped ? (
            <div className="p-3">
              <button className="btn btn-primary" onClick={nextCardHandler}>
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  if (!endOfCardDeck && cards.length <= 2) {
    return (
      <>
        <h4>Not enough cards.</h4>
        <p>
          You need at least 3 cards to study. There{" "}
          {cards.length < 2 ? "is" : "are"} {cards.length}{" "}
          {cards.length < 2 ? "card" : "cards"} in this deck.
        </p>
        <button className="btn btn-primary" onClick={HandleAddCardButton}>+Add Cards</button>
      </>
    );
  }
}
