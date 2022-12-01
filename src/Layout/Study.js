import { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { NavLink, useParams } from "react-router-dom";
import FlipCard from "./FlipCard";

export default function Study() {
  const initialDeckState = {
    id: 0,
    name: "",
    flipped: false,
    description: "",
    cards: [
      {
        id: 0,
        front: "",
        back: "",
        flipped: false,
      },
    ],
  };
  const [studyDeck, setStudyDeck] = useState({ ...initialDeckState });
  let { deckId } = useParams();

  useEffect(() => {
    async function getStudyDeck() {
      try{
        const data = await readDeck(deckId);
        setStudyDeck(data);
      }
      catch(error){
        console.log(error);
      }
    }
    getStudyDeck();
  }, [deckId]);
  return (
    <>
      <div id="navBar" style={{ fontSize: "14px" }} className="bg-light p-2">
        <span>
          🏠<NavLink to="/">Home</NavLink> /{" "}
          <NavLink to={`/decks/${deckId}`}>{studyDeck.name}</NavLink>{" "}
          <span className="font-weight-light"> / Study</span>
        </span>
      </div>
      <h2>{studyDeck.name}: Study</h2>
      <div className="card-body">
        <FlipCard cards={studyDeck.cards} />
      </div>
    </>
  );
}
