const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require('express-rate-limit');
const basicAuth = require('express-basic-auth');

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./databaze/connect");
const getMaterials = require("./routes/GET/getMaterial");
const saveMaterial = require("./routes/POST/saveMaterial");
const getTickets = require("./routes/GET/getTickets");
const getTicketsAdmin = require("./routes/GET/getTicketsAdmin");
const saveTicket = require("./routes/POST/saveTicket");

const cors = require("cors");
db.connect();

// Middleware
// Povolme přijímat JSON z frontendu
app.use(express.json({extended:false}));

app.set('trust proxy', 1);

// CORS
const corsOptions = {
    origin: ['https://admin.plesfnol.cz', 'https://www.plesfnol.cz', 'https://plesfnol.cz'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Vytvoření instance rate limiteru
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 100, // limit každé IP na 100 požadavků za okno
    handler: function (req, res, next) {
        console.log(`Rate limit exceeded for ${req.ip}`);
        res.status(429).send('Příliš mnoho požadavků, zkuste to později.');
    }
});

// Aplikace limiteru na všechny požadavky
app.use(limiter);






// Vytvoření vlastní funkce pro ověření uživatelského jména a hesla
const myAuthorizer = (username, password) => {
    const userMatches = basicAuth.safeCompare(username, 'admin');
    const passwordMatches = basicAuth.safeCompare(password, process.env.ADMIN_PASSWORD);

    return userMatches & passwordMatches;
};

app.use('/get-tickets-admin', basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    realm: 'AdminArea'
}));





// GET
app.use("/", getMaterials);
app.use("/", getTickets);
app.use("/", getTicketsAdmin);

// POST
app.use("/", saveMaterial);
app.use("/", saveTicket);

// Konfigurace Nodemaileru
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Váš SMTP server
    port: process.env.SMTP_PORT, // Port SMTP serveru
    secure: false, // true pro 465, false pro ostatní porty
    auth: {
        user: process.env.SMTP_USER, // Uživatelské jméno pro SMTP server
        pass: process.env.SMTP_PASSWORD, // Heslo pro SMTP server
    },
});

// Endpoint pro odeslání e-mailu
app.post("/send-email", (req, res) => {
    const { to, subject, text, html } = req.body; // Získání dat z požadavku

    const mailOptions = {
        from: process.env.SMTP_USER, // E-mailová adresa odesílatele
        to: to, // Příjemce
        subject: subject, // Předmět
        text: text, // Text e-mailu
        html: html // Html verze e-mailu
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send("E-mail byl úspěšně odeslán: " + info.response);
        console.log("Email byl úspěšně odeslán na email " + to);
    });
});

app.get("/", (req, res) => {
    res.send("jsi na hlavní stránce");
})

app.listen(PORT, (err) => {
    console.log("Server běží na " + PORT)
})
