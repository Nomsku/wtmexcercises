"use strict";
        
const timeText = document.querySelector("#timer");
const text = document.querySelector("#text");
const input = document.querySelector("#inputField");
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startAgain = document.querySelector("#startAgain");
const computerGuess = document.querySelector("#computerButton");
const computerConfirm = document.querySelector("#computerConfirm");
const message = document.querySelector("#message");        
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
let randomNumber = Math.floor(Math.random()*(max - min + 1) + min); 
      

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
            return "correct"; 
        } 
        else if (guessCount === 10) {
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
      return "too low";
            
    } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
            }return "too high";
            
        }
        
  

        guessCount++;
        guessField.value = '';
        guessField.focus();
        
        };
        const checkGuessComp = (userGuess) => {
            
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
                return "correct"; 
            } 
            else if (guessCount === 10) {
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
          return "too low";
                
        } else if (userGuess > randomNumber) {
                lowOrHi.textContent = 'Last guess was too high!';
                }return "too high";
                
            }
            
      
    
            guessCount++;
            guessField.value = '';
            guessField.focus();
            
            };


        guessSubmit.addEventListener('click', checkGuess);
        const setGameOver = () => {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        if(typeof(resetButton) == 'undefined' && resetButton == null){
        resetButton = document.createElement('button');
        resetButton.textContent = 'Start new game';
        document.body.append(resetButton);
        }
        resetButton.style.display = "inline";
        resetButton.addEventListener('click', resetGame);
        };
        const resetGame = () => {
        guessCount = 1;

        const resetParas = document.querySelectorAll('.resultParas p');
        for (const resetPara of resetParas) {
            resetPara.textContent = '';
        }

        resetButton.style.display = "none";
        const userGuess = Number(guessField.value);
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
        };
        
const timer = () => {
  time++;
  timeText.textContent = `Time spent: ${time} seconds`;
};

const runAlgorithm = (times) => {
    let currentMin = min;
    let currentMax = max;
    let currentNumberOfGuesses = 0;
    let lastGuess = 0;
    let results = [];
    let guessedNumbers = [];
  
    // How many times to run the algorithm
    for (let i = 0; i < times; i++) {
      // Run the algorithm until it guesses the correct number
      // Stop the loop if it takes more than 100 guesses (this is to prevent an infinite loop)
      while (true && currentNumberOfGuesses < 100) {
        // Guess the number halfway between the current min and max
        // Current min and max are updated after each guess depending on the result
        let guess = parseInt(Math.floor((currentMin + currentMax) / 2));
  
        // This is to prevent the algorithm from getting stuck guessing 99
        if (lastGuess === 99) {
          guess = 100;
        }
        lastGuess = guess;
  
        // Check the guess
        let result = checkGuessComp(guess, true);
        currentNumberOfGuesses++;
        guessedNumbers.push(guess);
  
        // Exit the loop if the guess is correct
        if (result === "correct") {
          results.push(currentNumberOfGuesses);
          currentNumberOfGuesses = 0;
          break;
        }
        // Update the current min and max depending on the result
        if (result === "too low") {
          currentMin = guess;
        }
        if (result === "too high") {
          currentMax = guess;
        }
      }
      
    // Reset the values for the next run
    currentMin = min;
    currentMax = max;
    currentNumberOfGuesses = 0;
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  }

  // If the algorithm was run only once, display the results
  if (results.length === 1) {
    text.textContent = `The algorithm took ${results[0]} guesses.`;
    timeText.classList.remove("hidden");
    timeText.textContent = "Guessed numbers: ";
    timeText.textContent += guessedNumbers;
  }

  // If the algorithm was run more than once, display the average, min and max
  if (results.length > 1) {
    let max = Math.max(...results);
    let min = Math.min(...results);
    let average = parseInt(results.reduce((a, b) => a + b) / results.length);
    text.textContent = `The algorithm took ${average} guesses on average.`;
    timeText.classList.remove("hidden");
    timeText.textContent = `The algorithm took minimum of ${min} guesses and maximum of ${max} guesses.`;
  }

  
};

// Check the player's guess
guessSubmit.addEventListener("click", () => {
  message.textContent = "";
  const guess = parseInt(input.value);
  input.value = "";
  computerGuess.classList.add("hidden");

  // Start timer
  timerStarted = true;
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);

  // Check if guess is valid then check if it is correct
  if (checkValid(guess)) {
    checkGuessComp(guess, false);
  }
});

// Show ui to enter how many times the algorithm should run


// Check how many times to run the algorithm
computerConfirm.addEventListener("click", () => {
  const times = parseInt(input.value);
  input.value = "";

  // Check if player has entered a value
  if (times === "") {
    message.textContent = "Please enter a number.";
    return;
  }

  // Check if player has entered a number
  if (isNaN(times)) {
    message.textContent = "Please enter a number.";
    return;
  }

  // Check if player has entered a number between min and max
  if (times < 1 || times > 5000) {
    message.textContent = `Please enter a number between 0 and 5000.`;
    return;
  }

  runAlgorithm(times);
});