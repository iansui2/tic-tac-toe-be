const mongoose = require('mongoose');

const RoundSchema = new mongoose.Schema({
    board: {
        type: Array,
        default: []
    },
    player1Hits: {
        type: Array,
        default: []
    },
    player2Hits: {
        type: Array,
        default: []
    },
    player1Score: {
        type: Number,
        default: 0
    },
    player2Score: {
        type: Number,
        default: 0
    },
    round: {
        type: Number,
        default: 0
    },
    winner: {
        type: String,
        default: ""
    }
}, { _id: false });

const GameSchema = new mongoose.Schema({
    player1Name:  {
        type: String,
        default: ""
    },
    player2Name: {
        type: String,
        default: ""
    },
    player1Score: {
        type: Number,
        default: 0
    },
    player2Score: {
        type: Number,
        default: 0
    },
    rounds: {
        type: [RoundSchema],
        default: []
    },
    round: {
        type: Number,
        default: 0
    }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;