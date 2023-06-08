const express = require("express");
const {
    inserTicket,
    getTickets,
    getTicketById,
    updateClientReply,
    updateStatusClose,
    deleteTicket } = require("../model/ticket/TicketModel");
const { userAuthorization } = require("../middleware/authorizationMiddleware");
const { createNewTicketValidation, replyTicketMessageValidation } = require("../middleware/formValidationMiddleware");
const router = express.Router();

router.all("/", (req, res, next) => {
    // res.json({ message: "return form ticket router" });

    next();
});

// Create new ticket
router.post("/", createNewTicketValidation, userAuthorization, async (req, res) => {
    try {
    const { subject, sender, message } = req.body;
        
    const userId = req.userId
    
        const ticketObj = {
            clientId: userId,
            subject,
            conversations: [
                {
                    sender,
                    message,
                },
            ],
        };

    const result = await inserTicket(ticketObj);
    console.log(result)
    if (result._id) {
        return res.json({ status: "Success", message: "New ticket has been created" });
    }

    res.json({ status: "error" ,message: "Unable to create the ticket, please try again later!" });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

// Get all tickets for the specific user
router.get("/", userAuthorization, async (req, res) => {
    try {
    const userId = req.userId
    const result = await getTickets(userId);
           
    return res.json({ status: "Success", result });
       
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

// Get all tickets for a specific user
router.get("/:_id", userAuthorization, async (req, res) => {
    try {
      const { _id } = req.params;
  
      const clientId = req.userId;
      const result = await getTicketById(_id, clientId);
  
      return res.json({
        status: "success",
        result,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
});

// Update reply message from client
router.put("/:_id", replyTicketMessageValidation, userAuthorization, async (req, res) => {
    try {
      const { message, sender } = req.body;
      const { _id } = req.params;
      const clientId = req.userId;
      
        const result = await updateClientReply({ _id, message, sender });
        
        if (result._id) {
            return res.json({
                status: "success",
                message: "Your message updated",
              });
        }
  
      res.json({
        status: "error",
        message: "Unable to update your message please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
});

// update ticket status to close
router.patch("/close-ticket/:_id", userAuthorization, async (req, res) => {
    try {
      const { _id } = req.params;
      const clientId = req.userId;
  
      const result = await updateStatusClose({ _id, clientId });
  
      if (result._id) {
        return res.json({
          status: "success",
          message: "The ticket has been closed",
        });
      }
      res.json({
        status: "error",
        message: "Unable to close the ticket",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
});
  
// Delete a ticket
router.delete("/delete-ticket/:_id", userAuthorization, async (req, res) => {
    try {
      const { _id } = req.params;
      const clientId = req.userId;
  
      const result = await deleteTicket({ _id, clientId });
  
      return res.json({
        status: "success",
        message: "The ticket has been deleted",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });

module.exports = router;