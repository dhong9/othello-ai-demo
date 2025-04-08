const Othello = require("othello-danyo");
const othello = new Othello();

const printBoard = board => console.log(
    board.map(row => row.map(e => ".bw"[e]).join('')).join('\n')
);

const printStats = board => {
    printBoard(board);
    console.log("Black:", othello.score(board, 1));
    console.log("White:", othello.score(board, 2));
}

let currPlayer = 1;
while (!othello.gameOver(othello.board)) {
    console.log("Current player:", currPlayer === 1 ? "Black" : "White");
    printStats(othello.board);

    // Make move for current player
    const [bestRow, bestCol] = othello.minimaxDecision(othello.board, currPlayer);
    othello.makeMove(othello.board, bestRow, bestCol, currPlayer);
    console.log("Move played: (", bestRow, ",", bestCol, ")");
    
    currPlayer = currPlayer === 1 ? 2 : 1;

    console.log();
}

printStats(othello.board);