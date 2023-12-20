const Mongoose = require("mongoose");
const dotenv = require("dotenv");

class dbConnect {
    connect() {
        dotenv.config();
        Mongoose
            .connect(process.env.DB_CONNECT)
            .then(() => {
                console.log("Připojeno k databázi");
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = new dbConnect(); 