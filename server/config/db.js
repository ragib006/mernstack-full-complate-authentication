
const mongoose = require('mongoose');


const connectDB = async() => {


   try{


   	const connectdb = await mongoose.connect(process.env.MONGO_URI,{

              useUnifiedTopology:true,
              useNewUrlParser:true
           



   	})


   	console.log('Mongoodb Connect SuccessFully');




   }catch(error){


       console.log(error);


   }




}



module.exports = connectDB;