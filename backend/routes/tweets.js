var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
var passport = require('passport');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: path.join(__dirname, '..', 'uploads/') });
const { getTweets, saveTweet } = require('../DataAccessLayer');

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

//Route to get all tweets
router.get('/', requireAuth, async function (req, res, next) {
    try {
        const results = await getTweets();
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