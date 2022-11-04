
const express = require("express");

const app = express();

const dotenv = require('dotenv');

const connectDB = require('./config/db.js');

const authRoutes = require('./routes/authRoutes.js')

const cors = require('cors')

//const path = require('path')

//const publicpath = path.join(__dirname,'template')

app.set('view engine', 'ejs')



dotenv.config();








//connection db
connectDB();


app.use(express.json());

//app.use(bodyParser.urlencoded({extended:true}))

app.use(cors());
//app.use(cors({


 //   origin: "http://127.0.0.5000",

//    methods:["GET","POST","PUT","DELETE"]



//})

//)

//app.get('/hi', (req, res) => {
//    res.render('pages/index')
//})













app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 5000



app.listen(PORT,()=>{


  console.log(`server running port ${PORT}`)

})