# React Game App: Wordle and Colorale

## Overview

This React application lets users play two exciting games: **Wordle** and **Colorale**.

* **Wordle**: The classic word-guessing game where players deduce a 5-letter word within six attempts.
* **Colorale**: A creative twist on Wordle, where colors replace letters, and players guess a sequence of colors instead.

The app is built with React and incorporates engaging animations, a user-friendly interface, and responsive design for a seamless gaming experience.

---

## Features

### Wordle

* Guess the 5-letter word in 6 attempts.
* Feedback provided after each guess:

  * **Green**: Correct letter in the correct position.
  * **Yellow**: Correct letter in the wrong position.
  * **Gray**: Incorrect letter.

### Colorale

* Guess the color sequence within a set number of attempts.
* Each color can appear a limited number of times in the sequence.
* Feedback icons:

  * ✅ Correct color in the correct position.
  * ⏺ Correct color but incorrect position.
  * ❌ Color not present in the sequence.

### General Features

* **Animations**: Smooth transitions when revealing results.
* **Keyboard Support**: Interact using the on-screen keyboard or physical keyboard.
* **Mobile-Friendly**: Optimized for touchscreens and smaller displays.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-game-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-game-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

---

## How to Play

### Wordle

1. Use the keyboard to enter your guesses.
2. Press **Enter** to submit.
3. Adjust your next guesses based on the feedback.

### Colorale

1. Select colors from the on-screen palette or use keyboard shortcuts.
2. Press **Enter** to lock your guess.
3. Observe the feedback icons to refine your guesses.

---

## Technologies Used

* **Frontend**: React, CSS3
* **State Management**: React Hooks
* **Icons**: Font Awesome
* **Animations**: CSS Transitions
* **Data**: JSON for color definitions

---

## Folder Structure

```
react-game-app/
├── src/
│   ├── components/
│   │   ├── Wordle/
│   │   ├── Colorale/
│   │   └── Common/
│   ├── data/
│   │   └── colors.json
│   │   └── words.json
│   ├── App.js
│   └── index.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## Customization

* **Word Length (Wordle)**: Modify the word length in the Wordle settings.
* **Color Palette (Colorale)**: Update `colors.json` to change the color options.
* **Number of Attempts**: Adjust game settings to allow more or fewer attempts.

---

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add a new feature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

* Inspired by the original Wordle game.
* Colorale concept developed to bring a vibrant twist to puzzle games.