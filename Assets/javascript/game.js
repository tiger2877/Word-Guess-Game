// Wait until the DOM is fully loaded and then run the function

window.addEventListener("DOMContentLoaded", function(){

// Set up variable to cache reference to the DOM elements we'll be using

  var wins = 0;
  var losses = 0;
  var guessesLeft = 9;
  var s;
  var answerArray= []; // array to display the number of letters based on the word
  var guessesSoFar = []; // array to push user choices to
  var incorrectLetters = document.getElementById("incorrect-letters");
  var guesses = document.getElementById("guesses");
  var containers = document.querySelectorAll(".letter"); // Find all the letter element containers:
  var foundCount = 0;

  // Set up the secret word
  var randomWordArr = ["apple","banana","blackberry","cherry","orange","mango","plum","pear","pineapple","strawberry","watermelon"];
  // Computer selects random letter
  var computerGuess = randomWordArr[Math.floor(Math.random()*randomWordArr.length)];
  var questionIndex = 0;
  var audio1 = new Audio('http://www.wavsource.com/snds_2018-06-03_5106726768923853/tv/simpsons/homer/whoo.wav');
  var audio2 = new Audio('http://www.wavsource.com/snds_2018-06-03_5106726768923853/tv/simpsons/homer/whatever_homer.wav');
  // MAIN PROCESS


//function to display the number of letter when the browser is loaded
function startUp()
{
    for (var i=0; i< computerGuess.length; i++)
    {
        answerArray[i] = "_ ";
    }
    s = answerArray.join(" "); //add elements of an array
    document.getElementById("guesses").innerHTML = s;
} 

// Reset function
function reset() {
  guessesLeft = 9; //reseting the guesses back to 9 so that the user can play again
  guessesSoFar.length = 0; 
  document.getElementById("guesses").innerHTML = "";
  document.querySelector("#guessesLeft").innerHTML = guessesLeft;
  guessesSoFar = [];
  document.querySelector("#incorrect-letters").innerHTML = guessesSoFar;
  computerGuess = randomWordArr[Math.floor(Math.random()*randomWordArr.length)];
  return;
} 

//When the browser is opened, it will run the following function...
window.onload = function()
{
    startUp();
}    

// When the user presses a key, it will run the following function...

  document.onkeyup = function(event) {

  // ==============================================================================
  // event.keyCode and event.code return the numeric code for the character 
  // they produce. When passed to String.fromCharCode(), we get the actual
  // character that was produced by the key input, but this excludes keystrokes
  // that don't produce a visible character (space, backspace, tab, enter, etc.)
  // From there, we convert that character to lower-case.
  // ==============================================================================

  var userInput = String.fromCharCode(event.keyCode || event.code).toLowerCase();
  
  var found = false;

  // Check input to see if it is in the secret word array and, if so,
  // print the input in the correct position
  
  // Loop through each letter in the array
  guessesSoFar.push(userInput); //pushing user guess to userInput
  console.log(computerGuess);

    for(var i = 0; i < computerGuess.length; ++i){  // Loop through each letter in the array
      if(userInput === computerGuess[i]){          // Check the input against the current letter we're looping over
      
      // We have a match, put the letter in the container that is in the same
      // position in the array as it is in the word
      // containers[i].textContent = userInput;
        found = true;
        foundCount++;
        answerArray[i] = userInput;
        s = answerArray.join(" "); //add elements of an array
        document.getElementById("guesses").innerHTML = s;
      }
    }  
    
  // If all letters have been found, add wins
    if(foundCount === computerGuess.length){
        wins++;
        document.getElementById("guesses").innerHTML="Way to go! You\'ve guesesed corrrectly. You Won!'";
        audio1.play();
        document.querySelector("#wins").innerHTML = wins; // Taking the tallies and displaying them in HTML    
        reset();
    }
  
  // If the input wasn't found after looping, write it in the bad guesses area
    if(!found) { 
        incorrectLetters.innerHTML = incorrectLetters.innerHTML + userInput; 
        guessesLeft--; //decrementing the guesses left
        document.querySelector("#guessesLeft").innerHTML = guessesLeft; // Taking the tallies and displaying them in HTML 
    } 
    if (guessesLeft == 0){
        losses++;
        document.querySelector("#losses").innerHTML = losses; // Taking the tallies and displaying them in HTML    
        document.getElementById("guesses").innerHTML='You didn\'t guess the correct letter. You lost. Let\'s try again.';
        audio2.play();
        reset();
    }  
  
        // Increment the questionIndex variable and call the renderQuestion function.
        questionIndex++;
      

};
});