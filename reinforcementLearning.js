const fs = require("fs");
const Othello = require('othello-danyo');
const othello = new Othello();

// Train
const train = () => {
    const [qTableWhite, qTableBlack] = othello.train(othello.board, 1000);
    fs.writeFile("qTableWhite.json", JSON.stringify(qTableWhite, null, 4), "utf8", (err, data) => {
        if (err) console.error("Unable to write qTableWhite to JSON file");
        if (data) console.log("Successfully wrote qTableWhite to JSON file");
    });
    fs.writeFile("qTableBlack.json", JSON.stringify(qTableBlack, null, 4), "utf8", (err, data) => {
        if (err) console.error("Unable to write qTableBlack to JSON file");
        if (data) console.log("Successfully wrote qTableBlack to JSON file");
    });
};