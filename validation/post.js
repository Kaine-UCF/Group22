const Validator = require("validator");
const isEmpty = require("./is-empty.js")

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post Must Be Between 10 and 300 characters";
  }

  if(Validator.isEmpty(data.text)){
    errors.text = "Text Field Is Required";
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  };
};