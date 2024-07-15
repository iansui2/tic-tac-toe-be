require("dotenv").config();
const express = require('express');
const cors = require("cors");

const app = express();
const apiPortNumber = process.env.PORT || 8080

const corsOptions = {
    origin: '*', 
    credentials: true,           
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
    res.send('Server running on port: ' + apiPortNumber);
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(apiPortNumber, () => { 
    console.log('Server running on apiPortNumber: ' + apiPortNumber);
})