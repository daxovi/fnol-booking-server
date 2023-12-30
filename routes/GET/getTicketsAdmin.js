const getTicketsAdmin = require("express").Router();
const tickets = require("../../models/ticket");
const { decrypt } = require('../../crypto');

getTicketsAdmin.get("/get-tickets-admin", (req, res) => {
    tickets
        .find({})
        .then(function (tickets) {
            // Dešifrování e-mailů v každém ticketu
            const decryptedTickets = tickets.map(ticket => {
                if (ticket.email) {
                    ticket.email = decrypt(ticket.email);
                }
                return ticket;
            });

            return res.json({
                msg: "Úspěšně se podařilo načíst dokument",
                documents: decryptedTickets
            });
        })
        .catch(function (err) {
            return res.json({
                msg:"Nepodařilo se načíst dokument",
                documents:[]
            })
        })
})

module.exports = getTicketsAdmin;