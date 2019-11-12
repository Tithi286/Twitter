var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
var passport = require('passport');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: path.join(__dirname, '..', 'uploads/') });
const { getTweets, saveTweet } = require('../DataAccessLayer');
const { getFollowedUsers } = require('../DataAccessLayer');

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

//Get the tweets of the followed persons
router.get('/', requireAuth, async function (req, res, next) {
    let followedTweets = {};
    let followID = [];
    try {
        const user = req.user;
        //get the userID s of followed persons from table follower
        let { results } = await getFollowedUsers(user);
        let followed = JSON.parse(JSON.stringify(results));

        //For each followed person get all the tweets from Mongo Tweets collection

        //Create a array with followed persons ID
        for (let i = 0; i < followed.length; i++) {
            followID.push(followed[i].followedID);
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
//create a tweet
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
        const results = await saveTweet(tweetDoc);
        res.json(results);
    } catch (e) {
        res.status(500).send(e.message || e);
    }

});
module.exports = router;