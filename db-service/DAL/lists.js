const { lists } = require("./Models/ListSchema");
const tableName = "tweets";

const getLists = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.find(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const saveLists = connection => list => {
  let listsRec = new lists(list);
  return new Promise((resolve, reject) => {
    listsRec.save(function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getMemberships = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.find(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getSubscriptions = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.find(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getMembers = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.find(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const getSubscribers = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.find(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const setSubscribers = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.insert(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const setMembers = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.insert(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const unsetSubscribers = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.remove(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

const unsetMembers = connection => (list = {}) => {
  return new Promise((resolve, reject) => {
    lists.remove(list, function(err, docs) {
      return err ? reject(err) : resolve(docs);
    });
  });
};

module.exports = {
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
};