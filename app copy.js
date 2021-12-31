//variables
const throwDice = document.querySelector('.throw-dice');
const currentScore0 = document.querySelector('#currentScore-0');
const currentScore1 = document.querySelector('#currentScore-1');
const diceImg = document.querySelector('.dice-image');
const holdScore = document.querySelector('.hold-score');
const newGame = document.querySelector('.new-game');
const buttons = document.querySelector('.buttons');
const player1ok = document.querySelector('.name-player-1 button')
const player2ok = document.querySelector('.name-player-2 button')
const namePlayer1 = document.querySelector('.name-player-1');
const namePlayer2 = document.querySelector('.name-player-2');
const namePlayerInput1 = document.querySelector('.name-player-1 input')
const namePlayerInput2 = document.querySelector('.name-player-2 input')
const modal = document.querySelector('.modal')
let totalScore, roundScore, activePlayer, dice;

// 1.player names
buttons.style.visibility = "hidden"
//1.1 PLayer 1
namePlayer1.addEventListener('input', (e) => {
    var inputName = e.target.value;
    const player1Name = document.querySelector('#name-0 span')
    player1Name.textContent = inputName
    if (inputName === "") {
        namePlayerInput1.setAttribute('placeholder', "Musis vyplnit meno")
        player1ok.disabled = true
    } else {
        player1ok.disabled = false
    }
    // console.log(inputName);
})
player1ok.addEventListener('click', (e) => {
    namePlayer1.style.display = "none"
})

//1.2 PLayer 2
namePlayer2.addEventListener('input', (e) => {
    let inputName = e.target.value;
    const player2Name = document.querySelector('#name-1 span')
    player2Name.textContent = inputName
    if (inputName === "") {
        namePlayerInput2.setAttribute('placeholder', "Musis vyplnit meno")
        player2ok.disabled = true
    } else {
        player2ok.disabled = false
    }
})
player2ok.addEventListener('click', () => {
    namePlayer2.style.display = "none"
    buttons.style.visibility = "visible"
})

// 2. reset and removing dice
function startGame() {
    totalScore = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('#total-score-player0').textContent = 0
    document.querySelector('#total-score-player1').textContent = 0
    currentScore0.textContent = 0
    currentScore1.textContent = 0
    diceImg .style.display = "none"

    throwDice.disabled = false
    holdScore.disabled = false
}
startGame();


//FIRST BUTTON ROLL THE DICE
throwDice.addEventListener('click', function () {
    let dice = Math.floor(Math.random() * 6) + 1
    // random numbers from 1 to 6
    //change  src atribute imgs name is 1.jpg, 2.jpg
    diceImg.src = `img/${dice}.png`
    document.querySelector('.dice-image').style.display = "block"
    //if I throw 1 the score is reset
    if (dice == 1) {
        nextPlayer();
    } else {
        //sum numbers on dice
        roundScore += dice
        //toggle current score to other player
        let currentScoreAll = document.querySelector('#currentScore-' + activePlayer)
        currentScoreAll.textContent = roundScore
    }

});
let name0 = document.querySelector('#name-0')
let name1 = document.querySelector('#name-1')
//switch to other player
function nextPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    roundScore = 0
    currentScore0.textContent = 0
    currentScore1.textContent = 0

    name1.classList.toggle('active')
    name0.classList.toggle('active')
}
//SECOND BUTTON HOLD SCORE
let paragraph = document.createElement("p")
holdScore.addEventListener('click', () => {
    totalScore[activePlayer] += roundScore
    let players = document.querySelector("#total-score-player" + activePlayer)
    players.textContent = totalScore[activePlayer]

    if (totalScore[activePlayer] >= 20) {
        
        modal.style.display = "block"
        paragraph.classList.add('text-in-modal')
        paragraph.innerHTML = `<b>Vyhral hráč číslo ${activePlayer + 1} <b>`
        modal.appendChild(paragraph)
        document.querySelector('.dice-image').style.display = "none"
        throwDice.disabled = true
        holdScore.disabled = true
    }
    nextPlayer()
    console.log(totalScore);
})
//THIRD BUTTON NEW GAME
newGame.addEventListener('click', () => {
    startGame();
    name0.classList.add('active')
    name1.classList.remove('active')
    document.querySelector('.modal').style.display = "none"
    paragraph.remove()
})

//rotacia obrazkov pri hodeni kockou
// //Ja tu mam pole cisiel, z ktorych sa nahodne vybera. V tvojom pripade to budu obrazky.
// let numbers = [
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6'
//   ];

//   button.addEventListener('click',()=>{
//     //casovac, ktry kazdu sekund spusta funkciu rollTheDice
//     let timer = setInterval(rollTheDice,1000);

//     //Kazdu sekundu teda vygeneruje nahodne cislo od 0 do 5 a vyberie z pola cislo, ktore je na tej nahodne vygenerovanej hodnote. Toto cislo vkladam do paragraphu.
//     function rollTheDice(){
//       let randomNum = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
//       paragraph.innerText = numbers[randomNum];
//     }

//     //Po 5 sekundach vypne rotovanie kocky
//     setTimeout(function(){ 
//       clearInterval(timer)
//     }, 5000);
//   })

