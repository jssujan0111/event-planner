const { body, validationResult, header, param } = require('express-validator');
const { badRequest } = require('../utils/error');

// registration credentials validation checker
const registerValidationRules = () => {
  return [
    // name should not be empty
    body('name','should not be empty').notEmpty(),
    // email must be a valid email
    body('email','must be an email').isEmail(),
    // password must be at least 5 chars long
    body('password','at least 5 characters').isLength({ min: 5 })
  ]
};
// login credentials validation checker
const loginValidationRules = ()=>{
  return [
    // email must be a valid email
    body('email','must be an email').isEmail(),
    // password must be at least 5 chars long
    body('password','at least 5 characters').isLength({ min: 5 })
  ]
};
// event creation validation checker
const eventValidationRules = ()=>{
  return [
    // title should not be empty
    body('title','title should not be empty').notEmpty(),
    body('description','description should not be empty').notEmpty(),
    body('date','date should not be empty').notEmpty(),
    body('time','time should not be empty').notEmpty(),
    body('location','location should not be empty').notEmpty()
  ]
};
// guest creation validation checker
const guestValidationRules = ()=>{
  return [
    body('name','name,should not be empty').notEmpty(),
    body('email','email should not be empty').notEmpty(),
    body('phone','phone should not be empty').notEmpty(),
  ]
}
// validation middleware
const validate = (req, _res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    
  return next(badRequest('Missing required fields',errors.errors))
   
}
// request headers must have a authorization property
const authorizationHeaderRules = ()=>{
  return [
    header('authorization','missing authorization header').notEmpty()
  ]
}
// params validation checker
const paramValidationRules = ()=>{
  return [
    param('id','id should not be empty').notEmpty()
  ]
}

module.exports = {
  registerValidationRules,
  loginValidationRules,
  eventValidationRules,
  guestValidationRules,
  authorizationHeaderRules,
  paramValidationRules,
  validate,
}