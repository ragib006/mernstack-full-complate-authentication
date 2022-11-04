import React,{useState,useEffect,useContext} from 'react'

import {Link} from 'react-router-dom'

import axios from 'axios'


import {AuthContext} from "../context/AuthContext"

const ChangePassword = () => {


    const {user,dispatch} = useContext(AuthContext)

    const [currentpassword,Setcurrentpassword] = useState("");

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

                    "authorization": `Bearer ${user.tokengenarate}`

                   }
                }


             // if(newpassword == confirmpassword){

               

             // }


             const res = await axios.post("/api/auth/passwordchange",{currentpassword,newpassword,confirmpassword},config)
    


             if(res.data.message === "Current password is wrong"){

                Setmessage(res.data.message)
            
             }else if(res.data.message === "New Password and Confirmpassword Not Match"){

                Setmessage(res.data.message)
            
             }else if(res.data.message === "Password Update Successfully"){


                Setmessage(res.data.message)


             }else{


              Setmessage("Server Error")

             }
              // if(res.)

            // console.log(res.data.message)
            


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
                        <label for="exampleInputEmail1" className="form-label">Enter Current Password</label>
                        <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Current Password" 

                        value = {currentpassword}
                        onChange = {(e) => Setcurrentpassword(e.target.value)}

                        />
                      </div>


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
                      <span><Link to="/dashboard" style={{textDecoration:'none'}}>Dashboard</Link></span>
                      </span>

                      
                  </div>
                          
                     

                    </div>







               </div>
        
     
          </div>

       </>

   	)



}


export default ChangePassword