'use strict';

const express = require('express');
const cars = require('./cars.js');
const app = express();

app.use(express.json());

// GET: gets ALL the cars
app.get("/api/cars", (req, res) => {
    res.send({ data: cars });
});

// GET: gets ONE car (based on id)
app.get("/api/cars/:id", (req, res) => {
    const car = cars.find((car) => car.id === parseInt(req.params.id));
    res.send({ data: car });
});

// POST: creates one car
app.post("/api/cars", (req, res) => {
    // const { make, model, colour } = req.body;
    const newCar = {
        id: Date.now(),
        ...req.body
    }
    cars.push(newCar);
    res.status(201).send({ data: newCar });
});

// PUT: update (replace) a car
app.put("/api/cars/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const idx = cars.findIndex((car) => car.id === id);
    if(idx < 0) {
        res.status(404).send({
            error: `Car with id ${id} not found.`
        });
        return;
    }
    const updatedCar = { id, ...req.body };
    cars[idx] = updatedCar;
    res.send({ data: updatedCar });
});

// PATCH: update (partial) an object
app.patch("/api/cars/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const idx = cars.findIndex((car) => car.id === id);
    if(idx < 0) {
        res.status(404).send({
            error: `Car with id ${id} not found.`
        });
        return;
    }
    const updatedCar = {
        ...cars[idx],
        ...req.body
    }
    cars[idx] = updatedCar;
    res.send({ data: updatedCar });
});

// DELETE: delete a car
app.delete("/api/cars/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const idx = cars.findIndex((car) => car.id === id);
    if(idx < 0) {
        res.status(404).send({
            error: `Car with id ${id} not found.`
        });
        return;
    }
    const deletedCar = cars.splice(idx, 1);
    res.send({ data: deletedCar});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, err => {
    if (err) {
        console.error('Something went wrong', err)
        return
    }
    console.log(`Server running at ${PORT}`)
})