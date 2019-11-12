const mysql = require('mysql');
const mongoose = require('mongoose');

const { sql_host, sql_port, sql_user, sql_password, sql_database, sql_connectionLimit } = require('../config');
const { mongo_host, mongo_user, mongo_password, mongo_database, mongo_connectionLimit, mongo_port } = require('../config');

const { getUsers, saveUsers, editUser, deleteUser } = require('./users');
const { getTweets, saveTweet } = require('./tweets');
const { getFollowedUsers } = require('./follower');


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
                useUnifiedTopology: true
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

const _getTweets = async whereClause => {
    await getMongoConnection();
    return getTweets()(whereClause);
}

const _saveTweet = async whereClause => {
    await getMongoConnection();
    return saveTweet()(whereClause);
}

module.exports = {
    getUsers: _getUsers,
    saveUsers: _saveUsers,
    editUser: _editUser,
    deleteUser: _deleteUser,
    getFollowedUsers: _getFollowedUsers,
    getTweets: _getTweets,
    saveTweet: _saveTweet,
};