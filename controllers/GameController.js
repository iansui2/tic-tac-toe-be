const express = require("express");
const gameModel = require("../models/Game");

const app = express.Router();

app.get("/getGames", async (request, response) => {
    try {
        // Attempt to get all the games from the database
        const games = await gameModel.find();
        if (games) {
            // If the games are successfully retrieved, send a 200 status code with the games data
            response.status(200).send(games);
        } else {
            // If for some reason the games are not retrieved, throw an error
            throw new Error("Error getting the games");
        }
    } catch (error) {
        // If there's an error during the get operation, send a 500 status code with an error message
        response.status(500).send("Error getting the games: " + error.message);
    }
});

app.get("/getGame", async (request, response) => {
    // Check if the required fields are in the request query
    if (!request.body.id) {
        // If the required field is missing, send a 400 status code with an error message
        response.status(400).send("Missing id in the request body");
        return;
    }

    try {
        // Attempt to get the game from the database with the provided id
        const game = await gameModel.findById(request.body.id);
        if (game) {
            // If the game is successfully retrieved, send a 200 status code with the game data
            response.status(200).send(game);
        } else {
            // If for some reason the game is not retrieved, throw an error
            throw new Error("Error getting the game");
        }
    } catch (error) {
        // If there's an error during the get operation, send a 500 status code with an error message
        response.status(500).send("Error getting the game: " + error.message);
    }
});

app.post("/createGame", async (request, response) => {
    // Check if the required fields are in the request body
    if (
        !request.body.player1Name || 
        !request.body.player2Name ||
        request.body.player1Score == null || 
        request.body.player2Score == null || 
        !request.body.rounds || 
        request.body.round == null
    ) {
        // If any required field is missing, send a 400 status code with an error message
        response.status(400).send("Missing fields in the request body");
        return;
    }

    // Create a new game instance with the request body data
    const game = new gameModel(request.body);

    try {
        // Attempt to save the game to the database
        const savedGame = await game.save();
        if (savedGame) {
            // If the game is successfully saved, send a 200 status code with a success message and the saved game data
            response.status(200).send({ message: "Game Added Successfully!", game: savedGame });
        } else {
            // If for some reason the game is not saved, throw an error
            throw new Error("Error saving the game");
        }
    } catch (error) {
        // If there's an error during the save operation, send a 500 status code with an error message
        response.status(500).send("Error saving the game: " + error.message);
    }
});

app.put("/updateGame", async (request, response) => {
    // Check if the required fields are in the request body
    if (!request.body.id) {
        // If the required field is missing, send a 400 status code with an error message
        response.status(400).send("Missing id in the request body");
        return;
    }

    // Check if request body is empty
    if (Object.keys(request.body).length === 1) {
        // If the request body is empty, send a 400 status code with an error message
        response.status(400).send("No fields to update in the request body");
        return;
    }

    try {
        // Attempt to update the game in the database with the provided id
        const updatedGame = await gameModel.findByIdAndUpdate(request.body.id, request.body, { new: true });
        if (updatedGame) {
            // If the game is successfully updated, send a 200 status code with a success message and the updated game data
            response.status(200).send({ message: "Game Updated Successfully!", game: updatedGame });
        } else {
            // If for some reason the game is not updated, throw an error
            throw new Error("Error updating the game");
        }
    } catch (error) {
        // If there's an error during the update operation, send a 500 status code with an error message
        response.status(500).send("Error updating the game: " + error.message);
    }
});

app.delete("/deleteGame", async (request, response) => {
    // Check if the required fields are in the request query
    if (!request.body.id) {
        // If the required field is missing, send a 400 status code with an error message
        response.status(400).send("Missing id in the request query");
        return;
    }

    try {
        // Attempt to delete the game from the database with the provided id
        const deletedGame = await gameModel
            .findByIdAndDelete(request.body.id);
        if (deletedGame) {
            // If the game is successfully deleted, send a 200 status code with a success message and the deleted game data
            response.status(200).send({ message: "Game Deleted Successfully!", game: deletedGame });
        }
    } catch (error) {
        // If there's an error during the delete operation, send a 500 status code with an error message
        response.status(500).send("Error deleting the game: " + error.message);
    }
});

module.exports = app;