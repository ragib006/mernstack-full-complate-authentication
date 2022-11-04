

const asyncHandler = require('express-async-handler');

const User = require('../models/authModels.js');

const bcrypt = require('bcryptjs');

const generateToken = require('../config/generateToken.js')


const sendEmailtouserforverifiaccount = require('../config/emailfunction.js')

const jwt = require('jsonwebtoken');

const nodemailer = require("nodemailer");


//user resister
const userRegister = asyncHandler( async(req,res)=>{

try{


	const {name,email,password} = req.body;

	const userExist = await User.findOne({email});

	if(userExist){

       res.status(200).json({message:'User Already Exist'});

	}else{

           const salt = bcrypt.genSaltSync(10);
           const hash = bcrypt.hashSync(req.body.password, salt);



           //generatetoken



           const secretkey = "helloragib";

           const token = jwt.sign({email:email},secretkey,{expiresIn:"10m"})

           const link = `http://localhost:5000/api/auth/verify/${token}`;



       //  sendEmailtouserforverifiaccount(link,token);



         const transport = nodemailer.createTransport({
          service:"gmail",
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
           },
          });


          


            const mailOptions = {
             from: process.env.EMAIL, // sender address
             to: email, // list of receivers
             subject: "Email Verification Request", // Subject line
             text: `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Email Verifi Email</title>
    <meta name="description" content="Email Verification">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have Email verification request
                                        </h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href=${link}
                                style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Verify Email
                                           </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                   
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`,
            html: `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Email Verification request.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                   
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to Email Verification</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${link}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Verify Email
                                            </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                   
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`,
    
           };




         transport.sendMail(mailOptions, (error, info) => {

          
             if (error) {
               res.status(200).json({ message: "Error" });

             //  console.log(error)
              
              }

               res.status(200).json({ message: "Forgate password link successfully send your email" });

             
           //  console.log('link send succrssfully')
        
        });


















































              const newUser = new User({

                        name:name,
                        email:email,
                        password:hash,
                        isverified:false

                })

               const user = await newUser.save();

                     if(user){

               	            res.json({

                             _id:user._id,
                             name:user.name,
                             email:user.email,
                             isverified:user.isverified
                            // token:generateToken(user._id)

                          })

               }else{

                   res.status(200).json({message:'User Not Create'});


               }

	}




}catch(error){


  console.log(error);

}



})




//user login


const UserLogin = asyncHandler(async(req,res)=>{
          

      try{
            
         
            const {email,password} = req.body
            const Findemail = await User.findOne({email})

            if(!Findemail){

                  res.status(200).json('User Does Not Exist')
            }else{

              //comparepassword   
              const comparepassword = await bcrypt.compare(req.body.password, Findemail.password)
       
                     if(comparepassword && Findemail.isverified){


                     	//token

                     	//const tokengenarate = jwt.sign({userId:Findemail._id},"sdfsdsdvgsd",{expiresIn: '5d'});


                    const tokengenarate = jwt.sign({userId:Findemail._id},process.env.JWT_SECRET,{expiresIn: '5d'});


                       res.json({

                               _id:Findemail._id,
                               name:Findemail.name,
                               email:Findemail.email,
                               tokengenarate
                              //token:generateToken(Findemail._id)
                              // token:tokengenarate

                      })

                     
                       }else{

                           res.status(200).json('Invalid Email or Password')
                      }

            }

      }catch(error){

         res.status(404).json(error)

      }

})





//change password   




const PasswordChange = asyncHandler(async(req,res)=>{
          

      try{


     
           const {currentpassword,newpassword,confirmpassword}  = req.body;

             const loginuserId = req.myId._id.valueOf()

         //  const bcryptpassword = bcrypt.genSaltSync(10);

         //  const hash = bcrypt.hashSync(req.body.password, salt);


           const myId = req.myId

           const userpassword = req.myId.password
           
          
           const currentpasswordcheck = await bcrypt.compare(currentpassword,userpassword)

           if(currentpasswordcheck){

           	    if(newpassword === confirmpassword){

                       const salt = bcrypt.genSaltSync(10);
                       const hashpassword = bcrypt.hashSync(newpassword, salt);

                       await User.findByIdAndUpdate(loginuserId,{password:hashpassword})
 
                      res.status(200).json({message:'Password Update Successfully'});

           	    }else{


                     res.status(200).json({message:'New Password and Confirmpassword Not Match'});

           	    }
                
               // res.status(200).json({message:'Password is Right'});


           }else{

               res.status(200).json({message:'Current password is wrong'});


           }


          // res.status(200).json({

           //    user:myId,

           //    mypassword:password


          // })



      



           

      }catch(error){

         res.status(404).json(error)

      }

})








const Displayalluser = asyncHandler(async(req,res)=>{
          

      try{

          const getalluser = await User.find();

          res.status(200).json(getalluser)


      }catch(error){

         res.status(404).json(error)

      }

})




//Userforgatepassword



