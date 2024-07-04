const CIRCLE_CLASS = "circle"
const X_CLASS = 'x'
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]
const restartButton = document.getElementById("restartButton")
const winningMessage = document.getElementById("winningMessage")
const cellElement = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
let circleTurn



startGame()

restartButton.addEventListener("click", startGame)

function startGame(){
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    })
    boardHover()
    winningMessage.classList.remove("show")
}

function handleClick(e){

    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    // Check for win
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        boardHover()
    }
  
    
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "Draw!"
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's " : "X's "} Win!`
    }
    winningMessage.classList.add('show')
}
function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}



function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurn(){
    circleTurn = !circleTurn
}

function boardHover(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if (circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return winningCombination.some(combination =>{
        return combination.every(index =>{
            return cellElement[index].classList.contains(currentClass)
        })
    })
}