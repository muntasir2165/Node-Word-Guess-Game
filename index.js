var Word = require("./Word.js");
// var request = require("request");
var request = require("sync-request");
// var inquirer = require('inquirer');
var readline = require('readline-sync');
//use the Chalk npm package for colored std out.
//More info here: https://github.com/chalk/chalk
const chalk = require('chalk');

var currentWord;
var guessesRemaining;
initializeGlobalVariables(getRandomWord());
// getRandomWord();
playGame();
function initializeGlobalVariables(randomWord) {
	currentWord = new Word(randomWord);
	guessesRemaining = 5;
}

function getRandomWord() {
	var api_key = "54ccbaf549c74d1bfe00002ee800c449ed71f118cc7a0f2ca";
	var url = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=20&limit=1&api_key=" + api_key;
	var res = request("GET", url);
	var response = JSON.parse(res.getBody('utf8'));
	word = response[0].word;
	// console.log(word);
	return word;
}

function playGame() {
	console.log("Word to Guess:");
	console.log(currentWord.toString());

	while (currentWord.toString().includes("_") && guessesRemaining > 0) {
		var guessedLetterCharacter = readline.question("? Guess a letter! ");
		// console.log("sdaf" + currentWord.toString());
		var unknownLettersBeforeGuess = currentWord.toString().match(/_/g) && currentWord.toString().match(/_/g).length;
		currentWord.guessedLetter(guessedLetterCharacter);
		var unknownLettersAfterGuess = currentWord.toString().match(/_/g) && currentWord.toString().match(/_/g).length;
		if (unknownLettersBeforeGuess === unknownLettersAfterGuess) {
			guessesRemaining--;
			console.log("INCORRECT!!!");
		  	console.log(guessesRemaining + " guessess remaining!!!");
		  	// playGame();
		} else {
			console.log("CORRECT!!!");
		  	console.log(currentWord.toString());
		  	// playGame();
		}
	}
}

// ---------------------------------------------- //
// console.log(chalk.blue('Hello world!'));

// console.log(chalk.whiteBright("Hello from index.js!"));

// var word = new Word("OLAAAA");
// console.log(word.toString());

// console.log("output: " + getRandomWord());
// ---------------------------------------------- //

// function playGame() {
// 	console.log("Word to Guess:");
// 	console.log(currentWord.toString());

// 	if (currentWord.toString().includes("_") && guessesRemaining > 0) {
// 		inquirer.prompt([
// 		  {
// 		    letter: "letter",
// 		    message: "? Guess a letter! "
// 		  }
// 		]).then(function(answer) {
// 		  var guessedLetterCharacter = answers.letter;
// 		  var unknownLettersBeforeGuess = currentWord.toString().match(/-/g).length;
// 		  currentWord.guessedLetter(guessedLetterCharacter);
// 		  var unknownLettersAfterGuess = currentWord.toString().match(/-/g).length;
// 		  if (unknownLettersBeforeGuess === unknownLettersAfterGuess) {
// 		  	guessesRemaining--;
// 		  	console.log("INCORRECT!!!");
// 		  	console.log(guessesRemaining + " guessess remaining!!!");
// 		  	playGame();
// 		  } else {
// 		  	console.log("CORRECT!!!");
// 		  	console.log(currentWord.toString());
// 		  	playGame();
// 		  }
// 		});
// 	}
// }

/*
Reference:
https://stackoverflow.com/questions/26622708/how-to-get-random-word-using-wordnik-api-in-javascript
*/
// function getRandomWord() {
// 	var api_key = "54ccbaf549c74d1bfe00002ee800c449ed71f118cc7a0f2ca";
// 	var url = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=20&limit=1&api_key=" + api_key;
// 	// console.log(url);
// 	// run a request to the OMDB API with the movie specified
// 	request(url, function(error, response, body) {

// 	  // If the request is successful (i.e. if the response status code is 200)
// 	  if (!error && response.statusCode === 200) {

// 	    var wordData = JSON.parse(body);
// 	    console.log(wordData, wordData[0].word);
// 	    var randomWord = wordData[0].word;
// 	    console.log("new random word: " + randomWord);
// 	    initializeGlobalVariables(randomWord);
// 	    playGame();
// 	  } else {
// 	  		console.log("Sorry, invalid request.\n" + "ERROR: " + error);
// 	  }
// 	});
// }