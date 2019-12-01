var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");
const { simulateRequestOverKafka } = require('../KafkaRequestSimulator');
const upload = multer({ dest: path.join(__dirname, "..", "uploads/") });
const {
  getBookmarks,
  setBookmarks,
  deleteBookmarks,
  getTweets
} = require("../DataAccessLayer");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

//Create a list
router.post("/create", requireAuth, async function(req, res, next) {
  const { tweetID } = req.body;

  try {
    const loggedInUser = req.user;
    const bookmarks = {
      userID: loggedInUser.userID,
      tweetID: tweetID
    };
    await simulateRequestOverKafka("setBookmarks", bookmarks);
    res.json({ message: "Bookmarks Created" });
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.get("/", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;
    const bookmarks = {
      userID: loggedInUser.userID
    };
    TweetID=[]
    const results = await getBookmarks(bookmarks);
    //res.json(results);
    results.forEach(retwt => {
      TweetID.push(retwt.tweetID);
  });
  const tweet = {
      tweetID: { $in: TweetID }
  }
  let tweets = await getTweets(tweet);
  res.json(tweets)
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/delete", requireAuth, async function(req, res, next) {
  const { tweetID, bookmarksID } = req.body;
  try {
    const loggedInUser = req.user;
    const bookmarks = {
      userID: loggedInUser.userID,
      tweetID: tweetID
    };
    await deleteBookmarks(bookmarks);
    res.json({ message: "Bookmarks Deleted" });
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

module.exports = router;
