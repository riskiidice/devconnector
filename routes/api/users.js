const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load Model
const User = require('../../models/User');

// @route GET /api/user/test
// @desc  Test users route
// @access Public
router.get('/test', (req, res) => {
  res.json({
    msg: "users work"
  })
})

// @route GET /api/user/register
// @desc  Register
// @access Public
router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exist'
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });

      });
    }
  })
});

// @route GET /api/user/login
// @desc  Login User /return JWT Token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user email
  User.findOne({
    email
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        email: 'Email does not exist'
      });
    }
    // Check Password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          res.json({
            msg: "success"
          });
        } else {
          return res.status(400).json({
            password: 'Password Incorrect'
          });
        }
      })
  });
});

module.exports = router;