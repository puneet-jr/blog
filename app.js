const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv=require("dotenv").config();
const router = require("./route/routes");
const blogrouter = require("./route/blogroutes");
app.use(express.json());
const port = 5000;
const connectDb = require("./dbconnection");

// Connect to MongoDB
connectDb()
    .then(() => {
        console.log("Connected to MongoDB");

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Middleware to handle requests
app.use("/routes", router);

// to handle blog requests

app.use("/blogroutes",blogrouter);

