const Validator = require("validator");
const isEmpty = require("./is-empty.js")

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email Validations:
  if(!Validator.isEmail(data.email)){
    errors.email = "Email Is invalid";
  }
  if(Validator.isEmpty(data.email)){
    errors.email = "Email Field Is Required";
  }

  //Password Validations:
  if(Validator.isEmpty(data.password)){
    errors.password = "Password Field Is Required!";
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  };
};