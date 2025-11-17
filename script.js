const gameSquares = [...document.querySelectorAll('.game-square')]
const domGameBoard = document.querySelector('.game-board')
const xButton = document.querySelector('.x-button')
const oButton = document.querySelector('.o-button')
const pathChooser = document.querySelector('.button-arranger')

let chosenPath = 'x';
let ticTacArr = [[], 
                 [],
                 []]
let holdingArr = []
let isComputerTurn = false

xButton.addEventListener('click', function() {
    chosenPath = 'x'
    playGame()
})

oButton.addEventListener('click', function() {
    chosenPath = 'o'
    playGame()
})

function playGame() {
for (let i = 0; i < gameSquares.length; i++) {
        const square = gameSquares[i]
        square.addEventListener('click', function() {

            if(!gameSquares.every((s) => s.textContent.length > 0) && !isComputerTurn) {
                holdingArr[i] = chosenPath
                isComputerTurn = true
                setTimeout(computerPlay, 3000);
                

            }
             console.log(holdingArr)
        })
       
    }
}

function computerPlay() {
    const possibleIndexes = [0,1,2,3,4,5,6,7,8]
    const takenIndexes = []
for(let i = 0; i < holdingArr.length; i++) {
    if(i in holdingArr) takenIndexes.push(i)
}

const notTakenIndexes = possibleIndexes.filter(e => !takenIndexes.includes(e))

const randomIndex = notTakenIndexes[(Math.floor(Math.random() * notTakenIndexes.length))];
holdingArr[randomIndex] = 'o';
isComputerTurn = false
console.log(holdingArr)
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