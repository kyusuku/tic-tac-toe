const board = document.querySelector('.board');
const result = document.querySelector('.result');
const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('.closeBtn');
const newGameBtn = document.querySelector('.newGameBtn');

let Gameboard = (function() {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    return {
        addX: function(pos) {
            gameboard[pos] = 'X';
        },
        addO: function(pos) {
            gameboard[pos] = 'O';
        },
        checkWin: function() {
            if (gameboard[0] === 'X' && gameboard[1] === 'X' && gameboard[2] === 'X' ||
                gameboard[3] === 'X' && gameboard[4] === 'X' && gameboard[5] === 'X' ||
                gameboard[6] === 'X' && gameboard[7] === 'X' && gameboard[8] === 'X' ||
                gameboard[0] === 'X' && gameboard[3] === 'X' && gameboard[6] === 'X' ||
                gameboard[1] === 'X' && gameboard[4] === 'X' && gameboard[7] === 'X' ||
                gameboard[2] === 'X' && gameboard[5] === 'X' && gameboard[8] === 'X' ||
                gameboard[0] === 'X' && gameboard[4] === 'X' && gameboard[8] === 'X' ||
                gameboard[2] === 'X' && gameboard[4] === 'X' && gameboard[6] === 'X'
            ) {
                result.textContent = 'X wins!';
                dialog.showModal();
                gameOver = true;
            } else if (gameboard[0] === 'O' && gameboard[1] === 'O' && gameboard[2] === 'O' ||
                gameboard[3] === 'O' && gameboard[4] === 'O' && gameboard[5] === 'O' ||
                gameboard[6] === 'O' && gameboard[7] === 'O' && gameboard[8] === 'O' ||
                gameboard[0] === 'O' && gameboard[3] === 'O' && gameboard[6] === 'O' ||
                gameboard[1] === 'O' && gameboard[4] === 'O' && gameboard[7] === 'O' ||
                gameboard[2] === 'O' && gameboard[5] === 'O' && gameboard[8] === 'O' ||
                gameboard[0] === 'O' && gameboard[4] === 'O' && gameboard[8] === 'O' ||
                gameboard[2] === 'O' && gameboard[4] === 'O' && gameboard[6] === 'O'
            ) {
                result.textContent = 'O wins!';
                dialog.showModal();
                gameOver = true;
            } else if (!gameboard.includes('')) {
                result.textContent = "It's a draw!";
                dialog.showModal();
                gameOver = true;
            }
        },
        updateBoard: function() {
            for (let i = 0; i < 9; i++) {
                let updateCell = document.querySelector(`[data-index='${i}']`);
                if (updateCell) {
                    updateCell.textContent = gameboard[i];
                }
            }
        },
        clearBoard: function() {
            for (let i = 0; i < 9; i++) {
                let updateCell = document.querySelector(`[data-index='${i}']`);
                if (updateCell) {
                    updateCell.textContent = '';
                    gameboard[i] = '';
                }
            }
        }
    }
})();

let turn = 1;
let gameOver = false;

board.addEventListener('click', (e) => {
    let cell = e.target;

    if (cell.textContent === '' && cell.className === 'cell') {
        if (!gameOver) {
            if (turn % 2 === 0) {
                Gameboard.addO(Number(cell.getAttribute('data-index')));
            } else {
                Gameboard.addX(Number(cell.getAttribute('data-index')));
            }
            Gameboard.updateBoard();
            Gameboard.checkWin();
            ++turn;
        }
    }
});

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

newGameBtn.addEventListener('click', () => {
    turn = 1;
    gameOver = false;
    Gameboard.clearBoard();
});