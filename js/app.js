/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
               'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
               'fa fa-anchor', 'fa fa-anchor',
               'fa fa-bolt', 'fa fa-bolt',
               'fa fa-cube', 'fa fa-cube',
               'fa fa-leaf', 'fa fa-leaf',
               'fa fa-bicycle', 'fa fa-bicycle',
               'fa fa-bomb', 'fa fa-bomb',
              ];


function generateCard(card){
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //Shuffle function from http://stackoverflow.com/a/2450976

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
let moves = 0;
let movesCounter = document.querySelector('.moves');
let stars = document.querySelectorAll('.fa-star');

let seconds = 0;
let timer = document.querySelector('.timer');
let time;

function initGame(){
        let deck = document.querySelector('.deck');
        let cardHTML = shuffle(cards).map(function(card){
            return generateCard(card);
        });
        time = setInterval (function(){
            seconds++
            timer.innerHTML = `${seconds} seconds`;
        }, 1000);

        moves = 0;
        movesCounter.innerText = moves;
        deck.innerHTML = cardHTML.join('');
}

// start the game.
initGame();

// restart game.
function restart(){
    location.reload();
}



let allCards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];
let moveCounter = document.querySelector('.moves');


// star reting count.
let finalStars;
function rating(){
    if (moves > 8){
        for (i = 0; i < 3; i++){
            if (i > 1){
                stars[i].style.visibility = "hidden";
                finalStars = 2;
            }
            
        }
    }
     if (moves > 12){
        for (i = 0; i < 3; i++){
            if (i > 0){
                stars[i].style.visibility = "hidden";
                finalStars = 1;
            }
            
        }
    }
}
    
let modal = document.getElementById('myModal');
let playAgain = document.getElementById('play-again');
let closeModal = document.getElementById('close');
let message = document.getElementById('congratulations-message');
let starsRating = document.querySelector('.stars').innerHTML;


// Modal Popup.
function modalPopup(){
    message.innerText = `CONGRRATULATIONS!!!, It takes you ${moves} moves to win, in ${seconds} seconds. You have collect ${finalStars} stars!`;
    modal.style.display = "block";
    
    closeModal.onclick = function(){
        modal.style.display = "none";
     }

    playAgain.onclick = function(){
        restart();
    }
    window.onclick = function(event){
        if (event.target == modal){
            modal.style.display = "none";
        }
    }
}


allCards.forEach(function(card) {
     card.addEventListener('click', function(e){

         if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            
            openCards.push(card);
            card.classList.add('open','show');

            // Counting moves and rating.
            if (openCards.length == 2 ) {
                moves++;
                movesCounter.innerText = moves;
                rating();

                // Check for matching.
                if (openCards[0].dataset.card == openCards[1].dataset.card){

                // if two cards matched
                openCards[0].classList.add('match');
                openCards[0].classList.remove('open', 'show');
                    
       
                openCards[1].classList.add('match');
                openCards[1].classList.remove('open', 'show'); 
                // update the mached cards array.
                matchedCards.push(card);   
                
                
                // reset the open cards array.
                openCards = [];

                // close cards if no match.
                } else {
               setTimeout(function(){
                   openCards.forEach(function(card){
                       card.classList.remove('open', 'show');
                   });
                   openCards = [];
               }, 1000);
            }

            // Congratulations message.
            
            if (matchedCards.length == 8){
                
                clearInterval(time);
                
                modalPopup();
                
            }

        }
        }
                
    });
});

 
