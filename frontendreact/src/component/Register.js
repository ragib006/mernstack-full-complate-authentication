import React,{useState} from 'react'

import {Link} from 'react-router-dom'

import axios from 'axios'

const Register = () => {


  const [name,Setname] = useState("");

  const [email,Setemail] = useState("");

  const [password,Setpassword] = useState("");

  const [confirmpassword,Setconfirmpassword] = useState("");

  const [message,Setmessage] = useState("");

  const SubmitHandler = async (e) => {
         
      e.preventDefault();



     // console.log(name,email,password,confirmpassword)


      try{

           if(password === confirmpassword){

              const res = await axios.post('/api/auth/register',{name,email,password});


               if(res.data.message === "User Already Exist"){

                Setmessage(res.data.message)



            
               }else if(res.data.message === "User Not Create"){


                Setmessage(res.data.message)

              


               }else{



                Setname("")
                Setemail("")
                Setpassword("")
                Setconfirmpassword("")

               
                Setmessage("Email varification link successfully send your email")

               }

              //console.log('Success')

           }else{
              
            Setmessage("Password and confirm password not match")

             //console.log('confirmpassword Not Match')

           }




     }catch(error){


         console.log(error)


     }

   








  }


   return(

    
       <>
       

          <div className="login-section">

               <div className="loginform" style={{width:'35%',margin:'10px auto',marginTop:'120px'}}>



                    <div className="card" style={{padding:'10px 10px 10px 10px'}}>
                          

                          
                          <h3 style={{width:'130px',margin:'10px auto',fontWeight:'bold'}}>Register</h3>

                     


                    <div className="myform" style={{marginTop:'20px'}}>






               
                  {message && 

                       <center>
                      <p className="bg-danger" style={{padding:'0px 0px 0px 0px',color:'white'}}>{message}</p>
                       </center>


                    }








                     <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Enter Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name"

                        value = {name}
                        onChange = {(e) => Setname(e.target.value)}


                        />
                      </div>

                       <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email"
                        
                        value = {email}
                        onChange = {(e) => Setemail(e.target.value)}

                        />
                      </div>

                       <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password"
                        
                        value = {password}
                        onChange = {(e) => Setpassword(e.target.value)}
                      

                        />
                      </div>

                        <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Confirm Password"
                        
                        value = {confirmpassword}
                        onChange = {(e) => Setconfirmpassword(e.target.value)}

                        />
                      </div>

                      
                      <span>
                      <button onClick={SubmitHandler}  className="btn btn-primary" style={{marginRight:'200px'}}>Register</button>
                      <span><Link to="/" style={{textDecoration:'none'}}>Already have a new account</Link></span>
                      </span>

                    
                           
                  </div>
                          
                     

                    </div>







               </div>
        
     
          </div>

       </>

   	)



}


export default Register