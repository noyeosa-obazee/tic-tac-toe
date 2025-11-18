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
const gameResult = document.querySelector('.game-result')

let pOneMarker = 'x'
let pTwoMarker = 'o'
let gameOver = false

function createPlayer (name) {
    let marker = ''
    const selections = []
  function assignSelection (index, currentMarker) {
      selections[index] = currentMarker
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
            if (!gameOver) {
            if(player.isPlayerTurn) {
                if (!(i in nextPlayer.selections) || !(nextPlayer.selections[i])) player.assignSelection(i, player.marker)
            }
            else {
                if(!(i in player.selections) || !(player.selections[i])) nextPlayer.assignSelection(i, nextPlayer.marker)
            }
            player.isPlayerTurn = !player.isPlayerTurn
            gameResult.textContent = getGameResult(player.selections, nextPlayer.selections)
             console.log(player.selections)
    console.log(nextPlayer.selections)
populateGameboard(player.selections, nextPlayer.selections)
        }
}
        )
    }
   
    }


function populateGameboard(boardInstanceOne, boardInstanceTwo) {

for (let i = 0; i < gameSquares.length; i ++) {
    
    if (boardInstanceOne[i] && i in boardInstanceOne) gameSquares[i].textContent = boardInstanceOne[i]
   else if (boardInstanceTwo[i] && i in boardInstanceTwo) gameSquares[i].textContent = boardInstanceTwo[i]
}
}

function getGameResult(pOneBoard, pTwoBoard) {
   let message = ''
    let gameArr = [, , , , , , , , ,]

    for (let i = 0; i < gameArr.length; i++) {
        if (i in pOneBoard && pOneBoard[i]) gameArr[i] = pOneBoard[i]
        else if (i in pTwoBoard && pTwoBoard[i]) gameArr[i] = pTwoBoard[i]
    }

    

         const gameboard = [[gameArr[0], gameArr[1], gameArr[2]], [gameArr[3], gameArr[4], gameArr[5]], [gameArr[6], gameArr[7], gameArr[8]]]
    for(const arr of gameboard) {
        if(arr.every(e => e && (e === arr[0]))) return `${arr[0]} wins!`
    }
console.log(gameArr)
console.log(gameboard)
    const [arr1, arr2, arr3] = gameboard
    if ((arr1[0] && arr2[0] && arr3[0]) && arr1[0] === arr2[0] && arr2[0] === arr3[0])
        { message = `${arr1[0]} wins!` 
         gameOver = true
        }
    else if ((arr1[1] && arr2[1] && arr3[1]) && arr1[1] === arr2[1] && arr2[1] === arr3[1]){
         message = `${arr1[1]} wins!`
         gameOver = true
    }
    else if ((arr1[2] && arr2[2] && arr3[2]) && arr1[2] === arr2[2] && arr2[2] === arr3[2]) {
        message = `${arr1[2]} wins!`
        gameOver = true
    }
    else if ((arr1[0] && arr2[1] && arr3[2]) && arr1[0] === arr2[1] && arr2[1] === arr3[2]){
         message = `${arr1[0]} wins!`
         gameOver = true
        }
    else if ((arr1[2] && arr2[1] && arr3[0]) && arr1[2] === arr2[1] && arr2[1] === arr3[0]) {
        message = `${arr1[2]} wins!`
        gameOver = true
    }
    // else return 'We have a tie!';

    return message;
}



