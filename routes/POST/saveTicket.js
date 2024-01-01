const saveTicket = require("express").Router();
const ticketModel = require("../../models/ticket");
const { encrypt, decript } = require('../../crypto');

saveTicket.post("/save-ticket", (req, res) => {
   // Předpokládáme, že req.body je pole objektů
   const ticketsData = req.body.map(ticketData => ({
       ticket: ticketData.ticket,
       email: encrypt(ticketData.email), // Zašifrování e-mailu
       notes: " ", // Defaultní hodnota
       date: ticketData.date
   }));

   ticketModel.insertMany(ticketsData, { ordered: false })
       .then(docs => {
           res.status(200).json({ message: "Všechny tickety úspěšně uloženy", savedTickets: docs });
       })
       .catch(err => {
           console.log("Některé tickety nebyly uloženy");
           res.status(500).json({ error: "Chyba při ukládání některých ticketů", detail: err });
       });
});


/*
saveTicket.post("/save-ticket", (req, res) => {
   const {ticket, email, date} = req.body; // jde dekonstruovat všechny vlastnosti

   let encryptedEmail = encrypt(email);

   const surovina = new ticketModel({
      ticket: ticket,
      email: encryptedEmail,
      notes: " ",
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
});
*/

saveTicket.patch("/save-ticket/:id", async (req, res) => {
   try {
       const updatedTicket = await ticketModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Přidá { new: true } pro získání aktualizovaného dokumentu
       res.send(updatedTicket); // Odešle aktualizovaný dokument
   } catch (error) {
       console.error(error);
       res.status(500).send(error);
   }
});

saveTicket.get("/save-ticket", (req, res) => {
   res.send("Ano, navštívil jsi /save-ticket POSTem");
})

module.exports = saveTicket;