const fs = require("fs");
const Othello = require('othello-danyo');
const othello = new Othello();

const printBoard = board => console.log(
    board.map(row => row.map(e => ".bw"[e]).join('')).join('\n')
);

const printStats = board => {
    printBoard(board);
    console.log("White:", othello.score(board, 1));
    console.log("Black:", othello.score(board, 2));
}

// Train
const train = () => {
    const [qTableWhite, qTableBlack] = othello.train(othello.board, 2000);
    fs.writeFile("qTableWhite.json", JSON.stringify(qTableWhite, null, 4), "utf8", (err, data) => {
        if (err) console.error("Unable to write qTableWhite to JSON file");
        if (data) console.log("Successfully wrote qTableWhite to JSON file");
    });
    fs.writeFile("qTableBlack.json", JSON.stringify(qTableBlack, null, 4), "utf8", (err, data) => {
        if (err) console.error("Unable to write qTableBlack to JSON file");
        if (data) console.log("Successfully wrote qTableBlack to JSON file");
    });
};

const test = () => {
    fs.readFile("tests/qTableWhite.json", "utf8", (err1, qTableWhite) => {
        if (err1) console.error("Unable to read qTableWhite.json");

        fs.readFile("tests/qTableBlack.json", "utf8", (err2, qTableBlack) => {
            if (err2) console.error("Unable to read qTableBlack.json");

            let currPlayer = 1;
            while (true) {
                console.log("Current player:", currPlayer === 1 ? "Black" : "White");
                printStats(othello.board);
                
                // Get Q values
                const prevState = othello.fen(othello.board, currPlayer);
                const qValues = (currPlayer === 2 ? qTableWhite[prevState] : qTableBlack[prevState]) || {};
                const moves = othello.getValidMoves(othello.board, currPlayer);

                if (!moves.length) {
                    console.warn("No valid moves for ", currPlayer);
                    break;
                }

                // Exploration: Random move with probability epsilon
                const epsilon = 0.1;
                const randomIndex = Math.floor(Math.random() * moves.length);
                const randomMove = moves[randomIndex];
                const bestMove = moves.reduce((best, move) => (qValues[move] || 0) > (qValues[best] || 0) ? move : best);
                const [selectedRow, selectedCol] = Math.random() < epsilon ? randomMove : bestMove;

                othello.makeMove(othello.board, selectedRow, selectedCol, currPlayer);
                console.log("Move played: (", selectedRow, ",", selectedCol, ")");

                currPlayer = currPlayer === 1 ? 2 : 1;

                console.log();
            }
        });
    });
};

test();