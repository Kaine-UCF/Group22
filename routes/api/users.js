const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys"); //Bringing in Secret Key
const passport = require("passport");

// Load Input Validation:
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User")

// @route   GET api/users/test
// @desc    Test Users ROute
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works!" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation:
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //Rating
        d: "mm" //Default Shows icon if no picture is attached
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User/ Returning JWT Token
// @access  Public
// !! Is this meant to be a POST request?
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation:
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email:
  User.findOne({ email: email }).then(user => {
    // check for user
    if (!user) {
      errors.email= "User Not Found";
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {

        // If User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar } // create JWT Payload

        //Sign Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });

      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    })
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
  }
);


// !!!!!! PROTECTED ROUTE EXAMPLE
// @route   GET api/users/protected
// @ desc   Test protection routing
// @access  Private
router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
  });

module.exports = router;
