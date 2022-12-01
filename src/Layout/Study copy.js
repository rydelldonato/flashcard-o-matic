import { useEffect, useState } from "react"
import { readDeck } from "../utils/api";


export default function Study({deckId}){
    const [studyDeck,setStudyDeck] = useState([]);

    useEffect(()=>{
        async function getStudyDeck(){
            const data = await readDeck();
            setStudyDeck(data);
        }
        getStudyDeck();
    },[])

    return(
        <>
        <div id="navBar" style={{fontSize: "14px"}} className="bg-light p-2">
            <span>🏠<a href="/">Home</a> / <a href="/decks/:deckId/study">Rendering in React</a> <span className="font-weight-light"> / Study</span></span>
        </div>
        <div>

        </div>
        </>
        ) 
}