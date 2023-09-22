var currentPlayer = 'X';

function makeMove(cell) {
    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}
