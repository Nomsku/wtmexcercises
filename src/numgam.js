"use strict";
        
const timeText = document.querySelector("#timer");
let randomNumber = Math.floor(Math.random() (max - min + 1) + min);

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
        
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const min = 0;
const max = 100;
const maxGuesses = 10;
let guessCount = 1;
let resetButton;
let time = 0;
let timerStarted = false;
let interval = 0;
let numberOfGuesses = 0;
let guessedNumbers = [];
        

        const checkGuess = () => {
        const userGuess = Number(guessField.value);
        if (guessCount === 1) {
            guesses.textContent = 'Previous guesses: ';
        }
        guesses.textContent += `${userGuess} `;
        if (!timerStarted) {
    timerStarted = true;
    clearInterval(interval);
    interval = setInterval(timer, 1000);
  }

        if (userGuess === randomNumber) {
            lastResult.textContent = `Congratulations! You got it right! It took you ${numberOfGuesses + 1} guesses and ${time} seconds.`;
            lastResult.style.backgroundColor = 'green';
            lowOrHi.textContent = '';
            clearInterval(interval);
            timerStarted = false;
            setGameOver();
        } else if (guessCount === 10) {
            lastResult.textContent = '!!!GAME OVER!!!';
            lowOrHi.textContent = '';
            setGameOver();
        } else {
            lastResult.textContent = 'Wrong!';
            lastResult.style.backgroundColor = 'red';
            numberOfGuesses++;
            guessedNumbers.push(userGuess);
            if (userGuess < randomNumber) {
            lowOrHi.textContent = `Too low, guesses left: ${
        maxGuesses - numberOfGuesses
      }`;
            } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
            }
            
        }
        
  

        guessCount++;
        guessField.value = '';
        guessField.focus();
        
        }
        guessSubmit.addEventListener('click', checkGuess);
        const setGameOver = () => {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');
        resetButton.textContent = 'Start new game';
        document.body.append(resetButton);
        resetButton.addEventListener('click', resetGame);
        }
        const resetGame = () => {
        guessCount = 1;

        const resetParas = document.querySelectorAll('.resultParas p');
        for (const resetPara of resetParas) {
            resetPara.textContent = '';
        }

        resetButton.parentNode.removeChild(resetButton);

        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();

        lastResult.style.backgroundColor = 'white';

        randomNumber = Math.floor(Math.random() * 100) + 1;
        timeText.textContent = `Time spent: 0 seconds`;
        time=0;
        numberOfGuesses = 0;
        guessedNumbers.push(userGuess);
        }
        
const timer = () => {
  time++;
  timeText.textContent = `Time spent: ${time} seconds`;
};