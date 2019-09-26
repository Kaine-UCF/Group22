const Validator = require("validator");
const isEmpty = require("./is-empty.js")

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";


  if(Validator.isEmpty(data.title)){
    errors.title = " Job Title Field Is Required";
  }

  if(Validator.isEmpty(data.company)){
    errors.company = " Company Field Is Required";
  }

  if(Validator.isEmpty(data.from)){
    errors.from = " From Date  Field Is Required";
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  };
};