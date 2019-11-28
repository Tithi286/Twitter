const { replies } = require('./Models/ReplySchema');
const getReply = connection => (reply = {}) => {
    return new Promise((resolve, reject) => {
        replies.find(reply, function (err, docs) {
            return err ? reject(err) : resolve(docs);
        });
    });
};
const saveReply = connection => (reply) => {
    let replyDoc = new replies(reply);
    return new Promise((resolve, reject) => {
        replyDoc.save(function (err, docs) {
            return err ? reject(err) : resolve(docs);
        })
    });
};
module.exports = {
    getReply,
    saveReply,
};