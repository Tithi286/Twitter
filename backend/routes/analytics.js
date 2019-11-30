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
      const {tweetID}=req.body
  
      const query = {
        /*
db.tweets.updateOne({tweetID:tweetID}, {$inc: {viewCount:1}});
  */
      };
      results = await IncTweetViewCount(query);
      res.json(results);
    } catch (e) {
      res.status(500).send(e.message || e);
    }
  });
  


//Update profile view count

router.post("/incprofileviewcount", requireAuth, async function(req, res, next) {
    try {
      const loggedInUser = req.user;
  
      const query = {
        /*
 db.profileviewcount.updateOne(
    { userID:loggedInUser }, 
    {
        $set: { viewDate: Date }, 
        $inc: { viewCount: 1 } 
    }, true)
  */
      };
      results = await IncProfileViewCount(query);
      res.json(results);
    } catch (e) {
      res.status(500).send(e.message || e);
    }
  });
 
//Get the tweets with maximum views
router.post("/viewcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {
      /*
db.tweets.find().sort({viewCount:-1}).limit(10)
*/
    };
    results = await getTweetViewCount(query);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/likecount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {
      /*
  db.tweets.find().sort({likeCount:-1}).limit(10)
  */
    };
    results = await getTweetLikeCount(query);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/retweetcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {
      /*
  db.tweets.find().sort({retweetCount:-1}).limit(10)
  */
    };
    results = await getRetweetCount(query);
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/hourcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {
      /*
db.tweets.aggregate([
    {"$group" : {_id:"$tweetDate", count:{$sum:1}}}
])
  */
    };
    results = await getTweetCountHour(query);
    //fetch hourly division of tweets from returned results.
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/daycount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {
      /*
db.tweets.aggregate([
    {"$group" : {_id:"$tweetDate", count:{$sum:1}}}
])
  */
    };
    results = await getTweetCountDay(query);
    //fetch daily division of tweets from returned results.
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/monthcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {
      /*
db.tweets.aggregate([
    {"$group" : {_id:"$tweetDate", count:{$sum:1}}}
])
  */
    };
    results = await getTweetCountMonth(query);
    //fetch monthly division of tweets from returned results.
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/profileviewcount", requireAuth, async function(req, res, next) {
  try {
    const loggedInUser = req.user;

    const query = {
      /*
db.profileview.aggregate( [
  { $match: { userID:loggedInUser },
  { $group: { _id: viewDate, count: { $sum: 1 } } }
] )
  */
    };
    results = await getProfileViewCount(query);
    //fetch daily division of count from returned results.
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

module.exports = router;
