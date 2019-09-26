const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys"); //Bringing in Secret Key
const passport = require("passport");

// load input validation
const validateContactCreation = require("../../validation/create-contact");
// ! I don't think I need validateContactDeletion
// ! Nor validateContactUpdate

// load Contact model
const Contact = require("../../models/Contact");


// @route   GET api/contacts/test
// @desc    Tests contacts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Contacts Works' }));


router.get('/list', (req, res) => {

  Contact.find()
  .then( contacts => {
    res.json(contacts)
  })
  .catch ( err => {res.status(400).json("ERRORRRRRRRRR: " + err) });
  });


// @route   POST api/contacts/create
// @desc    Create a contact
// @access  Private
router.post("/create",/* passport.authenticate("jwt", { session: false }), */
        (req, res) => {
          console.log(req)
    const {errors, isValid} = validateContactCreation(req.body);
    // check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }
    else {
        const newContact = new Contact({
            fname: req.body.fname,
            lname: req.body.lname,
            phone: req.body.phone,
            email: req.body.email
        });

        newContact
            .save()
            .then(contact => res.json(newContact))
            .catch(err => console.log(err));
    }
});


// @route   DELETE api/contacts/:id
// @desc    Delete contact by its ObjectId
// @access  Private
router.delete('/:id', /*passport.authenticate("jwt", { session: false }),*/ function(req, res, next) {
    Contact.findByIdAndDelete(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


// @route   POST api/contacts/update/:id
// @desc    Update contact by its ObjectId
// @access  Private
router.post('/update/:id',/* passport.authenticate("jwt", { session: false }),*/
  function(req, res, next) {
    const {errors, isValid} = validateContactCreation(req.body);
      console.log(req)
    if(!isValid) {
        return res.status(400).json(errors);
    }
    else {

        Contact.findById(req.params.id)
        .then(contact => {
            contact.fname = req.body.fname;
            contact.lname = req.body.lname;
            contact.phone = req.body.phone;
            contact.email = req.body.email;

            contact.save()
                .then(() => res.json(contact)) // or "Contact Updated!"
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    }

});





module.exports = router;
