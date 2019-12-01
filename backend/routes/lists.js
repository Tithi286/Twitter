var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "..", "uploads/") });
const {
  getTweets,
  getLists,
  saveLists,
  getMemberships,
  getSubscriptions,
  getMembers,
  getSubscribers,
  setSubscribers,
  setMembers,
  unsetMembers,
  unsetSubscribers,
  getUsers
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
  if (!(listName && listDesc)) {
    console.error("Required Details Missing");
    return res.status(400).json({ message: "Required Details Missing" });
  }
  try {
    const loggedInUser = req.user;
    const list = {
      ownerID: loggedInUser.userID,
      listName: listName,
      listDesc: listDesc,
      isPrivate: isPrivate
    };
    await saveLists(list);
    res.json({ message: "List Created" });
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

router.get("/members", requireAuth, async function(req, res, next) {
  try {
    members = [];

    const list = {
      _id: req.query.listID
    };
    const results = await getMembers(list);

    results[0].members.forEach(mem => members.push(mem));

    quoted = "'" + members.join("','") + "'";
    const user = { usersID: [quoted] };

    let chatRes = await getUsers(user);
    res.json(chatRes.results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Returns subscribers of selected list

router.get("/subscribers", requireAuth, async function(req, res, next) {
  try {
    subscribers = [];
    const list = {
      _id: req.query.listID
    };
    const results = await getSubscribers(list);
    results[0].subscribers.forEach(subs => subscribers.push(subs));

    quoted = "'" + subscribers.join("','") + "'";
    const user = { usersID: [quoted] };

    let chatRes = await getUsers(user);
    res.json(chatRes.results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Get the tweets of the followed persons
router.get("/tweets", requireAuth, async function(req, res, next) {
  let followID = [];
  try {
    const list = {
      _id: req.query.listID
    };
    //get the members of list from table list
    let results = await getMembers(list);
    let followed = results[0].members;

    //For each member of list get all the tweets from Mongo Tweets collection

    for (let i = 0; i < followed.length; i++) {
      followID.push(followed[i]);
    }
    //tweet object to find in MongoDB with in operator
    const tweet = {
      tweetOwnerID: { $in: followID }
    };
    results = await getTweets(tweet);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Subscribe to a list

router.post("/subscribe", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;
    const { listID } = req.body;
    const list = {
      listID: listID,
      user: loggedInUser.userID
    };
    await setSubscribers(list);
    res.json("Added to Subscribers");
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

// search people for adding as member
router.get("/search", requireAuth, async function(req, res, next) {
  const { fname } = req.query;
  try {
    const user = {
      search: { firstName: fname }
    };
    const { results } = await getUsers(user);

    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Add member to a list

router.post("/member", requireAuth, async function(req, res, next) {
  try {
    const { userID, listID } = req.body;
    const loggedInUser = req.user;
    const list = {
      listID: listID,
      user: userID
    };
    await setMembers(list);
    res.json("Added to Members");
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Unsubscribe from a list

router.post("/unsubscribe", requireAuth, async function(req, res, next) {
  try {
    const { listID } = req.body;
    const loggedInUser = req.user;
    const list = {
      _id: listID,
      user: loggedInUser.userID
    };
    await unsetSubscribers(list);
    res.json("Subscriber removed");
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Add member to a list

router.post("/demember", requireAuth, async function(req, res, next) {
  try {
    const { userID } = req.body;
    const loggedInUser = req.user;
    const list = {
      _id: req.body.listID,
      user: userID
    };
    await unsetMembers(list);
    res.json("Member removed");
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Delete list

module.exports = router;
