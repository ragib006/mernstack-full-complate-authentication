const express = require('express');

const router  = express.Router();

const {userRegister,UserLogin,PasswordChange,Displayalluser,Userforgatepasswordlinksend,Forgatpasswordupdate,LinkSend,Clickandverify} = require('../controllers/authController.js');


const {protect} = require('../middleware/authmiddleware.js');


 //localhost:5000/api/auth/register
  router.post('/register',userRegister);

 //localhost:5000/api/auth/login
  router.post('/login',UserLogin);

  //Displayalluser
  //localhost:5000/api/auth/alluser
  router.get('/alluser',Displayalluser);

 //localhost:5000/api/auth/passwordchange
  router.post('/passwordchange',protect,PasswordChange);

  //forgate password 
  //localhost:5000/api/auth/user_forgate_password_link_send
  router.post('/user_forgate_password_link_send',Userforgatepasswordlinksend);
  
  //user forgate password update 

 // localhost:5000/api/auth/user_forgate_password_update/:id/:token

  router.post('/user_forgate_password_update/:id/:token',Forgatpasswordupdate);




  //click and email verify route   

  router.get('/verify/:token',Clickandverify);

  //api/auth/verify/

  
//http://localhost:3000/user/reset/635114647d609bda9fb78f07/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUxMTQ2NDdkNjA5YmRhOWZiNzhmMDciLCJpYXQiOjE2NjcyMDQ2ODUsImV4cCI6MTY2NzIwNDk4NX0.jqnrX2C0Tg0kvYywmWOs2ix8u0m41-WdwhkFEOYs09I
  //link-send

  //http://localhost:3000/user/reset/635114647d609bda9fb78f07/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUxMTQ2NDdkNjA5YmRhOWZiNzhmMDciLCJpYXQiOjE2NjcyMDQ2ODUsImV4cCI6MTY2NzIwNDk4NX0.jqnrX2C0Tg0kvYywmWOs2ix8u0m41-WdwhkFEOYs09I

 // router.post('/link-send',LinkSend);
//http://localhost:3000/user/reset/635114647d609bda9fb78f07/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUxMTQ2NDdkNjA5YmRhOWZiNzhmMDciLCJpYXQiOjE2NjcyMDcyODgsImV4cCI6MTY2NzIxMDcwOH0.EHVEi_7BWgxXqFQaVUaVotOkhU6YZdeYNaGA87vfF84

  module.exports = router;