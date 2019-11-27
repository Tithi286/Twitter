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

//Get the tweets written by user
router.get('/', requireAuth, async function (req, res, next) {
    const { userID } = req.query;
    try {
        //tweet object
        const tweet = {
            tweetOwnerID: userID
        };
        results = await simulateRequestOverKafka("getTweets", tweet);
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({ message: "No Tweets by User" });
        }
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
//get tweets liked by user
router.get('/like', requireAuth, async function (req, res, next) {
    let likedTweetID = [];
    const { userID } = req.query;
    try {
        const like = {
            userID
        };
        let results = await simulateRequestOverKafka("getLike", like);
        if (results.length > 0) {
            //Create an array with tweetID 
            for (let i = 0; i < results.length; i++) {
                likedTweetID.push(results[i].tweetID);
            }
            //tweet object to find in MongoDB with in operator
            const tweet = {
                tweetID: { $in: likedTweetID }
            };
            results = await simulateRequestOverKafka("getTweets", tweet);
            res.json(results);
        } else {
            return res.json({ message: "No Tweets liked" });
        }
    } catch (e) {
        res.status(500).send(e.message || e);
    }

});
//get retweets by user
router.get('/retweet', requireAuth, async function (req, res, next) {
    let retweetTweetID = [];
    const { userID } = req.query;
    try {
        const retweet = {
            retweetOwnerID: userID,
        }
        let retweets = await simulateRequestOverKafka("getRetweet", retweet);
        if (retweets.length > 0) {
            retweets.forEach(retwt => {
                retweetTweetID.push(retwt.tweetID);
            });
            const tweet = {
                tweetID: { $in: retweetTweetID }
            }
            let tweets = await simulateRequestOverKafka("getTweets", tweet);
            res.json({ tweets, retweets });
        } else {
            return res.json({ message: "No Retweet found" });
        }
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
//get replies by user
router.get('/reply', requireAuth, async function (req, res, next) {
    let repliedTweetID = [];
    const { userID } = req.query;
    try {
        const reply = {
            replyOwnerID: userID,
        }
        let replies = await simulateRequestOverKafka("getReply", reply);
        if (replies.length > 0) {
            replies.forEach(reply => {
                repliedTweetID.push(reply.tweetID);
            });
            const tweet = {
                tweetID: { $in: repliedTweetID }
            }
            let tweets = await simulateRequestOverKafka("getTweets", tweet);
            res.json({ tweets, replies });
        } else {
            return res.json({ message: "No Replies found" });
        }
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
module.exports = router;