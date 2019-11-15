var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "..", "uploads/") });
const {
  getLists,
  saveLists,
  getMemberships,
  getSubscriptions,
  getMembers,
  getSubscribers
} = require("../DataAccessLayer");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

//Get the created lists
router.get("/", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const list = {
      ownerID: loggedInUser.userID
    };
    results = await getLists(list);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Create a list
router.post("/create", requireAuth, async function(req, res, next) {
  const { listName, listDesc, isPrivate } = req.body;
  try {
    const loggedInUser = req.user;
    const list = {
      ownerID: loggedInUser.userID,
      listName: listName,
      listDesc: listDesc,
      isPrivate: isPrivate
    };
    await saveLists(list);
    res.json("List Created");
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Gets names of lists user is a member of

router.get("/memberships", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;
    const list = {
      members: loggedInUser.userID
    };
    const results = await getMemberships(list);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Gets names of lists user has subscribed to

router.get("/subscriptions", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;
    const list = {
      subscribers: loggedInUser.userID
    };
    const results = await getSubscriptions(list);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Returns members of selected list

router.post("/members", requireAuth, async function(req, res, next) {
  try {
    const list = {
      _id: req.body.listID
    };
    const results = await getMembers(list);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Returns subscribers of selected list

router.post("/subscribers", requireAuth, async function(req, res, next) {
    try {
      const list = {
        _id: req.body.listID
      };
      const results = await getSubscribers(list);
      res.json(results);
    } catch (e) {
      res.status(500).send(e.message || e);
    }
  });

module.exports = router;
