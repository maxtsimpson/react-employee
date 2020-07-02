const db = require("../models");
const mongoose = require("mongoose")

module.exports = function (app) {

    app.get("/api/department", (req, res) => {
        db.Department.find({})
            .then((department) => {
                res.json(department)
            })
            .catch(error => res.json(error))
    })

    app.put("/api/department/:id", (req, res) => {

        db.Department.findOneAndUpdate(req.params.id, { $push: { exercises: req.body} }, {new: true})
            .then((newWorkout) => {
                res.json(newWorkout)
            })
            .catch(error => res.json(error))
    })

    app.post("/api/department", (req, res) => {
        const workout = new db.Department(req.body)
        workout.save()
            .then((results) => {
                res.json(results)
            })
            .catch(error => res.json(error))
    })

}