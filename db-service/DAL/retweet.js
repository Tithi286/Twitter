const { retweets } = require('./Models/RetweetSchema');

const getRetweet = connection => (retweet = {}) => {
    return new Promise((resolve, reject) => {
        retweets.find(retweet, function (err, docs) {
            return err ? reject(err) : resolve(docs);
        });
    });
};
const saveRetweet = connection => (retweet) => {
    let retweetDoc = new retweets(retweet);
    return new Promise((resolve, reject) => {
        retweetDoc.save(function (err, docs) {
            return err ? reject(err) : resolve(docs);
        })
    });
};
module.exports = {
    getRetweet,
    saveRetweet,
};