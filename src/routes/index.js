const router = require('express').Router();
const {controllers: authController} = require('../api/v1/auth');
const {controllers: eventControllers } = require('../api/v1/event');
const {controllers: guestControllers} = require('../api/v1/guest');
const checkAuthenticate = require('../middleware/checkAuthenticate');
const { registerValidationRules,validate, loginValidationRules, eventValidationRules, guestValidationRules, authorizationHeaderRules, paramValidationRules } = require('../validator/validator')

//Auth Routes

router
    .post('/api/v1/auth/register',registerValidationRules(),validate,authController.register)
    .post('/api/v1/auth/login',loginValidationRules(),validate,authController.login)
//Event Routes
router
    .route('/api/v1/events')
    .post(authorizationHeaderRules(),validate,checkAuthenticate,eventValidationRules(),validate,eventControllers.createEvent)
    .get(authorizationHeaderRules(),validate,checkAuthenticate,eventControllers.findAllEvent)
router
    .route('/api/v1/events/:id')
    .get(authorizationHeaderRules(),paramValidationRules(),validate,checkAuthenticate,eventControllers.findSingleEvent)
    .patch(authorizationHeaderRules(),paramValidationRules(),validate,checkAuthenticate,eventControllers.updateEvent)
    .delete(authorizationHeaderRules(),validate,checkAuthenticate,eventControllers.deleteEvent)
//guest router
router
    .route('/api/v1/events/:id/guests')
    .get(authorizationHeaderRules(),paramValidationRules(),validate,checkAuthenticate,guestControllers.findAllGuest)
    .post(authorizationHeaderRules(),paramValidationRules(),validate,checkAuthenticate,guestValidationRules(),validate,guestControllers.createGuest)
router
    .route('/api/v1/events/:id/guests/:guestId')
    .get(authorizationHeaderRules(),paramValidationRules(),validate,checkAuthenticate,guestControllers.findSingleGuest)
    .patch(authorizationHeaderRules(),paramValidationRules(),validate,checkAuthenticate,guestControllers.updateGuest)
    .delete(authorizationHeaderRules(),paramValidationRules(),validate,checkAuthenticate,guestControllers.deleteGuest)
module.exports = router