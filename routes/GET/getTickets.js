const getTickets = require("express").Router();
const tickets = require("../../models/ticket");

getTickets.get("/get-tickets", (req, res) => {
    tickets
        .find({})
        .then(function (docs) {
            return res.json({
                msg:"Úspěšně se podařilo načíst dokument",
                documents:docs
            })
        })
        .catch(function (err) {
            return res.json({
                msg:"Nepodařilo se načíst dokument",
                documents:[]
            })
        })
})

module.exports = getTickets;