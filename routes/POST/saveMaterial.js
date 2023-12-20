const saveMaterial = require("express").Router();
const modelMaterial = require("../../models/material");

saveMaterial.post("/save-material", (req, res) => {
   const {name} = req.body; // jde dekonstruovat všechny vlastnosti

   const surovina = new modelMaterial({
      name: name
   })
   surovina
      .save()
      .then(() => {
         res.sendStatus(200);
      })
      .catch((err) => {
         console.log("surovina nebyla uložena");
         res.sendStatus(500);
      });
})

saveMaterial.get("/save-material", (req, res) => {
   res.send("Ano, navštívil jsi /save-material POSTem");
})

module.exports = saveMaterial;