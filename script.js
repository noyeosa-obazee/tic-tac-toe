const gameSquares = [...document.querySelectorAll('.game-square')]
const domGameBoard = document.querySelector('.game-board')
const xButton = document.querySelector('.x-button')
const oButton = document.querySelector('.o-button')
const pathChooser = document.querySelector('.button-arranger')

let ticTacArr = [[], 
                 [],
                 []]

function createPlayer (name) {
    let marker = ''
    const playerSelections = []
    const assignPlayerSelection = function () {

    }
    let isPlayerTurn = false;
    let score = 0
    const increaseScore = function () {
        score++
    }

    return { name, marker, playerSelections, assignPlayerSelection, score, increaseScore, isPlayerTurn }
}

xButton.addEventListener('click', function() {
   
})

oButton.addEventListener('click', function() {
   
})

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

