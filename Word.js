var Letter = require("./Letter.js");

var Word = function(wordLetters){
	this.letterArray = (function(){
		letterArray = [];
		wordLetters.split("").forEach(function(letterCharacter){
			letterArray.push(new Letter(letterCharacter));
		});
		return letterArray;
	})();
	this.toString = function() {
		var stringOutput = "";
		this.letterArray.forEach(function(letter){
			//concatenating an empty string to the letter object results
			//in JavaScript automatically calling Letter's 'toString' 
			//method and then appending the returned string to the empty
			//string
			stringOutput += letter + "";
		});
		return stringOutput;
	};
	this.guessedLetter = function(guessedLetterCharacter){
		this.letterArray.forEach(function(letter){
			letter.checkGuessedLetter(guessedLetterCharacter);
		});
	};
};

// Word.prototype.toString = function() {
// 	console.log("in here");
// 		var stringOutput = "";
// 		this.letterArray.forEach(function(letter){
// 			//concatenating an empty string to the letter object results
// 			//in JavaScript automatically calling Letter's 'toString' 
// 			//method and then appending the returned string to the empty
// 			//string
// 			stringOutput += letter + "";
// 			console.log("letter: " + letter);
// 		});
// 		return stringOutput;
// 	};

module.exports = Word;