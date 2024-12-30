// Card.jsx
import React from "react";

const Card = ({ suit, value, isSelected, onClick }) => {
  const suitSymbols = {
    Hearts: "♥",
    Diamonds: "♦",
    Clubs: "♣",
    Spades: "♠",
  };

  const isRed = suit === "Hearts" || suit === "Diamonds";

  return (
    <div
        onClick={onClick}
      className={`
      w-24 h-36 
      bg-white 
      rounded-lg 
      shadow-md 
      border border-gray-300 
      flex flex-col 
      justify-between 
      p-2
      ${isRed ? "text-red-600" : "text-black"}
        ${isSelected ? "ring-2 ring-blue-500" : ""}
        cursor-pointer
        transform
        ${isSelected ? "translate-y-[-8px]" : ""}
        transition-all
    `}
    >
      <div className="text-left text-lg font-bold">
        {value}
        <span className="ml-1">{suitSymbols[suit]}</span>
      </div>
      <div className="text-center text-4xl">{suitSymbols[suit]}</div>
      <div className="text-right text-lg font-bold rotate-180">
        {value}
        <span className="ml-1">{suitSymbols[suit]}</span>
      </div>
    </div>
  );
};

export default Card;
