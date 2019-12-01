const { messages } = require("./Models/MessageSchema");

const getMessages= connection => (message = {}) => {
  return new Promise((resolve, reject) => {
    messages.find(message, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

/*const getInMessages= connection => (message = {}) => {
  return new Promise((resolve, reject) => {
    messages.aggregate([{
      $or:{"$match":{"senderID":"userid","receiverID":"userid"}}}], function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};*/




const sendMessages = connection => message => {
  let chat = new messages(message);
  return new Promise((resolve, reject) => {
    chat.save(function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const deleteMessages = connection => (message = {}) => {
    return new Promise((resolve, reject) => {
      messages.remove(message, function(err, docs) {
        return err ? reject(err) : resolve(docs);
      });
    });
  };
  
  module.exports = {
    getMessages,
    sendMessages,
    deleteMessages,
   
  };
  