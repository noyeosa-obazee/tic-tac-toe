const gameSquares = [...document.querySelectorAll('.game-square')]
const domGameBoard = document.querySelector('.game-board')
const xButton = document.querySelector('.x-button')
const oButton = document.querySelector('.o-button')
const pathChooser = document.querySelector('.button-arranger')
const playerOne = document.querySelector('#player-one')
const playerTwo = document.querySelector('#player-two')
const xPlayer = document.querySelector('.x-player')
const oPlayer = document.querySelector('.o-player')
const startButton = document.querySelector('.start-game-btn')

let ticTacArr = [[], 
                 [],
                 []]
let pOneMarker = 'x'
let pTwoMarker = 'o'

function createPlayer (name) {
    let marker = ''
    const selections = []
    const assignSelection = function () {

    }
    let isPlayerTurn = false;
    let score = 0
    const increaseScore = function () {
        score++
    }

    return { name, marker, selections, assignSelection, score, increaseScore, isPlayerTurn }
}

xButton.addEventListener('click', function() {
if(xPlayer.textContent.includes('1')) {
    xPlayer.textContent = 'Player 2: '
    oPlayer.textContent = 'Player 1: '
     pOneMarker = 'o'
     pTwoMarker = 'x'
}

else {
    xPlayer.textContent = 'Player 1: '
    oPlayer.textContent = 'Player 2: '
    pOneMarker = 'x'
    pTwoMarker = 'o'
}
})

oButton.addEventListener('click', function() {
  if(xPlayer.textContent.includes('1')) {
    xPlayer.textContent = 'Player 2: '
    oPlayer.textContent = 'Player 1: '
}

else {
     xPlayer.textContent = 'Player 1: '
    oPlayer.textContent = 'Player 2: '
}
})

startButton.addEventListener('click', function () {
    const player1 = createPlayer(playerOne.value)
    const player2 = createPlayer(playerTwo.value)
    player1.marker = pOneMarker
    player2.marker = pTwoMarker
    player1.isPlayerTurn = true
    playGame(player1,player2)
})

function playGame(player, nextPlayer) {
    for (let i = 0; i < gameSquares.length; i++) {
        const square = gameSquares[i];
        square.addEventListener('click', function () {
            if(player.isPlayerTurn) player.selections[i] = player.marker
            else nextPlayer.selections[i] = nextPlayer.marker
            player.isPlayerTurn = !player.isPlayerTurn
             console.log(player.selections)
    console.log(nextPlayer.selections)
        })
    }
   

}

function getGameResult(gameboard) {
    for(const arr of gameboard) {
        if(arr.every(e => e === arr[0])) return `${arr[0]} wins!`
    }

    const [arr1, arr2, arr3] = gameboard
    if (arr1[0] === arr2[0] && arr2[0] === arr3[0]) return `${arr1[0]} wins!`
    else if (arr1[1] === arr2[1] && arr2[1] === arr3[1]) return `${arr1[1]} wins!`
    else if (arr1[2] === arr2[2] && arr2[2] === arr3[2]) return `${arr1[2]} wins!`
    else if (arr1[0] === arr2[1] && arr2[1] === arr3[2]) return `${arr1[0]} wins!`
    else if (arr1[2] === arr2[1] && arr2[1] === arr3[0]) return `${arr1[2]} wins!`
    else return 'We have a tie!';
}

