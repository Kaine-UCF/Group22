const Validator = require("validator");
const isEmpty = require("./is-empty.js")

module.exports = function validateContactCreation(data) {
    let errors = {};

    data.fname = !isEmpty(data.fname) ? data.fname : "";
    data.lname = !isEmpty(data.lname) ? data.lname : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.email = !isEmpty(data.email) ? data.email : "";

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

    return {
        errors,
        isValid: isEmpty(errors)
    };
};