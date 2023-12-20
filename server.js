const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./databaze/connect");
const getMaterials = require("./routes/GET/getMaterial");
const saveMaterial = require("./routes/POST/saveMaterial");
const getTickets = require("./routes/GET/getTickets");
const saveTicket = require("./routes/POST/saveTicket");

const cors = require("cors");
db.connect();

// Middleware
// Povolme přijímat JSON z frontendu
app.use(express.json({extended:false}));

// GET
app.use("/", cors(), getMaterials);
app.use("/", cors(), getTickets);

// POST
app.use("/", saveMaterial);
app.use("/", saveTicket);

app.get("/", (req, res) => {
    res.send("jsi na hlavní stránce");
})

app.listen(PORT, (err) => {
    console.log("Server běží na " + PORT)
})
