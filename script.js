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
const playerScoreContainer = document.querySelector('.player-score-div')
const playerOneScore = document.querySelector('.p-one-score')
const playerTwoScore = document.querySelector('.p-two-score')
const newGameButton = document.querySelector('.new-game-btn')
const error = document.querySelector('.error')
const turnDisplay = document.querySelector('.turn-display')

let pOneMarker = 'x'
let pTwoMarker = 'o'
let gameOver = false
let gameStart;
let p1Score = 0
let p2Score = 0

function createPlayer (name) {
    let marker = ''
    const selections = []
  function assignSelection (index, currentMarker) {
      selections[index] = currentMarker
    }
    let isPlayerTurn = false;
    let score = 0
    function getScore() {
        return score
    }
    function increaseScore() {
        score++
    }

    return { name, marker, selections, assignSelection, getScore, increaseScore, isPlayerTurn }
}

xButton.addEventListener('click', function() {
    if(!gameStart) {
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
}
})

oButton.addEventListener('click', function() { 
    if (!gameStart) {
  if(xPlayer.textContent.includes('1')) {
    xPlayer.textContent = 'Player 2: '
    oPlayer.textContent = 'Player 1: '
}

else {
    xPlayer.textContent = 'Player 1: '
    oPlayer.textContent = 'Player 2: '
}
    }
})

startButton.addEventListener('click', function () {
    if ((playerOne.value.trim() !== '') && (playerTwo.value.trim() !== '')) {
    error.style.display = 'none'

    if(startButton.textContent !== 'Restart Game') {
    startButton.disabled = true
    gameStart = true
    playerOne.readOnly = true
    playerTwo.readOnly = true
    const player1 = createPlayer(playerOne.value)
    const player2 = createPlayer(playerTwo.value)
    player1.marker = pOneMarker
    player2.marker = pTwoMarker
    player1.isPlayerTurn = true
    playGame(player1,player2) 
}

else {
    newGameButton.style.display = 'none'
    gameSquares.forEach(square => square.textContent = '')
    gameOver = false
    startButton.disabled = true
    const player1 = createPlayer(playerOne.value)
    const player2 = createPlayer(playerTwo.value)
    player1.marker = pOneMarker
    player2.marker = pTwoMarker
    player1.isPlayerTurn = true
    playGame(player1,player2) 
}

}

else {
        if (playerOne.value.trim() === '' && playerTwo.value.trim() === '') {
            error.style.display = 'inline'
            error.textContent = 'Enter player names'
            playerOne.focus()
        }

        else if (playerOne.value.trim() === '') {
            error.style.display = 'inline'
            error.textContent = 'Player 1 name cannot be empty'
            playerOne.focus()
        }

        else {
            error.style.display = 'inline'
            error.textContent = 'Player 2 name cannot be empty'
            playerTwo.focus()
        }
    }
})

newGameButton.addEventListener('click', function() {
    gameSquares.forEach(square => square.textContent = '')
    playerOne.readOnly = false
    playerTwo.readOnly = false
    playerOne.value = ''
    playerTwo.value = ''
    startButton.textContent = 'Start Game'
    startButton.disabled = false
    gameStart = false
    newGameButton.style.display = 'none'
    gameOver = false
    p1Score = 0;
    p2Score = 0;
    playerScoreContainer.style.display = 'none'
    gameResult.textContent = ''
    xPlayer.textContent = 'Player 1: '
    oPlayer.textContent = 'Player 2: '
    playerOne.focus()
})

playerOne.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        playerTwo.focus()
    }
})

playerTwo.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        playerTwo.blur()
    }
})

function playGame(player, nextPlayer) {
   
    for (let i = 0; i < gameSquares.length; i++) {
        const square = gameSquares[i];

        turnDisplay.style.display = 'inline'
        turnDisplay.textContent = 'turn: ' + pOneMarker.toUpperCase()
 
        square.addEventListener('click', function () {
            if (!gameOver && !square.textContent) {
            if(player.isPlayerTurn) {
                if (!(i in nextPlayer.selections) || !(nextPlayer.selections[i])) player.assignSelection(i, player.marker)
                    turnDisplay.textContent = 'turn: ' + nextPlayer.marker.toUpperCase()
            }
            else {
                if(!(i in player.selections) || !(player.selections[i])) nextPlayer.assignSelection(i, nextPlayer.marker)
                    turnDisplay.textContent = 'turn: ' + player.marker.toUpperCase()
            }

            player.isPlayerTurn = !player.isPlayerTurn
            gameResult.textContent = (getGameResult(player.selections, nextPlayer.selections)[0] === player.marker ? `Player 1 (${player.name}) wins! 🎉` : 
            getGameResult(player.selections, nextPlayer.selections)[0] === nextPlayer.marker ? `Player 2 (${nextPlayer.name}) wins! 🎉` : getGameResult(player.selections, nextPlayer.selections))
            populateGameboard(player.selections, nextPlayer.selections)

            if(gameResult.textContent) {
                player.selections = []
                nextPlayer.selections = []
                playerScoreContainer.style.display = 'inline'
                if (gameResult.textContent.includes(player.name)) {
                    player.increaseScore()
                    p1Score += player.getScore()
                }
                else if (gameResult.textContent.includes(nextPlayer.name)) {
                    nextPlayer.increaseScore()
                    p2Score += nextPlayer.getScore()
                    }
                const score1 = document.createElement('span')
                score1.textContent = p1Score
                score1.classList.add('score')
                const score2 = document.createElement('span')
                score2.textContent = p2Score
                score2.classList.add('score')
                playerOneScore.textContent = `Player 1 (${player.name}) score: `
                playerTwoScore.textContent = `Player 2 (${nextPlayer.name}) score: `
                playerOneScore.appendChild(score1)
                playerTwoScore.appendChild(score2)
            }}

})
    }}




function populateGameboard(boardInstanceOne, boardInstanceTwo) {
for (let i = 0; i < gameSquares.length; i ++) {
    if (boardInstanceOne[i] && i in boardInstanceOne) gameSquares[i].textContent = boardInstanceOne[i]
    else if (boardInstanceTwo[i] && i in boardInstanceTwo) gameSquares[i].textContent = boardInstanceTwo[i]
}
}

function endGame() {
    gameOver = true
    startButton.textContent = 'Restart Game'
    startButton.disabled = false
    newGameButton.style.display = 'inline'
    turnDisplay.style.display = 'none'
    turnDisplay.textContent = ''
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

    const [arr1, arr2, arr3] = gameboard
    if ((arr1[0] && arr2[0] && arr3[0]) && arr1[0] === arr2[0] && arr2[0] === arr3[0])
        { message = `${arr1[0]} wins!` 
         
        }
    else if ((arr1[1] && arr2[1] && arr3[1]) && arr1[1] === arr2[1] && arr2[1] === arr3[1]){
         message = `${arr1[1]} wins!`

    }
    else if ((arr1[2] && arr2[2] && arr3[2]) && arr1[2] === arr2[2] && arr2[2] === arr3[2]) {
        message = `${arr1[2]} wins!`
    }
    else if ((arr1[0] && arr2[1] && arr3[2]) && arr1[0] === arr2[1] && arr2[1] === arr3[2]){
         message = `${arr1[0]} wins!`

        }
    else if ((arr1[2] && arr2[1] && arr3[0]) && arr1[2] === arr2[1] && arr2[1] === arr3[0]) {
        message = `${arr1[2]} wins!`
    }
    else if (gameArr.filter(element => element === 'x' || element === 'o').length === gameArr.length) {
        message = 'It\'s a tie!'
        
    }

    if (message) endGame()

    return message;
}



