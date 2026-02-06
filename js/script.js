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
const remGuessSpan = document.querySelector(".remaining span");
//Targets empty paragraph with message
const pMessage = document.querySelector(".message");
//Targets hidden button
const hiddenButton = document.querySelector(".play-again");

let word = "magnolia";

let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt",
  );
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  circle(word);
};

getWord();

const circle = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  p.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  pMessage.innerText = "";
  const inputValue = textInput.value;
  const playerInputValue = playerInput(inputValue);
  if (playerInputValue) {
    makeGuess(inputValue);
  }
  textInput.value = "";
});

const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    pMessage.innerText = "Please type a letter to guess the mystery word.";
  } else if (input.length >= 2) {
    pMessage.innerText = "Please only submit one letter at a time.";
  } else if (!input.match(acceptedLetter)) {
    pMessage.innerText = "Please only submit a letter from A-Z.";
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
    guessedLetters.push(inputValue); 
    //console.log(guessedLetters);
    updateRemainingGuesses(inputValue);
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

const updateRemainingGuesses = function (inputValue) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(inputValue)) {
    pMessage.innerText = `Sorry, the mystery word does not include the letter ${inputValue}.`;
    remainingGuesses -= 1;
  } else {
    pMessage.innerText = `Yay! The mystery word does include the letter ${inputValue}.`;
  }

  if (remainingGuesses === 0) {
    pMessage.innerHTML = `Game over! The word was <span class="highlight"> ${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remGuessSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remGuessSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const winGame = function () {
  if (word.toUpperCase() === p.innerText) {
    pMessage.classList.add("win");
    pMessage.innerHTML = `<p class="highlight"> You guessed the right word! Congrats! </p> `;
    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remGuess.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  hiddenButton.classList.remove("hide");
};

hiddenButton.addEventListener("click", function () {
  pMessage.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remGuessSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  pMessage.innerText = "";
  getWord();

  guessButton.classList.remove("hide");
  hiddenButton.classList.add("hide");
  remGuess.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});
