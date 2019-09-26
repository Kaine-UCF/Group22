const Validator = require("validator");
const isEmpty = require("./is-empty.js")

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  
  // Handle Validation:
  if(!Validator.isLength(data.handle, { min:2, max: 40 })) {
    errors.handle = "Handle Needs To Be Between 2 and 40 Characters";
  }
  if(Validator.isEmpty(data.handle)) {
    errors.handle = "Profile Handle Is Required";
  }

  // Status Validation:
  if(Validator.isEmpty(data.status)) {
    errors.status = "Status Field Is Required";
  }

  // Skills Validation:
  if(Validator.isEmpty(data.skills)) {
    errors.skills = "Skills Fields Is Required";
  }

  // Check Other Fields That Arent Required To Deflect Unecessary Errors:
  // Website:
  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)) {
      errors.website = "Not A Valid URL";
    }
  }
  // Youtube:
  if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = "Not A Valid URL";
    }
  }
  // Twitter:
  if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = "Not A Valid URL";
    }
  }
  // Facebook:
  if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = "Not A Valid URL";
    }
  }
  // Linkedin:
  if(!isEmpty(data.linkedin)){
    if(!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not A Valid URL";
    }
  }
  // Instagram:
  if(!isEmpty(data.instagram)){
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = "Not A Valid URL";
    }
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  };
};