import React, { useState, useEffect } from "react";
import deck from "../data/deck";
import Hand from "./Hand";
import Header from "./Header";

const Deck = () => {
  const [cards, setCards] = useState([...deck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    handleShuffle();
  }, []);

  const handleDraw = () => {
    const cardsNeeded = 5 - drawnCards.length;

    if (cardsNeeded <= 0) {
      console.log("Hand is already full");
      return;
    }

    if (cards.length < cardsNeeded) {
      console.log("Not enough cards in the deck");
      return;
    }

    const newDeck = [...cards];
    const drawn = newDeck.splice(-cardsNeeded);
    setCards(newDeck);
    setDrawnCards((prev) => [...prev, ...drawn]);
    setGameStarted(true);
  };

  const handleShuffle = () => {
    const shuffledDeck = [...cards];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setCards(shuffledDeck);
  };

  const handleRestart = () => {
    setCards([...deck]);
    setDrawnCards([]);
    setSelectedCards([]);
    setGameStarted(false);
    handleShuffle();
  };

  const handleCardSelect = (card) => {
    setSelectedCards((prev) =>
      prev.some((c) => c.suit === card.suit && c.value === card.value)
        ? prev.filter((c) => c.suit !== card.suit || c.value !== card.value)
        : [...prev, card]
    );
  };

  const handleDiscard = () => {
    if (selectedCards.length === 0) return;

    const remainingDrawnCards = drawnCards.filter(
      (card) =>
        !selectedCards.some(
          (selected) =>
            selected.suit === card.suit && selected.value === card.value
        )
    );

    const newCardsNeeded = 5 - remainingDrawnCards.length;

    if (newCardsNeeded > 0 && cards.length >= newCardsNeeded) {
      const newDeck = [...cards];
      const newDrawnCards = newDeck.splice(-newCardsNeeded);
      setCards(newDeck);
      setDrawnCards([...remainingDrawnCards, ...newDrawnCards]);
    } else {
      setDrawnCards(remainingDrawnCards);
    }

    setSelectedCards([]);
  };

  const evaluateHand = (cards) => {
    if (cards.length !== 5) return "Need 5 cards";

    // Convert card values to numbers
    const valueMap = {
      Ace: 14,
      King: 13,
      Queen: 12,
      Jack: 11,
    };

    const values = cards
      .map((card) => valueMap[card.value] || Number(card.value))
      .sort((a, b) => b - a);

    const suits = cards.map((card) => card.suit);

    const valueCounts = values.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    const isFlush = suits.every((suit) => suit === suits[0]);
    const isStraight = values.every(
      (val, i) => i === 0 || values[i - 1] === val + 1
    );
    const counts = Object.values(valueCounts).sort((a, b) => b - a);

    const getCardName = (value) => {
      switch (value) {
        case 14:
          return "Ace";
        case 13:
          return "King";
        case 12:
          return "Queen";
        case 11:
          return "Jack";
        default:
          return value.toString();
      }
    };

    // Rest of the evaluation logic remains the same
    if (isFlush && isStraight) return "Straight Flush";
    if (counts[0] === 4) {
      const quad = Object.entries(valueCounts).find(
        ([_, count]) => count === 4
      );
      return `Four of a Kind (${getCardName(Number(quad[0]))})`;
    }
    if (counts[0] === 3 && counts[1] === 2) {
      const trip = Object.entries(valueCounts).find(
        ([_, count]) => count === 3
      );
      const pair = Object.entries(valueCounts).find(
        ([_, count]) => count === 2
      );
      return `Full House (${getCardName(Number(trip[0]))}s over ${getCardName(
        Number(pair[0])
      )}s)`;
    }
    if (isFlush) return "Flush";
    if (isStraight) return "Straight";
    if (counts[0] === 3) {
      const trip = Object.entries(valueCounts).find(
        ([_, count]) => count === 3
      );
      return `Three of a Kind (${getCardName(Number(trip[0]))}s)`;
    }
    if (counts[0] === 2 && counts[1] === 2) {
      const pairs = Object.entries(valueCounts)
        .filter(([_, count]) => count === 2)
        .map(([value]) => getCardName(Number(value)));
      return `Two Pair (${pairs[0]}s & ${pairs[1]}s)`;
    }
    if (counts[0] === 2) {
      const pair = Object.entries(valueCounts).find(
        ([_, count]) => count === 2
      );
      return `Pair of ${getCardName(Number(pair[0]))}s`;
    }

    return `High Card ${getCardName(values[0])}`;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <Header />
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold">POKER GAME</h1>
      </div>
      <div className="p-4 bg-gray-100 rounded shadow-lg">
        <div className="flex gap-8 mb-4">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={gameStarted ? handleRestart : handleDraw}
          >
            {gameStarted ? "RESTART" : `DRAW ${5 - drawnCards.length} CARDS`}
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleDiscard}
            disabled={selectedCards.length === 0}
          >
            DISCARD ({selectedCards.length})
          </button>
        </div>
        <Hand
          cards={drawnCards}
          onCardSelect={handleCardSelect}
          selectedCards={selectedCards}
        />
        {drawnCards.length === 5 && (
          <div className="mt-4 text-lg font-semibold text-center">
            {evaluateHand(drawnCards)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Deck;
