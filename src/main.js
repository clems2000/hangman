const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function promptInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

console.log("H A N G M A N // 8 attempts");
let won = 0;
let lost = 0;

async function go(action) {
    switch (action) {
        case "play":
            let array = ["python", "java", "swift", "javascript"];

        function getRandomIndex() {
            return Math.floor(Math.random() * array.length);
        }

            let chosenWord = array[getRandomIndex()];
            const wordArray = chosenWord.split("");
            const wordBooleanArray = createBooleanArray();
            const alphabetArray = createAlphabetArray();

        function createAlphabetArray() {
            const array = [];
            for (let i = 0; i < 26; i++) {
                array[i] = false;
            }
            return array;
        }

        function createBooleanArray() {
            const array = [];
            for (let i = 0; i < chosenWord.length; i++) {
                array[i] = false;
            }
            return array;
        }

        function printGuessedWord() {
            let printing = "";
            for (let i = 0; i < chosenWord.length; i++) {
                if (wordBooleanArray[i]) {
                    printing += chosenWord[i];
                } else {
                    printing += "-";
                }
            }
            console.log(printing);
        }

            let attempts = 8;

        function hasLetterBeenGuessed(letter) {
            return alphabetArray[letter.charCodeAt(0) - 97];
        }

        function letterHasBeenGuessed(letter) {
            alphabetArray[letter.charCodeAt(0) - 97] = true;
        }

        function letterInWord(letter) {
            if (wordArray.includes(letter) && !hasLetterBeenGuessed(letter)) {
                letterHasBeenGuessed(letter);
                let index = wordArray.indexOf(letter);
                wordBooleanArray[index] = true;

                let letterTwice = wordArray.includes(letter, index + 1);
                while (letterTwice) {
                    index = wordArray.indexOf(letter, index + 1);
                    wordBooleanArray[index] = true;
                    letterTwice = wordArray.includes(letter, index + 1);
                }
            } else {
                if (hasLetterBeenGuessed(letter) || wordArray.includes(letter)) {
                    console.log("You've already guessed this letter.");
                } else {
                    attempts--;
                    console.log("That letter doesn't appear in the word. # " + attempts + " attempts");
                    letterHasBeenGuessed(letter);
                }
            }
        }

        async function getWord() {
            let letter;
            do {
                letter = await promptInput("Input a letter: ");
                if (letter.length !== 1) {
                    console.log("Please, input a single letter.");
                } else if (!/^[a-z]$/.test(letter)) {
                    console.log("Please, enter a lowercase letter from the English alphabet.");
                }
            } while (letter.length !== 1 || !/^[a-z]$/.test(letter));
            return letter;
        }

        function isWordCompleted() {
            const isAllTrue = wordBooleanArray.every((bool) => bool);
            if (attempts === 0 || isAllTrue) {
                if (isAllTrue) {
                    console.log(chosenWord);
                    console.log("You guessed the word " + chosenWord + "!");
                    console.log("You survived!");
                    won++;
                } else {
                    console.log("You lost!");
                    lost++;
                }
            }
            return isAllTrue;
        }

            while (!isWordCompleted() && attempts > 0) {
                console.log("");
                printGuessedWord();
                const letter = await getWord();
                letterInWord(letter);
            }
            break;

        case "results":
            console.log("You won: " + won + " times.");
            console.log("You lost: " + lost + " times.");
            break;

        case "exit":
            rl.close();
            return;

        default:
            console.log("This was not an option.");
            break;
    }
}

(async () => {
    let action;
    do {
        action = await promptInput(
            'Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: '
        );
        await go(action);
    } while (action !== "exit");
})();
