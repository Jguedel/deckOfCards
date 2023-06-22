import Card from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";

const Control = () => {
  //inital deck state
  const emptyDeck = () => {
    const empty = {
      deck_id: "",
      remaining: 0,
      shuffled: false,
      success: false,
    };
    return empty;
  };
  const emptyCard = () => {
    const empty = {
      cards: [
        {
          image: "//bicyclecards.org/wp-content/uploads/2019/11/red-56.jpg",
        },
      ],
      remaining: 0,
      shuffled: false,
      success: false,
    };
    return empty;
  };

  const [show, setShow] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [restart, setRestart] = useState(false);
  const [card, setCard] = useState(emptyCard);
  const [deck, setDeck] = useState(emptyDeck);

  //set deck on first render
  useEffect(() => {
    async function drawDeck() {
      if (show) {
        console.log("draw deck ran");
        const { data } = await axios.get(
          `//deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
        );
        setDeck((deck) => data);
      }
    }
    drawDeck();
  }, [show]);

  //set deck on first render
  useEffect(() => {
    async function reDrawDeck() {
      if (show) {
        console.log("draw deck ran");
        const { data } = await axios.get(
          `//deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
        );
        setDeck((deck) => data);
        console.log(deck);
        console.log(clicked);
      }
    }
    reDrawDeck();
  }, [restart]);

  //set card draw
  useEffect(() => {
    const draw = async () => {
      if (deck.deck_id !== "" && clicked) {
        console.log("draw card ran");
        const { data } = await axios.get(
          `//deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
        );
        if (data.error) {
          alert("out of cards");
          setShow((show) => false);
          setClicked((clicked) => false);
        }
        setCard((card) => data);
      } else {
        setCard((card) => emptyCard());
      }
    };
    draw();
  }, [deck]);

  //handle click event
  const handleCLick = (e) => {
    e.preventDefault();
    setClicked((clicked) => true);
    if (deck.remaining - 1 < 0) {
      console.log("remaining is negative");
    }
    const newDeck = {
      deck_id: deck.deck_id,
      remaining: deck.remaining,
      shuffled: true,
      success: true,
    };
    setDeck((deck) => newDeck);
  };
  //handle restart event
  const handleRestart = (e) => {
    e.preventDefault();
    setClicked((click) => false);
    setRestart((restart) => !restart);
    setShow((show) => true);
  };

  return (
    <div className="control">
      {show ? <button onClick={handleCLick}>Darw a Card</button> : null}
      <button onClick={handleRestart}>Restart</button>
      {show ? <Card img={card} /> : <p className="outOfCards">out of cards</p>}
    </div>
  );
};
export default Control;
