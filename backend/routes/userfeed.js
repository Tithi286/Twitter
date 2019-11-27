var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
var passport = require('passport');
const multer = require('multer');
const path = require('path');

const { simulateRequestOverKafka } = require('../KafkaRequestSimulator');
const upload = multer({ dest: path.join(__dirname, '..', 'uploads/') });
const { getTweets } = require('../DataAccessLayer');
// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

//search tweets <should be updated to include person search>
router.get('/', requireAuth, async function (req, res, next) {
    const { topic } = req.query;
    try {
        const tweet = {
            $text: { $search: topic },
        }
        const results = await getTweets(tweet);
        res.json(results);
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
//like a tweet
router.put('/like', requireAuth, async function (req, res, next) {
    const { tweetID } = req.query;
    try {
        const user = req.user;
        const like = {
            tweetID,
            userID: user.userID
        };
        await simulateRequestOverKafka("saveLike", like);
        res.json({ message: "Tweet Liked" });

    } catch (e) {
        res.status(500).send(e.message || e);
    }

});
//retweet a tweet
router.post('/retweet', requireAuth, async function (req, res, next) {
    const { retweet, tweetID } = req.body;
    const retweetImage = req.file ? `/${req.file.filename}` : '';

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var seconds = d.getSeconds();
    var minutes = d.getMinutes();
    var hour = d.getHours();

    try {
        const loggedInUser = req.user;
        const retweetDoc = {
            retweetID: uuidv4(),
            retweet, tweetID,
            retweetDate: (curr_year + '-' + curr_month + '-' + curr_date + ' ' + hour + ':' + minutes + ':' + seconds),
            retweetOwnerID: loggedInUser.userID,
            retweetImage
        }
        const results = await simulateRequestOverKafka("saveRetweet", retweetDoc);
        res.json(results);
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
//reply a tweet
router.post('/reply', requireAuth, async function (req, res, next) {
    const { reply, tweetID } = req.body;
    const replyImage = req.file ? `/${req.file.filename}` : '';

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var seconds = d.getSeconds();
    var minutes = d.getMinutes();
    var hour = d.getHours();

    try {
        const loggedInUser = req.user;
        const replyDoc = {
            replyID: uuidv4(),
            reply, tweetID,
            replyDate: (curr_year + '-' + curr_month + '-' + curr_date + ' ' + hour + ':' + minutes + ':' + seconds),
            replyOwnerID: loggedInUser.userID,
            replyImage
        }
        const results = await simulateRequestOverKafka("saveReply", replyDoc);
        res.json(results);
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
module.exports = router;