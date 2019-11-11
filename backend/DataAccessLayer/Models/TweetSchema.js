"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema(
    {
        tweetID: String,
        tweet: String,
        tweetImage: String,
        tweetOwnerID: String,
        retweetId: String,
        replyId: String,
        likeCount: Number,
        tweetDate: String,
        bookmarkId: String,
        viewCount: Number,
        listID: String
    },
    { timestamps: true }
);

const tweets = mongoose.model("tweets", TweetSchema, "tweets");
module.exports = { tweets, TweetSchema };