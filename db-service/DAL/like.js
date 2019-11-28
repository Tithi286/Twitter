const { likes } = require('./Models/LikeSchema');

const getLike = connection => (like = {}) => {
    return new Promise((resolve, reject) => {
        likes.find(like, function (err, docs) {
            return err ? reject(err) : resolve(docs);
        });
    });
};

const getLikeCount = connection => tweetIds => {
    return new Promise((resolve, reject) => {
        tweetIds = Array.isArray(tweetIds) ? tweetIds : [tweetIds];
        likes.aggregate(
            [
                { "$match": { "tweetID": { "$in": tweetIds } } },
                { "$group": { "_id": "$tweetID", "count": { "$sum": 1 } } }
            ],
            (err, docs) => {
                if (err) {
                    return reject(err);
                }
                // return as map something like
                /*
                    {
                        "tweetID1": 2,
                        "tweetID2": 5,
                        ...
                        ...
                    }
                */
                const replyCountMap = tweetIds.reduce((acc, t) => {
                    acc[t] = 0;
                    return acc;
                }, {});
                docs = JSON.parse(JSON.stringify(docs));
                docs.forEach(elem => {
                    replyCountMap[elem._id] = elem.count;
                });
                return resolve(replyCountMap);
            }
        );
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
    getLikeCount
};