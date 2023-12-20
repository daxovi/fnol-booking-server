const saveTicket = require("express").Router();
const ticketModel = require("../../models/ticket");

saveTicket.post("/save-ticket", (req, res) => {
   const {ticket, email, date} = req.body; // jde dekonstruovat všechny vlastnosti

   const surovina = new ticketModel({
      ticket: ticket,
      email: email,
      date: date
   })
   surovina
      .save()
      .then(() => {
         res.status(200).json({ message: "Ticket úspěšně uložen" });
      })
      .catch((err) => {
         console.log("surovina nebyla uložena");
         res.status(500).json({ error: "Chyba při ukládání ticketu" });
      });
})

saveTicket.get("/save-ticket", (req, res) => {
   res.send("Ano, navštívil jsi /save-ticket POSTem");
})

module.exports = saveTicket;