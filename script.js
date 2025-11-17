let example = [['x', 'o', 'x'], 
               ['x', 'x', 'o'],
               ['o', 'x', 'x']]

function game (gameboard) {
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

console.log(game(example))