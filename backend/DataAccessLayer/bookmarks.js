const { bookmarks } = require("./Models/BookmarkSchema");

const getBookmarks= connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    bookmarks.find(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const setBookmarks = connection => list => {
  let bookmarkRec = new lists(list);
  return new Promise((resolve, reject) => {
    bookmarkRec.save(function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const deleteBookmarks = connection => (list = {}) => {
    return new Promise((resolve, reject) => {
      bookmarks.remove(list, function(err, docs) {
        return err ? reject(err) : resolve(docs);
      });
    });
  };
  
  module.exports = {
    getBookmarks,
    setBookmarks,
    deleteBookmarks,
   
  };
  