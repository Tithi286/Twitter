const mysql = require("mysql");
const mongoose = require("mongoose");

const {
  sql_host,
  sql_port,
  sql_user,
  sql_password,
  sql_database,
  sql_connectionLimit
} = require("../config");
const {
  mongo_host,
  mongo_user,
  mongo_password,
  mongo_database,
  mongo_connectionLimit,
  mongo_port
} = require("../config");

const { getUsers, saveUsers, editUser, deleteUser } = require("./users");
const { getTweets, saveTweet, deleteTweet, editTweet } = require("./tweets");
const {
  getLists,
  saveLists,
  getMemberships,
  getSubscriptions,
  getMembers,
  getSubscribers,
  setSubscribers,
  setMembers,
  unsetSubscribers,
  unsetMembers
} = require("./lists");
const {
  getFollowedUsers,
  saveFollower,
  deleteFollower
} = require("./follower");

const { getLike, saveLike, getLikeCount } = require("./like");
const { getRetweet, saveRetweet, getRetweetCount } = require('./retweet');
const { getReply, saveReply, getReplyCount } = require('./reply');

const options = {
  connectionLimit: sql_connectionLimit,
  host: sql_host,
  port: sql_port,
  user: sql_user,
  password: sql_password,
  database: sql_database,
  multipleStatements: true
};
const pool = mysql.createPool(options);

//Create MySQL connection
const getSQLConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      return err ? reject(err) : resolve(connection);
    });
  });
};

//Set up default mongoose connection
const getMongoConnection = () => {
  return new Promise(async (resolve, reject) => {
    const mongoDB = `'mongodb://${mongo_user}:${mongo_password}@${mongo_host}:${mongo_port}/${mongo_database}`;
    try {
      await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true
      });
    } catch (e) {
      console.log(e);
      return reject(e);
    }
    return resolve();
  });
};
const _getUsers = async whereClause => {
  const connection = await getSQLConnection();
  return getUsers(connection)(whereClause);
};

const _saveUsers = async whereClause => {
  const connection = await getSQLConnection();
  return saveUsers(connection)(whereClause);
};

const _editUser = async whereClause => {
  const connection = await getSQLConnection();
  return editUser(connection)(whereClause);
};

const _deleteUser = async whereClause => {
  const connection = await getSQLConnection();
  return deleteUser(connection)(whereClause);
};

const _getFollowedUsers = async whereClause => {
  const connection = await getSQLConnection();
  return getFollowedUsers(connection)(whereClause);
};

const _saveFollower = async whereClause => {
  const connection = await getSQLConnection();
  return saveFollower(connection)(whereClause);
};

const _deleteFollower = async whereClause => {
  const connection = await getSQLConnection();
  return deleteFollower(connection)(whereClause);
};

const _getTweets = async whereClause => {
  await getMongoConnection();
  return getTweets()(whereClause);
};

const _saveTweet = async whereClause => {
  await getMongoConnection();
  return saveTweet()(whereClause);
};

const _deleteTweet = async whereClause => {
  await getMongoConnection();
  return deleteTweet()(whereClause);
};

const _editTweet = async whereClause => {
  await getMongoConnection();
  return editTweet()(whereClause);
};
const _getRetweet = async whereClause => {
  await getMongoConnection();
  return getRetweet()(whereClause);
};
const _saveRetweet = async whereClause => {
  await getMongoConnection();
  return saveRetweet()(whereClause);
};
const _getRetweetCount = async tweetIds => {
  await getMongoConnection();
  return getRetweetCount()(tweetIds);
};
const _getLike = async whereClause => {
  await getMongoConnection();
  return getLike()(whereClause);
};
const _saveLike = async whereClause => {
  await getMongoConnection();
  return saveLike()(whereClause);
};
const _getLikeCount = async tweetIds => {
  await getMongoConnection();
  return getLikeCount()(tweetIds)
};
const _getReply = async whereClause => {
  await getMongoConnection();
  return getReply()(whereClause);
};
const _saveReply = async whereClause => {
  await getMongoConnection();
  return saveReply()(whereClause);
};
const _getReplyCount = async tweetIds => {
  await getMongoConnection();
  return getReplyCount()(tweetIds)
};
const _getLists = async whereClause => {
  await getMongoConnection();
  return getLists()(whereClause);
};

const _saveLists = async whereClause => {
  await getMongoConnection();
  return saveLists()(whereClause);
};

const _getMemberships = async whereClause => {
  await getMongoConnection();
  return getMemberships()(whereClause);
};

const _getSubscriptions = async whereClause => {
  await getMongoConnection();
  return getSubscriptions()(whereClause);
};

const _getMembers = async whereClause => {
  await getMongoConnection();
  return getMembers()(whereClause);
};

const _getSubscribers = async whereClause => {
  await getMongoConnection();
  return getSubscribers()(whereClause);
};

const _setSubscribers = async whereClause => {
  await getMongoConnection();
  return setSubscribers()(whereClause);
};

const _setMembers = async whereClause => {
  await getMongoConnection();
  return setMembers()(whereClause);
};

const _unsetSubscribers = async whereClause => {
  await getMongoConnection();
  return unsetSubscribers()(whereClause);
};

const _unsetMembers = async whereClause => {
  await getMongoConnection();
  return unsetMembers()(whereClause);
};
module.exports = {
  getUsers: _getUsers,
  saveUsers: _saveUsers,
  editUser: _editUser,
  deleteUser: _deleteUser,

  getFollowedUsers: _getFollowedUsers,
  saveFollower: _saveFollower,
  deleteFollower: _deleteFollower,

  getTweets: _getTweets,
  saveTweet: _saveTweet,
  deleteTweet: _deleteTweet,
  editTweet: _editTweet,

  getRetweet: _getRetweet,
  saveRetweet: _saveRetweet,
  getRetweetCount: _getRetweetCount,

  getLike: _getLike,
  saveLike: _saveLike,
  getLikeCount: _getLikeCount,

  getReply: _getReply,
  saveReply: _saveReply,
  getReplyCount: _getReplyCount,

  getLists: _getLists,
  saveLists: _saveLists,
  getMemberships: _getMemberships,
  getSubscriptions: _getSubscriptions,
  getMembers: _getMembers,
  getSubscribers: _getSubscribers,
  setSubscribers: _setSubscribers,
  setMembers: _setMembers,
  unsetSubscribers: _unsetSubscribers,
  unsetMembers: _unsetMembers,
  getMongoConnection
};
