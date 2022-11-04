

const mongoose = require('mongoose');



const registerSchema = mongoose.Schema({

   
   name:{
      
      type:String,
      required:true

   },

    email:{
      
      type:String,
      required:true

   },

   password:{

      type:String,
      required:true

   },

     isverified:{

      type:String
    //  default:false


   }



},{timestamps:true})




const User = mongoose.model("User",registerSchema);


module.exports = User;