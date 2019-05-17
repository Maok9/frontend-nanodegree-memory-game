

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let card = document.querySelectorAll('.card');
let cardArr = Array.from(card);
let openCard = []
let moves = document.querySelector('.moves');
let move = 0;
let starsNum = 3;
let timer;
let Seconds = 0;
let active = false;
let match = 0;
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');



gameStart();

// Game start from here
function gameStart() {
    shuffleCards();
    showCards();  // display the card's symbol
    timer = setInterval(countTimer, 1000);
    deck.addEventListener('click', function (event) {
        let target = event.target;


        if (target.classList.value === "card" && openCard.length < 2) {
            active = true;
            showCard(target); // add the card to a *list* of "open" cards

            if (openCard.length === 2) {  //  if the list already has another card

                if (openCard[0].firstElementChild.className === openCard[1].firstElementChild.className) { // check to see if the two cards match  
                    matchCards(); // if the cards do match, lock the cards in the open position
                    moveCounter(); // increment the move counter and display it on the page
                    hideStars(); // track number of stars based on number of moves 
                    checkNumberOfMatchCards();
                } else {
                    notMatch(); // if the cards do not match, remove the cards from the list and hide the card's symbol
                    moveCounter(); // increment the move counter and display it on the page
                    hideStars(); // track number of stars based on number of moves
                }
            }
        }

    });
}

// Restart
restart.addEventListener('click', function () {
    let card = document.querySelectorAll('.card');
    let cardArr = Array.from(card); // from https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/

    for (let i = 0; i < 16; i++) {
        cardArr[i].classList.remove('open', 'show', 'match');
    }
    shuffleCards();
    showCards();
    move = 0;
    moves.innerHTML = move;
    showStars();
    starsNum = 3;
    active = false;
    document.getElementById("timer").innerHTML = "00" + ":" + "00";
    openCard = [];

});

function showCard(target) {
    target.classList.add('open');
    target.classList.add('show');
    openCard.push(target);
}

function matchCards() {
    setTimeout(function () {
        openCard[0].classList.add('match');
        openCard[1].classList.add('match');
        openCard = [];
    }, 150)
}

function notMatch() {
    setTimeout(function () {
        openCard[0].classList.remove('open', 'show');
        openCard[1].classList.remove('open', 'show');
        openCard = [];
    }, 700)
}

function moveCounter() {
    move = move + 1;
    moves.innerHTML = move;
}

function shuffleCards() {
    let shu = shuffle(cardArr);
    for (card of shu) {
        card.classList = 'card';
        deck.appendChild(card);
    }
}

function showCards() {
    for (let i = 0; i < 16; i++) {
        cardArr[i].classList.add('open', 'show');
    }
    setTimeout(function () {
        for (let i = 0; i < 16; i++) {
            cardArr[i].classList.remove('open', 'show');
        }
    }, 1000);
}

function hideStars() {
    let stars = document.querySelectorAll('.fa-star');
    if (move === 14) {
        stars[0].style.display = 'none';
        starsNum--;
    }
    if (move === 18) {
        stars[1].style.display = 'none';
        starsNum--;
    }
}

function showStars() {
    let stars = document.querySelectorAll('.fa-star');
    for (star of stars) {
        star.style.display = 'inline-block';
    }
}

function countTimer() {

    if (active) {
        let timer = document.getElementById("timer").innerHTML;
        let arr = timer.split(":");
        let minute = arr[0];
        let second = arr[1];
        ++second;
        if (second === 59) {
            minute++;
            second = 0;
        }
        if (second < 10) {
            second = "0" + second;
        }
        document.getElementById("timer").innerHTML = minute + ":" + second;
    }
}

function checkNumberOfMatchCards() {
    match++;
    if (match === 8) {
        endGame();
    }
}

function endGame() {
    let popup = document.querySelector('.modal');
    popup.style.display = 'flex';
    match=0;

    active = false; // to stop timer 
    let endTime = document.getElementById("timer").innerHTML;
    let endArr = endTime.split(":");
    let endMinute = endArr[0];
    let endSecond = endArr[1];
    document.querySelector('.mTime').innerHTML = endMinute + ":" + endSecond;

    document.querySelector('.mStar').innerHTML = starsNum;
    document.querySelector('.mMoves').innerHTML = move;


}
function replay() {
    let popup = document.querySelector('.modal');
    popup.style.display = 'none';
    let card = document.querySelectorAll('.card');
    let cardArr = Array.from(card); // from https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/

    for (let i = 0; i < 16; i++) {
        cardArr[i].classList.remove('open', 'show', 'match');
    }
    shuffleCards();
    showCards();
    move = 0;
    moves.innerHTML = move;
    showStars();
    starsNum = 3;
    active = false;
    document.getElementById("timer").innerHTML = "00" + ":" + "00";
    openCard = [];
}
