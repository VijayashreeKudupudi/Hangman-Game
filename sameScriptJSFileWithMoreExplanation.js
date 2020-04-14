const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

//Each time we come to the game it should load a word and
//we dont want the same word every time(no fun). So u can
//have an array and u can fetch request to some kind of back
//end database of word.
const words = ['application', 'programming', 'interface', 'wizard'];

//To get random words from word array
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);

//const correctLetters = ['w','i','z','a','r', 'd']; // just to test innerWord we used this hardcoding
const correctLetters = [];
const wrongLetters = [];

//Show the hidden word
function displayWord() {
    //we're doing dynamic stuff here, we're goona take the 
    //selected word like 'application', 'programming', and so on
    //we're turning it into an array bcoz we need to actually
    //map through it and return either a letter or a blank
    //empty string. So to turn a string into an array we use
    //split() methods. spliting by letter, so basically we're
    //ating a string and turning it into an array where each
    //letter is an item in the array. after that u can map through
    //sice its an array
     wordElement.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `).join('')
        }
     `;
     //console.log(wordElement.innerText);
     //characters will be shown vertically bcoz there is a new line character after each of these
     
     //So to remove new line character after every charatcer,
     const innerWord = wordElement.innerText.replace(/\n/g, '');
     //replacing /n with '' globally
     //console.log(innerWord);

     if(innerWord === selectedWord) {
         finalMessage.innerText = 'Congratulations You won!';
        popup.style.display = 'flex';
        }

}
//in map, for each letter we're gonna go head & return a an 
//element with a span, class of letter. and inside span we 
//want correctLetters bcoz any letter that we add that are 
//correct will be in this array and we want to check to see 
//if they're in there, so if this in there we'll use the 
//includes method. So if its included we want to show letter else ''
//and now to complete we need to turn it bacl into a string
//bcoz right now its still an array n we do that with the 
//join() method by just passing ''

//in short: we're setting the innerHTML of wordElement
// to the selected word, splitting into an array, mapping
//through it, seeing if the letter is included in that array
//if is we're going to output the letter, if its not just an
//empty string is outputed, then we're just simply turning
//back into a string 

//Update the wrong letters
function updateWrongLetterElement() {
    //Display wrong letters
    console.log(wrongLetters);
    wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span`)}
    `;

    //Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'nonye';
        }
    });

    //check if last
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost.';
        popup.style.display = 'flex';
    }

}
//1st line is checking an wrongletters array, if array length is greater than 0
//2nd line mapping through each elemnt of an array to display


//Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);   //removing popup after 2sec.
}

//keydown letter press
window.addEventListener('keydown', e => {
    //console.log(e.keyCode); //when u hit anything in keyboard everything has keycode 
    if(e.keyCode >= 65 && e.keyCode <= 90) {    //work only when u hit chatacters
        const letter = e.key;   //gives the key entered

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterElement();
            } else {
                showNotification();
            }
        }
    }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty array
    correctLetters.splice(0);
    wrongLetters.splice(0);

    //Agin setting the game by random words
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    //cleanup the wrong letters
    updateWrongLetterElement();

    //hide the popup
    popup.style.display = 'none';

})

displayWord();