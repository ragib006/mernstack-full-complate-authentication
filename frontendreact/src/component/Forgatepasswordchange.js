import React,{useState,useEffect,useContext} from 'react'

import {Link} from 'react-router-dom'

import axios from 'axios'


import {useParams} from "react-router-dom"
import {useNavigate} from 'react-router-dom'

import {AuthContext} from "../context/AuthContext"



const Forgatepasswordchange = () => {


   // const {user,dispatch} = useContext(AuthContext)

   const navigate = useNavigate()
   const {id,token} = useParams();

  

    const [newpassword,Setnewpassword] = useState("");

    const [confirmpassword,Setconfirmpassword] = useState("");

    const [error,Seterror] = useState("");

    const [message,Setmessage] = useState("");






 // console.log(user.tokengenarate)

 const handleClick = async (e) => {


         e.preventDefault();

         try{


               const config = {  
          
                  headers:{



                    "Content-type":"application/json",

                    "authorization": `Bearer ${token}`

                   }
                }


             // if(newpassword == confirmpassword){

               

             // }


             const res = await axios.post(`/api/auth/user_forgate_password_update/${id}/${token}`,{newpassword,confirmpassword},config)
    



          // console.log(res.data.message)

             if(res.data.message === "Password update successfully"){

                Setmessage(res.data.message)
            
              }else if(res.data.message === "Password not update"){

                Setmessage(res.data.message)
            
              }else if(res.data.message === "Token is Expire"){


                  Setmessage(res.data.message)


              }else if(res.data.message === "Password and Confirm password not match"){



                 Setmessage(res.data.message)

              }else{


               Setmessage("Server Error")

               }
      


         }catch(error){

            
           
            console.log(error)

             Seterror(error)

         }

       

    //   console.log(currentpassword,newpassword,confirmpassword)



 }



   return(

          <>
       

          <div className="login-section">

               <div className="loginform" style={{width:'35%',margin:'10px auto',marginTop:'150px'}}>



                    <div className="card" style={{padding:'10px 10px 10px 10px'}}>
                          

                          
                          <h3 style={{width:'250px',margin:'10px auto',fontWeight:'bold'}}>Change Password</h3>

                     


                    <div className="myform" style={{marginTop:'20px'}}>



                    
                           

                  {message && 

                       <center>
                      <p className="bg-danger" style={{padding:'0px 0px 0px 0px',color:'white'}}>{message}</p>
                       </center>


                    }
        





                         <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Enter New Password</label>
                        <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New Password"

                        value = {newpassword}
                        onChange = {(e) => Setnewpassword(e.target.value)}



                        />
                      </div>


                         <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Enter Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Confirm Password"

                       value = {confirmpassword}
                        onChange = {(e) => Setconfirmpassword(e.target.value)}



                        />
                      </div>

                      
                      <span>
                      <button onClick={handleClick} className="btn btn-primary" style={{marginRight:'270px'}}>Change Password</button>
                
                      </span>

                      
                  </div>
                          
                     

                    </div>







               </div>
        
     
          </div>

       </>

   	)



}


export default Forgatepasswordchange