var express = require('express');
var router = express.Router();
var passport = require('passport');

const { simulateRequestOverKafka } = require('../KafkaRequestSimulator');

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

//Get the tweets written by user
router.get('/tweets', requireAuth, async function (req, res, next) {
    const { userID } = req.query;
    console.log("userid", userID)
    try {
        //tweet object
        const tweet = {
            tweetOwnerID: userID
        };
        results = await simulateRequestOverKafka("getTweets", tweet);
        console.log(results)
        res.json(results);
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
//get tweets liked by user
router.get('/likes', requireAuth, async function (req, res, next) {
    let likedTweetID = [], tweetUserID = [];
    const { userID } = req.query;
    try {
        const like = { userID };
        let likes = await simulateRequestOverKafka("getLike", like);
        //Create an array with tweetID 
        for (let i = 0; i < likes.length; i++) {
            likedTweetID.push(likes[i].tweetID);
        }
        //tweet object to find in MongoDB with in operator
        const tweet = {
            tweetID: { $in: likedTweetID }
        };
        let tweets = await simulateRequestOverKafka("getTweets", tweet);
        tweets.forEach(user => {
            tweetUserID.push(user.tweetOwnerID)
        });
        const user = {
            userID: tweetUserID
        }
        let { results } = await simulateRequestOverKafka("getUsers", user);
        // parse and respond
        const usersMap = results.reduce((acc, result) => {
            acc[result.userID] = result;
            return acc;
        }, {});
        const tweetsMap = tweets.reduce((acc, tweet) => {
            acc[tweet.tweetID] = {
                tweet,
                user: usersMap[tweet.tweetOwnerID],
            }
            return acc;
        }, {});
        res.json(Object.keys(tweetsMap).map(key => tweetsMap[key]));
        // res.json(results);
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
//get retweets by user
router.get('/retweets', requireAuth, async function (req, res, next) {
    let retweetTweetID = [], tweetUserID = [];
    const { userID } = req.query;
    try {
        const retweet = {
            retweetOwnerID: userID,
        }
        let retweets = await simulateRequestOverKafka("getRetweet", retweet);
        retweets.forEach(retwt => {
            retweetTweetID.push(retwt.tweetID);
        });
        const tweet = {
            tweetID: { $in: retweetTweetID }
        }
        let tweets = await simulateRequestOverKafka("getTweets", tweet);
        tweets.forEach(user => {
            tweetUserID.push(user.tweetOwnerID)
        });
        const user = {
            userID: tweetUserID
        }
        let { results } = await simulateRequestOverKafka("getUsers", user);
        // parse and respond
        const usersMap = results.reduce((acc, result) => {
            acc[result.userID] = result;
            return acc;
        }, {});
        const tweetsMap = tweets.reduce((acc, tweet) => {
            acc[tweet.tweetID] = {
                tweet,
                user: usersMap[tweet.tweetOwnerID],
                retweets: []
            }
            return acc;
        }, {});
        retweets.forEach(ret => tweetsMap[ret.tweetID]["retweets"].push(ret));
        res.json(Object.keys(tweetsMap).map(key => tweetsMap[key]));
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
//get replies by user
/*
    [
        {
            "tweet": {
                "tweetID": "f3a8fe51-60d7-477a-b468-2584c0e46d37",
                "tweet": "Et expedita asperiores. #instalove #travel #photo #girl #follow #sweet ",
                "tweetImage": "",
                "tweetOwnerID": "12C7629D-014A-E4D1-ED54-70522B979839", // KEY
                "tweetDate": "2019-11-10T17:09:13.602Z",
            },
            // user who tweeted
            "user":{
                "userID": "12C7629D-014A-E4D1-ED54-70522B979839",  // KEY
                "email": "non@Vestibulumanteipsum.com",
                "firstName": "Lyle",
                "lastName": "Bowen",
                "userName": "Chaim",
                "profileImage": null,
            },
            // replies from the other use (req.query.userID)
            "replies": [
                {
                    "replyID": "0bb11285-473f-4838-8dd9-2d3d6fcf6059",
                    "reply": "this tweet is worth reading, well said !",
                    "tweetID": "f3a8fe51-60d7-477a-b468-2584c0e46d37",
                    "replyDate": "2019-11-27T01:31:42.000Z",
                    "replyOwnerID": "5317c26d-87fe-4de8-935a-5bc7bad2987a",
                    "replyImage": "",
                }
            ]
        }
    ]
*/
router.get('/replies', requireAuth, async function (req, res, next) {
    let repliedTweetID = [], tweetUserID = [];
    const { userID } = req.query;
    try {
        const reply = {
            replyOwnerID: userID,
        }
        let replies = await simulateRequestOverKafka("getReply", reply);
        replies.forEach(reply => {
            repliedTweetID.push(reply.tweetID);
        });
        const tweet = {
            tweetID: { $in: repliedTweetID }
        }
        let tweets = await simulateRequestOverKafka("getTweets", tweet);
        tweets.forEach(user => {
            tweetUserID.push(user.tweetOwnerID)
        });
        const user = {
            userID: tweetUserID
        }
        let { results } = await simulateRequestOverKafka("getUsers", user);

        // parse and respond
        const usersMap = results.reduce((acc, result) => {
            acc[result.userID] = result;
            return acc;
        }, {});
        const tweetsMap = tweets.reduce((acc, tweet) => {
            acc[tweet.tweetID] = {
                tweet,
                user: usersMap[tweet.tweetOwnerID],
                replies: []
            }
            return acc;
        }, {});
        replies.forEach(reply => tweetsMap[reply.tweetID]["replies"].push(reply));
        res.json(Object.keys(tweetsMap).map(key => tweetsMap[key]));
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});
module.exports = router;