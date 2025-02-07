//Targets unordered list
const guessedLettersElement = document.querySelector(".guessed-letters");
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
    makeGuess(inputValue);
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

const makeGuess = function (inputValue) {
  inputValue = inputValue.toUpperCase();
  if (guessedLetters.includes(inputValue)) {
    pMessage.innerText =
      "You have already guessed this letter. Please guess another letter.";
  } else {
    guessedLetters.push(inputValue); /*Changed from guess */
    console.log(guessedLetters);
    updateLetters();
    updateWordProgress(guessedLetters);
  }
};

const updateLetters = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const updateLetter = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updateLetter.push(letter.toUpperCase());
    } else {
      updateLetter.push("●");
    }   
  }
  p.innerText = updateLetter.join("");
  winGame();
};

const winGame = function () {
  if (word.toUpperCase() === p.innerText) {
    pMessage.classList.add("win");
    pMessage.innerHTML = `<p class="highlight"> You guessed the right word! Congrats! </p> `;
  }
  }
