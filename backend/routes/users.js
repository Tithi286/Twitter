var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const path = require('path');
const multer = require('multer');
var passport = require('passport');
const upload = multer({ dest: path.join(__dirname, '..', 'uploads/') });
const redis = require('redis')
const app = express()
 
// create and connect redis client to local instance.
const client = redis.createClient(6379)
 
// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});

const { jwtsecret, encrAlgorithm, encrSecret } = require('../config');
const { getUsers, saveUsers, editUser, deleteUser } = require('../DataAccessLayer');
const { saveFollower, deleteFollower } = require('../DataAccessLayer');

// crypto (can be updated to use 'bcrypt' instead)
const encrypt = password => {
  const cipher = crypto.createCipher(encrAlgorithm, encrSecret);
  let ciphered = cipher.update(password, 'utf8', 'hex');
  ciphered += cipher.final('hex');
  return ciphered;
};

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

/* get all users test route */
router.get('/', async function (req, res, next) {
  try {
    const { results } = await getUsers();
    res.json(results);
  }
  catch (e) {
    res.status(500).send(e.message || e);
  }
});
//user registration
router.post('/', function (req, res, next) {
  const loginRedisKey = 'user:login';
  const { email, password, firstName, lastName, DOB } = req.body;
  const isActive = true;
  console.log("inside user signup")
  client.get(loginRedisKey, (err, login) => {
 
    // If that key exists in Redis store
    if (login) {

        res.json({ 
            source: 'cache', 
            data: JSON.parse(login) })

    }
    else{
        //check if required fields are not null
        if (!(email && password && firstName && lastName)) {
          console.error('Mandatory Details Missing');
          return res.status(400).json({ message: "mandatory buyer info missing" });
        }
        //2015-03-25
        try {
          const user = {
            userID: uuidv4(),
            password: encrypt(password),
            email, firstName, lastName, isActive,
            DOB
          };
          const { results } = saveUsers(user);
          res.json(results);
        }
        catch (e) {
          res.status(500).send(e.message || e);
        }
}
  })
});
//user login
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  if (!(email && password)) {
    console.error('login, email/password missing');
    return res.status(400).json({ message: "invalid credentials" });
  }
  try {
    const { results } = await getUsers({ email, password: encrypt(password) });
    if (results.length == 1) {
      const user = results[0];
      //set the authCookie in browser which contains userID,email and userName
      const authCookie = jwt.sign({
        userID: user.userID,
        email: user.email,
        isActive: user.isActive === 1,
        userName: user.userName
      }, jwtsecret, { expiresIn: "7d" });
      res.cookie('authCookie', authCookie, { maxAge: 900000, httpOnly: false, path: '/' });
      return res.json(user);
    } else {
      console.error('login, no user found: bad credentials');
      return res.status(400).json({ message: "bad credentials" });
    }
  }
  catch (e) {
    res.status(500).send(e.message || e);
  }
});
//Edit user profile
router.put('/profile', upload.single('profileImage'), async function (req, res, next) {
  const { email, password, firstName, lastName, city, state, zipcode, profileDesc, userName, isActive, DOB } = req.body;
  const profileImage = req.file ? `/${req.file.filename}` : '';

  try {
    const loggedinUser = jwt.verify(req.cookies.authCookie, jwtsecret);
    user = {
      userID: loggedinUser.userID,
      email, profileImage, password, firstName, lastName, city, state, zipcode, profileDesc, userName, isActive, DOB
    }
    await editUser(user);
    res.json({ message: "Details updated" });
  }
  catch (e) {
    res.status(500).json({ message: e.message });
  }

});
//Get logged in user's profile
router.get('/profile', requireAuth, async function (req, res, next) {
  try {
    const user = req.user;
    res.json(user);
  }
  catch (e) {
    res.status(500).json({ message: e.message });
  }
});
//Delete the user's account
router.delete('/', requireAuth, async function (req, res, next) {
  try {
    const user = req.user;
    await deleteUser(user);
    res.clearCookie('authCookie');
    res.json({ message: "Account Deleted" });
  }
  catch (e) {
    res.status(500).json({ message: e.message });
  }
});
//Follow any person on Twitter (get userID of user to follow from frontend in body)
router.post('/follow', requireAuth, async function (req, res, next) {
  const { followedID } = req.body;
  try {
    const loggedInUser = req.user;
    follow = {
      followerID: loggedInUser.userID,
      followedID
    };
    await saveFollower(follow);
    res.json("Now Following");
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});
//unfollow the followed person on Twitter (get userID of user to unfollow from frontend in body)
router.delete('/unfollow', requireAuth, async function (req, res, next) {
  const { followedID } = req.body;
  try {
    const loggedInUser = req.user;
    follow = {
      followerID: loggedInUser.userID,
      followedID
    };
    await deleteFollower(follow);
    res.json("Unfollowed !");

  } catch (e) {
    res.status(500).send(e.message || e);
  }
});
module.exports = router;
