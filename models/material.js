const mongoose = require("mongoose");
const material = new mongoose.Schema({
    name:{
        type:String
    }
});

// exportuje model a první argument určuje jak se bude jmenovat kolekce v mongoDB
module.exports = mongoose.model("Material", material);