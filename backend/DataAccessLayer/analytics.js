const { tweets } = require("./Models/TweetSchema");
const {profileview }=require("./Models/ProfileViewSchema");

const getTweetViewCount = connection => (query = {}) => {
  return new Promise((resolve, reject) => {
    tweets.find(query, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getTweetLikeCount = connection => (query = {}) => {
  return new Promise((resolve, reject) => {
    tweets.find(query, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getRetweetCount = connection => (query = {}) => {
  return new Promise((resolve, reject) => {
    tweets.find(query, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getTweetCountHour = connection => (query = {}) => {
  return new Promise((resolve, reject) => {
    tweets.find(query, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};
const getTweetCountDay = connection => (query = {}) => {
  return new Promise((resolve, reject) => {
    tweets.find(query, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getTweetCountMonth = connection => (query = {}) => {
  return new Promise((resolve, reject) => {
    tweets.find(query, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getProfileViewCount = connection => (query = {}) => {
  return new Promise((resolve, reject) => {
    tweets.find(query, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const IncTweetViewCount= connection => (query = {}) => {
    return new Promise((resolve, reject) => {
      tweets.find(query, function(err, docs) {
        return err ? reject(err) : resolve(docs);
      });
    });
  };
  const IncProfileViewCount = connection => (query = {}) => {
    return new Promise((resolve, reject) => {
     profileview.find(query, function(err, docs) {
        return err ? reject(err) : resolve(docs);
      });
    });
  };
module.exports = {
  getTweetViewCount,
  getTweetLikeCount,
  getRetweetCount,
  getTweetCountHour,
  getTweetCountDay,
  getTweetCountMonth,
  getProfileViewCount,
  IncTweetViewCount,
  IncProfileViewCount
};
