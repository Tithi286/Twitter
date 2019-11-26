const { likes } = require('./Models/LikeSchema');

const getLike = connection => (like = {}) => {
    return new Promise((resolve, reject) => {
        likes.find(like, function (err, docs) {
            return err ? reject(err) : resolve(docs);
        });
    });
};

const saveLike = connection => (like) => {
    let likeDoc = new likes(like);
    return new Promise((resolve, reject) => {
        likeDoc.save(function (err, docs) {
            return err ? reject(err) : resolve(docs);
        })
    });
};
module.exports = {
    getLike,
    saveLike,
};