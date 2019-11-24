var express = require('express');
var router = express.Router();
var passport = require('passport');

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
module.exports = router;