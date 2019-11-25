var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
var passport = require('passport');
const multer = require('multer');
const path = require('path');

const { simulateRequestOverKafka } = require('../KafkaRequestSimulator');
const upload = multer({ dest: path.join(__dirname, '..', 'uploads/') });

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

//Get the tweets of the followed persons
router.get('/', requireAuth, async function (req, res, next) {
    let followID = [];
    try {
        const user = req.user;
        //get the userID s of followed persons from table follower
        let { results } = await simulateRequestOverKafka("getFollowedUsers", user);
        let followed = JSON.parse(JSON.stringify(results));

        //For each followed person get all the tweets from Mongo Tweets collection
        //Create an array with followed persons ID
        for (let i = 0; i < followed.length; i++) {
            followID.push(followed[i].followedID);
        }
        //tweet object to find in MongoDB with in operator
        const tweet = {
            tweetOwnerID: { $in: followID }
        };
        results = await simulateRequestOverKafka("getTweets", tweet);
        res.json(results);
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
//create a new tweet
router.post('/', upload.single('tweetImage'), requireAuth, async function (req, res, next) {
    const { tweet } = req.body;
    const tweetImage = req.file ? `/${req.file.filename}` : '';

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var seconds = d.getSeconds();
    var minutes = d.getMinutes();
    var hour = d.getHours();

    try {
        const user = req.user;
        const tweetDoc = {
            tweetID: uuidv4(),
            tweetDate: (curr_year + '-' + curr_month + '-' + curr_date + ' ' + hour + ':' + minutes + ':' + seconds),
            tweetOwnerID: user.userID,
            likeCount: 0,
            viewCount: 0,
            tweet, tweetImage,
        };
        const results = await simulateRequestOverKafka("saveTweet", tweetDoc);
        res.json(results);
    } catch (e) {
        res.status(500).send(e.message || e);
    }

});
//Delete a owned tweet
router.delete('/', requireAuth, async function (req, res, next) {
    const { tweetID } = req.query;
    try {
        const loggedInUser = req.user;
        const tweet = {
            tweetID
        };
        let results = await simulateRequestOverKafka("getTweets", tweet);
        if (results.length > 0) {
            if (results[0].tweetOwnerID == loggedInUser.userID) {
                console.log();
                await simulateRequestOverKafka("deleteTweet", tweet);
                res.json({ message: "Tweet Deleted" });
            }
        }
        else return res.status(400).json({ message: "Unauthorised" });
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
//like a tweet
router.put('/like', requireAuth, async function (req, res, next) {
    const { tweetID } = req.query;
    try {
        const tweet = {
            tweetID
        };
        await simulateRequestOverKafka("editTweet", tweet);
        res.json({ message: "Tweet Liked" });

    } catch (e) {
        res.status(500).send(e.message || e);
    }

});
module.exports = router;