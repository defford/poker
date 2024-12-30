# Poker Game

This is a simple poker game built with React. The game allows you to draw, select, and discard cards, and evaluates the hand to determine the best poker hand.

## Features

- Draw cards from a shuffled deck
- Select and discard cards
- Evaluate the poker hand
- Restart the game

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/poker-game.git
    ```
2. Navigate to the project directory:
    ```sh
    cd poker-game
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Components

### Deck

The `Deck` component manages the state of the deck, drawn cards, selected cards, and game status. It includes functions to handle drawing, shuffling, selecting, discarding, and evaluating hands.

### Hand

The `Hand` component displays the drawn cards and allows for card selection.

### Card

The `Card` component represents an individual card and handles the display and selection state.

## Data

### Deck Data

The deck data is defined in `src/data/deck.js` and includes all 52 cards with their respective suits and values.

## Evaluation Logic

The hand evaluation logic is implemented in the `evaluateHand` function within the `Deck` component. It determines the best poker hand based on the drawn cards.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.