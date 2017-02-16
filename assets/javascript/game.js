var userInput = "";
var guesses = 6;
var remainingLetters = "";
var currentWord = "";

var hangman = {
    wordBank: ["mickey", "donald", "goofy", "stitch", "tinkerbell", "pooh", "pluto", "ariel", "cinderella", "mulan", "simba", "woody"],
    letterBank: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    newWord: function () {
        remainingLetters = this.letterBank;
        $(".letters").append("Pick a letter<hr>");
        for (var i = 0; i < this.letterBank.length; i++) {
            $(".letters").append(this.letterBank[i] + " ");
        }
        var select = Math.floor(Math.random() * 12);
        currentWord = this.wordBank[select];
        for (var i = 0; i < currentWord.length; i++) {
            $(".word").append("_ ");
        }
    },

    letterExist: function () {

    },

    letterUsed: function (index) {
        remainingLetters.splice(index, 1, " ");
        $(".letters").html("Pick a letter<hr>");
        for (var i = 0; i < remainingLetters.length; i++) {
            $(".letters").append(remainingLetters[i] + " ");
        }
    },

    revealLetter: function () {

    }

};


