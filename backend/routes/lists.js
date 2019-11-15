var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
var passport = require('passport');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: path.join(__dirname, '..', 'uploads/') });
const { getLists, saveLists } = require('../DataAccessLayer');


// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', async function (req, res, next) {
    try {
      
      res.json("Lists");
    }
    catch (e) {
      res.status(500).send(e.message || e);
    }
  });
//Follow any person on Twitter (get userID of user to follow from frontend in body)
router.post('/create', requireAuth, async function (req, res, next) {
    const { listName,listDesc,isPrivate } = req.body;
    try {
      const loggedInUser = req.user;
     const list = {
        ownerID: loggedInUser.userID,
        listName:listName,
        listDesc:listDesc,
        isPrivate:isPrivate
      };
      await saveLists(list);
      res.json("List Created");
    } catch (e) {
      res.status(500).send(e.message || e);
    }
  });

  module.exports = router;