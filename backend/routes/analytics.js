var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "..", "uploads/") });
const {
  getTweetViewCount,
  getTweetLikeCount,
  getRetweetCount,
  getTweetCountHour,
  getTweetCountDay,
  getTweetCountMonth,
  getProfileViewCount,
  IncTweetViewCount,
  IncProfileViewCount
} = require("../DataAccessLayer");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

//Update tweet view count

router.post("/inctweetviewcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;
    const { tweetID } = req.body;

    const query = {
      tweetID: tweetID
    };
    results = await IncTweetViewCount(query);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Update profile view count

router.post("/incprofileviewcount", requireAuth, async function(
  req,
  res,
  next
) {
  try {
    const loggedInUser = req.user;

    const query = {
      userID: loggedInUser.userID
    };
    results = await IncProfileViewCount(query);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Get the tweets with maximum views
router.get("/viewcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {};
    results = await getTweetViewCount(query);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.get("/likecount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {};
    results = await getTweetLikeCount(query);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.get("/retweetcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {};
    results = await getRetweetCount(query);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.get("/hourcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {};
    results = await getTweetCountHour(query);
    //fetch hourly division of tweets from returned results.
    res.json(results);
    // console.log(results.length)
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.get("/daycount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {};
    results = await getTweetCountDay(query);
    //fetch daily division of tweets from returned results.
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.get("/monthcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {};
    results = await getTweetCountMonth(query);
    //fetch monthly division of tweets from returned results.
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.get("/profileviewcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {
      userID: loggedInUser.userID
    };
    results = await getProfileViewCount(query);
    //fetch daily division of count from returned results.
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

module.exports = router;
