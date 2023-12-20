const getMaterials = require("express").Router();
const materials = require("../../models/material");

getMaterials.get("/get-materials", (req, res) => {
    materials
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

module.exports = getMaterials;