const Userforgatepasswordlinksend = asyncHandler(async(req,res)=>{
 
 try{
    
     const {email} = req.body;

       const Findemail = await User.findOne({email})

       if(!Findemail){

          res.status(200).json({message:"User Not Found"})

       }else{

          //generate token  
          
          const secretkey = Findemail._id + "passwordforgatelink";
          const tokengenarate = jwt.sign({userId:Findemail._id},secretkey,{expiresIn: '57m'});



          const link = `http://localhost:3000/user/reset/${Findemail._id}/${tokengenarate}`;

         const transport = nodemailer.createTransport({
          service:"gmail",
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
           },
          });


          


            const mailOptions = {
             from: process.env.EMAIL, // sender address
             to: email, // list of receivers
             subject: "Password Reset Request", // Subject line
             text: `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href=${link}
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                   
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`,
            html: `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                   
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${link}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                   
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`,
    
           };












         transport.sendMail(mailOptions, (error, info) => {

          
             if (error) {
              res.status(400).json({ message: "Error" });
              
              }

            res.status(200).json({ message: "Forgate password link successfully send your email" });

             
        
        });












      //  transport.sendMail(mailOptions, (error, info) => {
      //      if (error) {
       //       return res.status(400).json({ message: "Error" });
       //     }
      //      return res.status(200).json({ message: "Email Sent" });
      //  });
      //  } else {
      //    return res.status(400).json({ message: "Invalid Email" });
      //  }
      //} else {
       // return res.status(400).json({ message: "email is required" });
      //}
    //} catch (error) {
   //   return res.status(400).json({ message: error.message });
   // }
  











       }

     
    


 }catch(error){


    res.status(404).json(error)


 }



})






































const LinkSend = asyncHandler(async(req,res)=>{
 
 try{
    








      //  transport.sendMail(mailOptions, (error, info) => {
      //      if (error) {
       //       return res.status(400).json({ message: "Error" });
       //     }
      //      return res.status(200).json({ message: "Email Sent" });
      //  });
      //  } else {
      //    return res.status(400).json({ message: "Invalid Email" });
      //  }
      //} else {
       // return res.status(400).json({ message: "email is required" });
      //}
    //} catch (error) {
   //   return res.status(400).json({ message: error.message });
   // }
  











       

     
    


 }catch(error){


    res.status(404).json(error)


 }



})

























//forgate password link    








const Forgatpasswordupdate = asyncHandler(async(req,res)=>{
          

      try{

          const {newpassword,confirmpassword} = req.body;

          const {id,token} = req.params;

          if(newpassword == confirmpassword){

              //  const Findemail = await User.findOne(id)

          const Findemail = await User.findById(id);

          const secretkey = Findemail._id + "passwordforgatelink";
      
              
              //token verify
              
            //      const secretkey = Findemail._id + "passwordforgatelink";


              const isValid = await jwt.verify(token,secretkey);



             //   res.status(200).json(isValid)

                 if(isValid){

            //          const isUser = await User.findById(id);

                       const salt = bcrypt.genSaltSync(10);
                       const hashpassword = bcrypt.hashSync(newpassword, salt);


                        const isSuccess = await User.findByIdAndUpdate(Findemail,{

                           $set:{

                              password:hashpassword

                           }


                       })

                     
                      if(isSuccess){

                           res.status(200).json({message:"Password update successfully"})

                      }else{

                  //          
                               res.status(200).json({message:"Password not update"})

                       }



                  //res.status(200).json({message:"Token is Verify"})


                 }else{

                     
                   res.status(200).json({message:"Token is Expire"})
                    

                }




               // res.status(200).json({message:"Password and Confirm Password Match"})

          }else{


                res.status(200).json({message:"Password and Confirm password not match"})

          }



         // const getalluser = await User.find();

         // res.status(200).json(getalluser)


      }catch(error){

         res.status(404).json(error)

      }

})






//Clickandverify













const Clickandverify = asyncHandler(async(req,res)=>{
 
 try{
    

   const {token} = req.params;

   if(token){

        //token verify    


        const secretkey = "helloragib";

        const isEmailExpire = await jwt.verify(token,secretkey);
        
        if(isEmailExpire){

            
            const getUser = await User.findOne({email:isEmailExpire.email});


            const updateuserverifystatus = await User.findByIdAndUpdate(getUser._id,{  

               
                $set:{

                      
                      isverified:true,
                    

                }


            })


          //  if(updateuserverifystatus){


                  res.render('pages/index')

                
                  // res.status(200).json({message:"Email verify successfully"})

          //  }else{


               //   res.status(200).json({message:"Email verification fail"})


         //   }
            


        }else{



           //   res.status(200).json({message:"Token already expire"})


             res.render('pages/expire')




        }




   }else{

       
         res.status(200).json({message:"Token Not Found"})


   }


    


 }catch(error){


    res.status(404).json(error)


 }



})














































module.exports = {userRegister,UserLogin,PasswordChange,Displayalluser,Forgatpasswordupdate,Userforgatepasswordlinksend,LinkSend,Clickandverify}