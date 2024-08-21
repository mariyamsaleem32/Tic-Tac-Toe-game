// script.js

const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (boardState.every(cell => cell)) {
        message.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

resetGame(); // Initialize the game
