var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "..", "uploads/") });
const {
  getBookmarks,
  setBookmarks,
  deleteBookmarks
} = require("../DataAccessLayer");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

//Get the created lists
router.get("/", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const bookmarks = {
      ownerID: loggedInUser.userID
    };
    results = await getBookmarks(bookmarks);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

//Create a list
router.post("/create", requireAuth, async function(req, res, next) {
  const { tweetID } = req.body;

  try {
    const loggedInUser = req.user;
    const bookmarks = {
      ownerID: loggedInUser.userID,
      tweetID: tweetID,
      bookmarkDate: Date.now()
    };
    await setBookmarks(bookmarks);
    res.json({ message: "Bookmarks Created" });
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/view", requireAuth, async function(req, res, next) {

   
    try {
      const loggedInUser = req.user;
      const bookmarks = {
        ownerID: loggedInUser.userID
      };
      const results =await getBookmarks(bookmarks);
      res.json(results);
    } catch (e) {
      res.status(500).send(e.message || e);
    }
  });

  router.post("/delete", requireAuth, async function(req, res, next) {
    const { tweetID,bookmarksID} = req.body;
    try {
      const loggedInUser = req.user;
      const bookmarks = {
        ownerID: loggedInUser.userID,
        tweetID: tweetID,
        _id:bookmarksID
      };
      await deleteBookmarks(bookmarks);
      res.json({ message: "Bookmarks Deleted" });
    } catch (e) {
      res.status(500).send(e.message || e);
    }
  });
  
  

module.exports = router;
