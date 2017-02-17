$(document).ready(function () {

    var remainingLetters =  "";


    var hangman = {
        wordBank: ["mickey", "donald", "goofy", "stitch", "tinkerbell", "pooh", "pluto", "ariel", "cinderella", "mulan", "simba", "woody"],
        letterBank: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        userInput: "",
        guesses: 6,
        currentWord: "",
        revealWord: "",
        // Start new game
        newGame: function () {
            // Write word bank to page
            remainingLetters = this.letterBank;
            $(".letters").html("Pick a letter<hr>");
            for (var i = 0; i < remainingLetters.length; i++) {
                $(".letters").append(remainingLetters[i] + " ");
            }
            // Select word at random and write blank spaces to page
            currentWord = "";
            var select = Math.floor(Math.random() * 12);
            revealWord = [""];
            revealWord.shift();
            currentWord = this.wordBank[select];
            $(".word").html("");
            for (var i = 0; i < currentWord.length; i++) {
                $(".word").append("_ ");
                revealWord.push("_");
            }
        },

        // Check if selected letter is part of current word
        letterExist: function () {
            if (remainingLetters.indexOf(userInput) == -1) {
                return;
            }
            else {
                this.letterUsed(remainingLetters.indexOf(userInput));
                if (currentWord.indexOf(userInput) == -1) {
                    this.guesses--;
                }
                else {
                    this.revealLetter();
                }
                if (this.guesses === 0) {
                    alert("You ran out of guesses!");
                    this.newGame();
                    this.guesses = 6;
                }
            }
        },
        // Remove letters used from letter bank
        letterUsed: function (index) {
            remainingLetters.splice(index, 1, " ");
            $(".letters").html("Pick a letter<hr>");
            for (var i = 0; i < remainingLetters.length; i++) {
                $(".letters").append(remainingLetters[i] + " ");
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
        console.log(currentWord);
        hangman.letterExist();
        console.log(hangman.letterBank);
        console.log(remainingLetters);

        setTimeout(function () {
            if (revealWord.indexOf("_") === -1) {
                alert("You won~~~~!@!~!@~!");
                hangman.newGame();
            }
        }, 1000);

    });
});