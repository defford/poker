import React from 'react'
import Card from './Card'

const Hand = ({ cards, onCardSelect, selectedCards }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {cards.map((card, index) => (
        <Card 
          key={index}
          suit={card.suit} 
          value={card.value} 
          isSelected={selectedCards.some(
            c => c.suit === card.suit && c.value === card.value
            )}
            onClick={() => onCardSelect(card)}
        />
      ))}
    </div>
  )
}

export default Hand