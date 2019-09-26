const Validator = require("validator");
const isEmpty = require("./is-empty.js")

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : ""; // Testing for empty string, if not empty then it will be data.name if it is empty then it tests as empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if(!Validator.isLength(data.name, { min: 2, max: 30 })){
    errors.name = "Name Must be Between 2 and 30 characters";
  }

  //Name Validation:
  if(Validator.isEmpty(data.name)){
    errors.name = "Name Field Is Required";
  }

  // Email Validations:
  if(Validator.isEmpty(data.email)){
    errors.email = "Email Field Is Required";
  }
  if(!Validator.isEmail(data.email)){
    errors.email = "Email Is invalid";
  }

  //Password Validations:
  if(Validator.isEmpty(data.password)){
    errors.password = "Password Field Is Required!";
  }
  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = "Password Must Be Atleast 6 Characters!";
  }
  if(Validator.isEmpty(data.password2)){
    errors.password2 = "Confirm Password Field Is Required!";
  }
  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = "Passwords Must Match!";
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  };
};