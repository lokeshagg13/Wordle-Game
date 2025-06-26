# 🎮 Wordle and Colorale 🌈

## 🌟 Overview

Welcome to the **React Game App**, featuring two exciting games:

- 🟩 **Wordle**: The classic word-guessing game where players crack a 5-letter word in six attempts.
- 🎨 **Colorale**: A creative twist on Wordle, replacing letters with colors for a vibrant guessing experience.

The app boasts **smooth animations**, a **user-friendly interface**, and **responsive design** for seamless gaming on any device.

---

## ✨ Features

### 🟩 Wordle

- Guess the 5-letter word in 6 attempts.
- Feedback after each guess:

  - ✅ **Green**: Correct letter in the correct position.
  - 🟡 **Yellow**: Correct letter in the wrong position.
  - ❌ **Gray**: Incorrect letter.

### 🎨 Colorale

- Guess the sequence of colors within a limited number of attempts.
- Each color can appear a set number of times.
- Feedback icons:

  - ✅ **Correct color in the correct position**.
  - ⏺ **Correct color but wrong position**.
  - ❌ **Color not in sequence**.

### 🎮 General Features

- 🌀 **Animations**: Smooth transitions when revealing results.
- ⌨️ **Keyboard Support**: Play with an on-screen or physical keyboard.
- 📱 **Mobile-Friendly**: Optimized for touchscreens and smaller devices.

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lokeshagg13/Wordle-Game.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Wordle-Game
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

## 🎯 How to Play

### 🟩 Wordle

1. Use the keyboard to enter your guesses.
2. Press **Enter** to submit.
3. Adjust your next guesses based on the feedback.

### 🎨 Colorale

1. Select colors from the on-screen palette or use keyboard shortcuts.
2. Press **Enter** to lock your guess.
3. Observe the feedback icons to refine your guesses.

---

## 🛠️ Technologies Used

- ⚛️ **Frontend**: React, CSS3
- 🎛️ **State Management**: React Hooks
- 🎨 **Icons**: Font Awesome
- 🎞️ **Animations**: CSS Transitions
- 📦 **Data**: JSON for word and color definitions

---

## 📂 Folder Structure

```plaintext
react-game-app/
├── src/
│   ├── components/
│   │   ├── Wordle/
│   │   ├── Colorale/
│   │   └── Common/
│   ├── data/
│   │   ├── colors.json
│   │   ├── words.json
│   ├── App.js
│   └── index.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## 🖌️ Customization

- **Word Length (Wordle)**: Adjust the word length in the Wordle settings.
- **Color Palette (Colorale)**: Update `colors.json` to modify color options.
- **Number of Attempts**: Customize game settings for more or fewer attempts.

---

## 🤝 Contributing

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m \"Add a new feature\"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Acknowledgments

- 🙏 Inspired by the original Wordle game.
- 🎨 **Colorale**: Developed as a vibrant twist to bring colors into puzzle gaming.

Thank You
