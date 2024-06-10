const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleClick(event) {
    const cellIndex = parseInt(event.target.dataset.cell);

    if (gameBoard[cellIndex] === '') {
        markCell(cellIndex);
        switchPlayer();
        checkWinner();
    }
}

function markCell(cellIndex) {
    gameBoard[cellIndex] = currentPlayer;
    const cell = cells[cellIndex];
    cell.classList.add('marked');
    cell.textContent = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
            declareWinner(currentPlayer);
            return;
        }
    }

    // Check for draw
    if (!gameBoard.includes('')) {
        declareWinner('Draw');
    }
}

function declareWinner(winner) {
    status.textContent = `Winner: ${winner}`;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
