var Word = require("./Word.js");
var request = require("sync-request");
var readline = require("readline-sync");
//use the Chalk npm package for colored std out.
//More info here: https://github.com/chalk/chalk
var chalk = require("chalk");
var fs = require("fs");

var currentWord;
var guessesRemaining;
var positiveFeedback = ["Awesome!", "Nice work!", "Great job!", "Well done!", "Fantastic!"];
var negativeFeedback = ["Sorry!", "Bad luck!", "Very unfortunate!"];


var count = 0;
while (count < 3) {
	//use the upper case version of the random word to avoid
	//comparison issues with respect to capitalization
	var word = getAlphabeticWord().toUpperCase();
	// console.log("New random word to guess: " + word);
	fs.appendFileSync("log.txt", "New random word to guess: " + word + "\n");

	initializeGlobalVariables(word);
	playGame(word);
	count++;
}

function initializeGlobalVariables(word) {
	currentWord = new Word(word);
	guessesRemaining = 9;
}

function getAlphabeticWord() {
	word = "";
	while (!isStringOnlyLetters(word)) {
		word = getRandomWord();
	}
	
	return word;
}

function isStringOnlyLetters(string) {
	return /^[a-z]+$/i.test(string);
}

function getRandomWord() {
	var api_key = "54ccbaf549c74d1bfe00002ee800c449ed71f118cc7a0f2ca";
	var url = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=20&limit=1&api_key=" + api_key;
	var res = request("GET", url);
	var response = JSON.parse(res.getBody('utf8'));
	word = response[0].word;
	return word;
}

function playGame(word) {
	console.log("Word to Guess:");
	console.log(chalk.white(currentWord.toString() + "\n"));
	var wrongLetterGuesses = "";

	// while (currentWord.toString().includes("_") && guessesRemaining > 0) {
	while (!currentWord.isWordGuessed() && guessesRemaining > 0) {
		var guessedLetterCharacter = readline.question(chalk.magentaBright("? Guess a letter! ")).toUpperCase();

		//user input validation
		if (guessedLetterCharacter.length <= 0) {
			console.log(chalk.yellow("Error: You didn't enter any letter."));
			continue;
		} else if (guessedLetterCharacter.length > 1) {
			console.log(chalk.yellow("Invalid entry: Please enter only one letter at a time."));
			continue;
		} else if (!isStringOnlyLetters(guessedLetterCharacter)) {
			console.log(chalk.yellow("Invalid entry: Please enter only letters of the alphabet"));
			continue;
		} else if (currentWord.toString().includes(guessedLetterCharacter)) {
			console.log(chalk.yellow("Duplicate! You have already CORRECTLY guessed the letter: "+ guessedLetterCharacter));
			continue;
		} else if (wrongLetterGuesses.includes(guessedLetterCharacter)) {
			console.log(chalk.yellow("Duplicate! You have already INCORRECTLY guessed the letter: "+ guessedLetterCharacter));
			continue;
		}

		var unknownLettersBeforeGuess = currentWord.toString().match(/_/g) && currentWord.toString().match(/_/g).length;
		currentWord.guessedLetter(guessedLetterCharacter);
		var unknownLettersAfterGuess = currentWord.toString().match(/_/g) && currentWord.toString().match(/_/g).length;
		if (unknownLettersBeforeGuess === unknownLettersAfterGuess) {
			guessesRemaining--;
			wrongLetterGuesses += guessedLetterCharacter;
			console.log(chalk.red("INCORRECT!!!"));
		  	console.log(guessesRemaining + " guessess remaining!!!" + "\n");
		  	console.log(chalk.white(currentWord.toString() + "\n"));
		} else {
			console.log(chalk.green("CORRECT!!!"));
		  	console.log(chalk.white(currentWord.toString() + "\n"));
		}
	}

	if (currentWord.isWordGuessed()) {
		var compliment = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
		console.log(compliment + " You have successfully guessed the word: " + word + ". You are a superstar!");
	} else {
		var consolation = negativeFeedback[Math.floor(Math.random() * negativeFeedback.length)];
		console.log(consolation + " You failed to successfully guessed the word: " + word + ". Better luck next time!");
	}
}


