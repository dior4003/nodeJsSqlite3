const express = require('express');
const router = express.Router();
const userController=require('./usercontrol');

// Routes
router.get('/', userController.view);
router.post('/login', userController.login);
// router.get('/login', userController.form);
router.get('/users', userController.dashboard);
router.post('/adduser', userController.create);
router.post('/search', userController.find);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
// router.get('/viewuser/:id', userController.viewall);
router.get('/delete/:id',userController.delete);
  
module.exports = router;