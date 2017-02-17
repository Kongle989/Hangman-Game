var hangman;
var letterBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t",
    "u", "v", "w", "x", "y", "z"];
var wins = 0;
var loses = 0;
$(document).ready(function () {

    hangman = {
        wordBank: ["mickey", "donald", "goofy", "tinkerbell", "pooh", "ariel", "cinderella", "mulan",
            "simba", "woody"],

        userInput: "",

        remainingLetters: "",
        guesses: 6,
        currentWord: "",
        revealWord: "",
        // Start new game
        newGame: function () {
            // Write letter bank to page
            this.remainingLetters = letterBank.slice();
            $(".letters").html("Pick a letter<hr>");
            for (var i = 0; i < this.remainingLetters.length; i++) {
                $(".letters").append(this.remainingLetters[i] + " ");
            }
            // Select word at random and write blank spaces to page
            currentWord = "";
            var select = Math.floor(Math.random() * 10);
            $(".main").html("<img src=\"assets/images/" + this.wordBank[select] + ".jpg\">")
            revealWord = [""];
            revealWord.shift();
            currentWord = this.wordBank[select];
            $(".word").html("");
            for (var i = 0; i < currentWord.length; i++) {
                $(".word").append("_ ");
                revealWord.push("_");
            }
            this.guesses = 6;
            $(".score").html("Wins: " + wins + " Loses: " + loses + " Guesses remaining: " + this.guesses);
        },

        // Check if selected letter is part of current word
        letterExist: function () {
            if (this.remainingLetters.indexOf(userInput) == -1) {
                return;
            }
            else {
                this.letterUsed(this.remainingLetters.indexOf(userInput));
                if (currentWord.indexOf(userInput) == -1) {
                    this.guesses--;
                    $(".score").html("Wins: " + wins + " Loses: " + loses + " Guesses remaining: " + this.guesses);
                }
                else {
                    this.revealLetter();
                }
                if (this.guesses === 0) {
                    setTimeout(function () {
                    }, 1000);
                    alert("You ran out of guesses!");
                    loses++;
                    this.newGame();
                }
            }
        },

        // Remove letters used from letter bank
        letterUsed: function (index) {
            this.remainingLetters.splice(index, 1);
            $(".letters").html("Pick a letter<hr>");
            for (var i = 0; i < this.remainingLetters.length; i++) {
                $(".letters").append(this.remainingLetters[i] + " ");
            }
        },

        // Reveal letters that is correctly selected
        revealLetter: function () {
            $(".word").html("");
            for (var i = 0; i < revealWord.length; i++) {
                if (currentWord[i] === userInput) {
                    revealWord[i] = userInput;
                }
            }
            for (var i = 0; i < revealWord.length; i++) {
                $(".word").append(revealWord[i] + " ");
            }
        }
    }

    // Fill page
    hangman.newGame();
    // Eventlistener waiting for keypress
    $(document).on('keyup', function (e) {
        userInput = e.key;
        hangman.letterExist();

        setTimeout(function () {
            if (revealWord.indexOf("_") === -1) {
                alert("You won~~~~!@!~!@~!");
                wins++;
                hangman.newGame();
            }
        }, 1000);

    });
});