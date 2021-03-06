const Validator = require("validator");
const isEmpty = require("./is-empty.js")

module.exports = function validateContactCreation(data) {
    let errors = {};
    //console.log("WE GOT HERE! YEETS")
    console.log(data);
    data.fname = !isEmpty(data.fname) ? data.fname : "";
    data.lname = !isEmpty(data.lname) ? data.lname : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.owner = !isEmpty(data.owner) ? data.owner : "";

    // ! current implementation: at the very least, require
    // ! a first name and phone number

    if (Validator.isEmpty(data.fname)) {
        errors.fname = "First Name Is Required";
    }

    if (Validator.isEmpty(data.lname)) {
        errors.lname = "Last Name Is Required";
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone Number Is Required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email Is Required";
    }

    if (Validator.isEmpty(data.owner)) {
        errors.owner = "A logged in user is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
