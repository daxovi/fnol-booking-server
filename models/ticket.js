const mongoose = require("mongoose");
const ticket = new mongoose.Schema({
    ticket:{
        type:String
    },
    email:{
        type:String
    },
    notes:{
        type:String
    },
    date:{
        type:String
    }
});

// exportuje model a první argument určuje jak se bude jmenovat kolekce v mongoDB
module.exports = mongoose.model("Ticket", ticket);