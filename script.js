const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) 
{
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) 
    {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() 
{
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) 
    {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') 
        {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) 
        {
            roundWon = true;
            break;
        }
    }

    if (roundWon) 
    {
        messageDisplay.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) 
    {
        messageDisplay.textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() 
{
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    messageDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);