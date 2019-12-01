var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "..", "uploads/") });
const {
  getMessages,
  sendMessages,
  deleteMessages
} = require("../DataAccessLayer");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

//Shows all chats
router.get("/", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const messages = {
      senderID: loggedInUser.userID
    };
    results = await getMessages(messages);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

// search people for messaging
router.get('/search', requireAuth, async function (req, res, next) {
  const {fname} = req.query;
  try {
       
              const user = { search: { firstName: fname } };
              const { results } = await getUsers(user);
              
               res.json(results);
         
  } catch (e) {
      res.status(500).send(e.message || e);
  }
});

router.post("/send", requireAuth, async function(req, res, next) {
  const { chat, receiverID } = req.body;

  try {
    const loggedInUser = req.user;
    const messages = {
      senderID: loggedInUser.userID,
      chat: chat,
      receiverID: receiverID,
      chatDate: Date.now()
    };
    await sendMessages(messages);
    res.json({ message: "Message Sent" });
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Shows specific chat
router.post("/view", requireAuth, async function(req, res, next) {
  const { receiverID } = req.body;

  try {
    const loggedInUser = req.user;
    const messages = {
      senderID: loggedInUser.userID,
      receiverID: receiverID
    };
    const results = await getMessages(messages);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/delete", requireAuth, async function(req, res, next) {
  const { receiverID } = req.body;
  try {
    const loggedInUser = req.user;
    const messages = {
      senderID: loggedInUser.userID,
      receiverID: receiverID
    };
    await deleteMessages(messages);
    res.json({ message: "Message Deleted" });
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

module.exports = router;
