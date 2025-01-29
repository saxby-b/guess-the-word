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

const circle = function (word) {
  const placeHolderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeHolderLetters.push("●");
  }
  p.innerText = placeHolderLetters.join("");
};

circle(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = textInput.value;
  console.log(inputValue);
  textInput.value = "";
});
