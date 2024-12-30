const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King', 'Ace'
];

const deck = [];

for (let suit of suits) {
    for (let value of values) {
        deck.push({ suit, value });
    }
}

export default deck;