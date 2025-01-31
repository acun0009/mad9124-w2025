"use strict";

const express = require("express");
const app = express();

const cars = require("./cars");

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

app.get("/api", (req, res) => {
    res.send({
        data: {
            message: "Hello from Express!",
        }
    });
});

app.get("/api/cars", (req, res) => {
    res.send({ data: cars });
});

const PORT = 4000;
app.listen(PORT, err => {
    if (err) return console.error("An error occurred", err);
    console.log(`The server is listening on ${PORT}`);
});