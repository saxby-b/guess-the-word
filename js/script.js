//Targets unordered list
const ul = document.querySelector(".guessed-letters");
//Targets button
const guessButton = document.querySelector(".guess");
//Targets text input
const textInput = document.querySelector(".letter");
//Targets empty paragraph
const p = document.querySelector(".word-in-progress");
//Targets Where remaining guesses will display
const remGuess = document.querySelector(".remaining");
//Targets span
const span = document.querySelector(".remaining span");
//Targets empty paragraph with message
const pMessage = document.querySelector(".message");
//Targets hidden button
const hiddenButton = document.querySelector(".play-again");

const word = "magnolia";

const guessedLetters = [];

const circle = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  p.innerText = placeholderLetters.join("");
};

circle(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  pMessage.innerText = "";
  const inputValue = textInput.value;
  // console.log(inputValue);
  // textInput.value = "";
  const playerInputValue = playerInput(inputValue);
  if (playerInputValue) {
    makeGuess(guess);
  }
  textInput.value = "";
  //console.log(playerInputValue);
  // makeGuess(guess);
});

const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    pMessage.innerText = "Please type a letter to guess the mystery word.";
  } else if (input.length >= 2) {
    pMessage.innerText = "Please only submit one letter at a time.";
  } else if (!input.match(acceptedLetter)) {
    pMessage.innerText = "Please only submit a letter.";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUppercase();
  if (guessedLetters.includes(guess)) {
    pMessage.innerText =
      "You have already guessed this letter. Please guess another letter.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
