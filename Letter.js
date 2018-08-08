var Letter = function(letterCharacter) {
	this.letterCharacter = letterCharacter;
	this.guessedLetter = false; //by default, the letter is assumed to have not been guessed
	this.toString = function(){
		if (this.guessedLetter){
			return " " + this.letterCharacter + " ";
		} else {
			return " " + "_" + " ";
		}
	};
	this.checkGuessedLetter = function(guessedLetterCharacter) {
		if (guessedLetterCharacter === this.letterCharacter) {
			this.guessedLetter = true;
		}
	};
	this.isLetterGuessed = function() {
		return this.guessedLetter;
	};
};

// Letter.prototype.toString = function(){
// 		if (this.guessedLetter){
// 			return this.letterCharacter;
// 		} else {
// 			return "_";
// 		}
// 	};

module.exports = Letter;