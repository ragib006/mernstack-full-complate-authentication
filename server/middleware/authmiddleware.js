const jwt = require('jsonwebtoken');
const User = require('../models/authModels.js')
const asyncHandler = require('express-async-handler')





const  protect = asyncHandler( async(req,res,next)=>{

//  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    try{

       let token

       token = req.headers.authorization.split(' ')[1]

      // const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const {userId} = jwt.verify(token,process.env.JWT_SECRET)

       req.myId = await User.findById(userId)
       //.select('-password')

    //   console.log(decoded)

       next()



    }catch(error){


      res.status(401).json({message:'Not Found Aay Token'})


    }

  //  console.log('Token Found')

    // next()

  }else{

          //console.log('Not Token Found')

            res.status(401).json({message:'Not Found Any Token'})

  }




})

module.exports = {protect};

